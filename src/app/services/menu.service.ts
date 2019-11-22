import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url = `${environment.url}/api/profile`;
  constructor(private http:HttpClient,private alertController:AlertController ) {}
  getUserInfo(){
    return this.http.get(this.url).pipe(
      catchError(e => {
        let error = e.error.message ? e.error.message  : "fail to sign in"
        this.showAlert(error);
        throw error;
      })
    )
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
