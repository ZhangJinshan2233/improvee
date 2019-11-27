import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  loading: any
  url = `${environment.url}/api/categories`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }
  /**
   * create new  category
   * @param newCategory 
   */
  create_category(category, kind) {
    return this.http.post(`${this.url}`, { ...category, kind }).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  /**
   * get all  categories
   */
  get_challenge_categories(kind) {
    this.show_loading()
    return this.http.get(`${this.url}/?$kind=${kind}`).pipe(
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
  get_category_by_id(categoryId) {
    this.show_loading()
    return this.http.get(`${this.url}/${categoryId}`).pipe(
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

  update_category(categoryId, kind, changedFields) {
    return this.http.put(`${this.url}/${categoryId}/?kind=${kind}`, changedFields).pipe(
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
