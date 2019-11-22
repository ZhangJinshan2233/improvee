import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCategoryService {
  loading: any
  url = `${environment.url}/api/challengeCategories`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }
  /**
   * create new challenge category
   * @param newChallengeCategory 
   */
  create_challenge_category(newChallengeCategory) {
    return this.http.post(`${this.url}`, newChallengeCategory).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  /**
   * get all challenge categories
   */
  get_challenge_categories() {
    this.show_loading()
    return this.http.get(`${this.url}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        this.loading.then(loading => {
          loading.dismiss()
        })
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
/**
 * 
 * @param id 
 */
  get_challenge_categories_by_id(challengeCategoryId) {
    this.show_loading()
    return this.http.get(`${this.url}/${challengeCategoryId}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        this.loading.then(loading => {
          loading.dismiss()
        })
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  update_habit(habitId, changedFields) {
    return this.http.put(`${this.url}/${habitId}`, changedFields).pipe(
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
