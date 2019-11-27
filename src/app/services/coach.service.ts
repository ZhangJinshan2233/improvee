import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError, tap} from 'rxjs/operators';
import { forkJoin, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoachService {
  currentCoachSubject = new BehaviorSubject<any>(null);
  loading: any;

  url = `${environment.url}/api`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  initialize_data() {
    this.show_loading();
    return forkJoin(this.http.get(`${this.url}/profile`),
      this.http.get(`${this.url}/coach/coacheeList`)).pipe(
        tap(() => {
          this.loading.then(loading => {
            loading.dismiss()
          })
        }),
        catchError(e => {
          let error = e.error;
          if (!e.error) {
            this.show_alert("internet error")
            throw error;
          }
          this.show_alert(e.error);
          throw error;
        })
      )
  }
  get_coachees(skipNum) {
    return this.http.get(`${this.url}/coach/coacheeList/?skipNum=${skipNum}`).pipe(
      catchError(e => {
        let error = e.error.message;
        throw error;
      })
    )
  }
  get_coachee_by_id(coacheeId) {
    return this.http.get(`${this.url}/coachee/${coacheeId}`).pipe(
      catchError(e => {
        let error = e.error.message;
        throw error;
      })
    )
  }
  get_unread_notifitation(author) {
    return this.http.get(`${this.url}/unreadNotifications/?author=${author}`).pipe(
      tap((res) => {
      })
    )
  }

  coachee_details_get_coachee_and__week_habitlist(coacheeId) {
    this.show_loading();
    return forkJoin(this.http.get(`${this.url}/coach/coacheeList/${coacheeId}`), this.http.get(`${this.url}/habitlistRecord/search/week/${coacheeId}`)).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let error = e.error;
        if (!e.error) {
          this.show_alert("internet error")
          throw error;
        }
        this.show_alert(e.error);
        throw error;
      })
    )
  }
  coachee_details_get_activechallenges_and__nonactivechallenges(coacheeId) {
    this.show_loading();
    return forkJoin(this.http.get(`${this.url}/challenges/active/?coacheeId=${coacheeId}`),
      this.http.get(`${this.url}/challenges/nonactive/?coacheeId=${coacheeId}`)).pipe(
        tap(() => {
          this.loading.then(loading => {
            loading.dismiss()
          })
        }),
        catchError(e => {
          let error = e.error;
          if (!e.error) {
            this.show_alert("internet error")
            throw error;
          }
          this.show_alert(e.error);
          throw error;
        })
      )
  }

  coachee_details_get_indicators_record(coacheeId) {
    this.show_loading();
    return this.http.get(`${this.url}/indicatorRecords/?coacheeId=${coacheeId}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let error = e.error;
        if (!e.error) {
          this.show_alert("internet error")
          throw error;
        }
        this.show_alert(e.error);
        throw error;
      })
    )
  }

  get_enrolled_and_expired_members(){
    this.show_loading();
    return this.http.get(`${this.url}/coach/coacheeList/count`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        let error = e.error;
        if (!e.error) {
          this.show_alert("internet error")
          throw error;
        }
        this.show_alert(e.error);
        throw error;
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
