import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class TimmelineService {

  url = environment.url

  currentUser: any
  constructor(private auth: AuthService,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  createNewPost(timelinePost) {
    
    return this.http.post(`${this.url}/api/timelinePost/${this.currentUser._id}`, timelinePost).pipe(
      catchError(e => {
        let error = e.error['error'] ? e.error['error'] : "fail to sign up"
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
