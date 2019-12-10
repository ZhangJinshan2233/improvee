import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthyTipsService {
  loading: any;
  url = `${environment.url}/api`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

  /**
   * 
   * @param skip numbers 
   */
  get_healthyTips_pagination(skipNum) {
    return this.http.get(`${this.url}/healthyTips/?skipNum=${skipNum}`).pipe(
      catchError(e => {
        let error = e.error.message;
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
