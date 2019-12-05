import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from "@angular/common/http";
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  loading: any
  url = `${environment.url}/api/indicators`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  /**
   * 
   * @param indicator name 
   */
  get_indicator_info_by_name(indicatorName) {
    return this.http.get(`${this.url}/?name=${indicatorName}`).pipe(
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

  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
