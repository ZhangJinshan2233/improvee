import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HabitlistRecordService {

  loading: any
  updateHabitlistObservable = new Subject<any>()
  url = `${environment.url}/api`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  /**
   * 
   * @param create Date :date
   */
  create_habitlist_record(createDate) {
    this.show_loading();
    return this.http.post(`${this.url}/habitlistRecord`, createDate).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let error = e.error.message;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(error);
        throw error;
      })
    );
  }
  /**
   * 
   * @param date 
   */
  get_habitlist_record_by_date(date) {
    return this.http.get(`${this.url}/habitlistRecord/?scheduleDay=${date}`).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  /**
   * 
   * @param date 
   * @param coachee 
   */
  coach_get_habitlist_record_by_date(date, coachee) {
    return this.http.get(`${this.url}/habitlistRecord/?scheduleDay=${date}&coachee=${coachee}`).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
  /**
   * 
   * @param habitlist id 
   * @param haibt Object 
   */
  update_habitlist_item_status(habitlistId, haibtObject) {
    return this.http.put(`${this.url}/habitlistRecord/${habitlistId}`, haibtObject).pipe(
      tap(() => {
        this.updateHabitlistObservable.next(true)
      }),
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
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

  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
