import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, mergeMap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IndicatorRecordService {

  loading: any
  newIndicatorRecordSubject = new Subject<any>()
  url = `${environment.url}/api/indicatorRecords`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  /**
   * 
   * @param record  Object 
   */
  create_new_record(recordObject: {
    name?: string,
    value?: number,
    createDate?: Date,
    unit?: string
  }) {
    this.show_loading();
    return this.http.post(`${this.url}`, recordObject).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let { message } = e.error;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(message);
        throw message;
      })
    )
  }
  /**
   * 
   * @param indicator cid 
   * @param record Object 
   */
  update_record(indicatorId, recordObject) {
    this.show_loading();
    return this.http.put(`${this.url}/${indicatorId}`, recordObject).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let { message } = e.error;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(message);
        throw message;
      })
    )
  }
  /**
   * 
   * @param indicator name 
   * @param start Date 
   * @param end Date 
   */
  get_indicator_records_of_current_month(indicatorName, startDate, endDate) {

    this.show_loading();
    return this.http.get(`${this.url}/search/month/${indicatorName}/?startDate=${startDate}&endDate=${endDate}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let { message } = e.error;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(message);
        throw message;
      })
    )
  };
  /**
   * 
   * @param indicator name 
   * @param start Date 
   * @param end Date 
   */
  get_indicator_records_of_current_year(indicatorName, startDate, endDate) {
    this.show_loading();
    return this.http.get(`${this.url}/search/year/${indicatorName}/?startDate=${startDate}&endDate=${endDate}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let { message } = e.error;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(message);
        throw message;
      })
    )
  };
  /**
   * 
   */
  get_all_indicator_records() {
    this.show_loading();
    return this.http.get(`${this.url}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let { message } = e.error;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(message);
        throw message;
      })
    )
  }

  /**
   * 
   * @param indicator name 
   * @param skip numbers 
   * @param coachee id 
   */
  get_records_by_pagination(indicatorName, skipNum, coacheeId = "") {
    return this.http.get(`${this.url}/pagination/${indicatorName}?skipNum=${skipNum}&coacheeId=${coacheeId}`).pipe(
      catchError(e => {
        let { message } = e.error;
        this.show_alert(message);
        throw message;
      })
    )
  }

  /**
   * 
   * @param indicator name 
   */
  coachee_get_indiator_latest_record(indicatorName) {
    return this.http.get(`${this.url}/search/latest/${indicatorName}`).pipe(
      catchError(e => {
        let { message } = e.error;
        this.show_alert(message);
        throw message;
      })
    )
  }

  /**
   * 
   * @param indicator name 
   * @param coachee id 
   */
  coach_get_indiator_latest_record(indicatorName, coacheeId) {
    return this.http.get(`${this.url}/search/latest/${indicatorName}/?coachee=${coacheeId}`).pipe(
      catchError(e => {
        let { message } = e.error;
        this.show_alert(message);
        throw message;
      })
    )
  }
  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  show_loading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
    })
    this.loading.then(loading => {
      loading.present()
    })
  }
}
