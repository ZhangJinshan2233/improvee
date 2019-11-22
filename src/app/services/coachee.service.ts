import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {
  format
} from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class CoacheeService {
  url = `${environment.url}/api`;

  loading: any

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  initialize_data() {
    this.show_loading();
    return forkJoin(this.http.get(`${this.url}/profile`),
      this.http.get(`${this.url}/habitlistRecord?scheduleDay=${format(new Date(), 'MM/DD/YYYY')}`),
      this.http.get(`${this.url}/challenges/active`),
      this.http.get(`${this.url}/healthyTips`),
    ).pipe(
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

  get_unread_messages(author, type = "message") {
    return this.http.get(`${this.url}/unreadNotifications/?author=${author}&type=${type}`).pipe(
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
  update_assessments_and_recommended_habit(profileInfo) {
    this.show_loading();
    return this.http.post(`${this.url}/profile`, profileInfo).pipe(
      mergeMap(() => {
        return this.http.post(`${this.url}/coachee/addRecommendedHabits`, null)
      }),
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      mapTo(true),
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

  remove_unread_nmessages(author,type="message") {
    return this.http.delete(`${this.url}/unreadNotifications/?author=${author}&type=${type}`).pipe(
      mapTo(true),
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
