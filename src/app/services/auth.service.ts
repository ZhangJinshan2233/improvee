import { Injectable } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from '../model/user';
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url = environment.url;

  currentUserSubject = new BehaviorSubject<User>(null);

  currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let user = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.currentUserSubject.next(user);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentialInfo) {
    return this.http.post(`${this.url}/api/coachee/signup`, credentialInfo).pipe(
      catchError(e => {

        let error=e.error['error']?e.error['error']:"fail to sign up"
        this.showAlert(error);
        throw error;
      })
    );

  }

  login(credentialInfo) {
    return this.http.post(`${this.url}/api/signin`, credentialInfo)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          let user = this.helper.decodeToken(res['token']);
          this.currentUserSubject.next(user)
          console.log(user)
        }),
        catchError(e => {
          console.log(e.error)
          this.showAlert(e.error['error']);
          throw e.error;
        })
      );
  }

  public get currentUserValue(): User {

    return this.currentUserSubject.value;

  }

  hasRoles(roles: String[]) {

    if (!this.currentUserSubject.value || !roles.includes(this.currentUserSubject.value.userType)) {
      
      return false;
      
    }
    return true;

  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
