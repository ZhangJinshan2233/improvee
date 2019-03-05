import { Injectable } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

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

  checkToken() {}

  register(userInfo){
    return this.http.post(`${this.url}/api/user/register`,userInfo)
  }

}
