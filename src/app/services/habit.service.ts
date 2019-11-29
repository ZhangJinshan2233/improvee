import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, mergeMap, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HabitService {

  loading: any
  url = `${environment.url}/api/habits`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  /**
   * 
   * @param new habit object
   */
  create_habit(newHabit) {
    return this.http.post(`${this.url}`, newHabit).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
  /**
   * 
   */
  get_habits() {
    return this.http.get(`${this.url}`).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  /**
   * 
   * @param habit id:string 
   * @param changedFields 
   */
  update_habit(habitId, changedFields) {
    return this.http.put(`${this.url}/${habitId}`, changedFields).pipe(
      debounce(() => interval(500)),
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
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
