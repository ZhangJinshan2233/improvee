import { Injectable } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

const TOKEN_KEY = "access_token";
export interface User {
  userType: String,
  role: String,
}
@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.url;
  currentUser = new BehaviorSubject<User>(null);

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

  checkToken() { }

  register(userInfo) {
    return this.http.post(`${this.url}/api/user/register`, userInfo)
  }

  login(credentialInfo) {

    if (credentialInfo === "freeCoachee") {
      this.currentUser.next({
        userType: 'freeCoachee',
        role: 'free'
      })
    } else if (credentialInfo === "premiumCoachee") {
      this.currentUser.next({
        userType: 'premiumCoachee',
        role: 'premium'
      })
    } else if (credentialInfo === "coach") {
      this.currentUser.next({
        userType: 'coach',
        role: 'coach'
      })
    } else if (credentialInfo === 'coachAdmin') {
      this.currentUser.next({
        userType: "coachAdmin",
        role: 'coachAdmin'
      })
    }
  }

  getUserSubject(){
    return this.currentUser.asObservable();
  }

  hasRoles(roles:String[]){

    
      if(!this.currentUser.value||!roles.includes(this.currentUser.value.role)){
        return false
      }
      return true;
   
  }
}
