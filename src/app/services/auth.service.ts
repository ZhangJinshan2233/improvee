import { Injectable } from "@angular/core";
import { Platform, AlertController, LoadingController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, from, of } from "rxjs";
import { tap, catchError, mapTo, mergeMap, switchMap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from '../model/user';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';
const JWT_TOKEN = 'JWT_TOKEN';
const PASSWORD = 'PASSWORD'
@Injectable({
  providedIn: "root"
})
export class AuthService {

  loading: any
  url = `${environment.url}/api`;
  currentUserSubject = new BehaviorSubject<User>(null);
  isLogged = new BehaviorSubject<Boolean>(false)
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private oneSignal: OneSignal,
    private router: Router
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  /**
   * @function checkToken
   * @param 
   * @returns Subject<User>
   */
  checkToken() {
    return this.storage.get(JWT_TOKEN).then(token => {
      if (token) {
        let user = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.oneSignal.sendTag('userID', user._id)
          if (user.userType.includes('Coachee')) {
            this.http.get(`${this.url}/memberRecords/?coacheeId=${user._id}`).subscribe(res => {
              if (!res['isMember']) {
                this.http.post(`${this.url}/profile`, { isMember: false }).subscribe(res => {
                })
              }
            })
          }
        } else {
          this.storage.remove(JWT_TOKEN);
        }
      }
    });
  }

  /**
   * @function logout
   * @param refreshToken
   */
  logout() {
    this.storage.remove(JWT_TOKEN).then(() => {
      this.currentUserSubject.next(null);
      this.isLogged.next(false)
      this.storage.remove(PASSWORD)
    });
  }

  /**
   * @function register
   * @param email, password ,firstName, lastName, phoneNumber
   * @returns Observable<boolbean>
   */
  register(credentialInfo?: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  }) {
    this.show_loading();
    return this.http.post(`${this.url}/coachee/signup`, credentialInfo).pipe(
      mergeMap(() => {
        return this.http.post(`${this.url}/signin`, { email: credentialInfo.email, password: credentialInfo.password })
      }),
      tap((tokens) => {
        this.do_login_user(tokens)
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      mapTo(true),
      catchError(e => {
        let error = e.error.message;
        this.loading.then(loading => {
          loading.dismiss()
        })
        this.show_alert(error);
        throw error;
      })
    );
  }

  check_company_code=(companyCode)=>{
    return this.http.get(`${this.url}/companyCodes/?companyCode=${companyCode}`).pipe(
      catchError(e => {
        this.show_alert(e.error.message);
        throw e.error.message;
      })
    )
  }
  /**
   * @function login
   * @param credentialInfo
   * @returns string
   */
  login(credentialInfo?: {
    email: string,
    password: string
  }) {
    this.show_loading();
    this.storage.set(PASSWORD, credentialInfo.password)
    return this.http.post(`${this.url}/signin`, credentialInfo)
      .pipe(
        tap(token => {
          this.do_login_user(token)
          this.isLogged.next(true)
          this.loading.then(loading => {
            loading.dismiss()
          })
        }),
        mergeMap(() => {
          return this.currentUserSubject.asObservable();
        }),
        catchError(e => {
          this.loading.then(loading => {
            loading.dismiss()
          })
          this.show_alert(e.error.message);
          throw e.error.message;
        })
      );
  }
  get_user_profile() {
    return this.http.get(`${this.url}/profile`).pipe(
      catchError(e => {
        let { message } = e.error.message
        this.show_alert(message);
        throw message;
      })
    )
  }
  public get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  hasRoles(roles: String[]) {

    if (!this.currentUserSubject.value || !roles.includes(this.currentUserSubject.value.userType)) {

      return false;

    }
    return true;

  }

  changePassword(passwordInfo?: {
    currentPassword: string,
    newPassword: string,
  }) {

    return this.http.post(`${this.url}/changepassword`, passwordInfo).pipe(
      catchError(err => {
        this.show_alert(err.error.message);
        throw err.error.message
      })
    )
  }
  /**
   * @function update profile
   * @param profileInfo 
   */
  updateProfile(profileInfo?) {
    return this.http.post(`${this.url}/profile`, profileInfo).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err)
        this.show_alert(err.error);
        throw err.error
      })
    )
  }

  /**
   * @function forget password
   * @param email 
   */
  forgot_password(email) {
    this.show_loading();
    return this.http.post(`${this.url}/forgotpassword`, email).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      mapTo(true),
      catchError(e => {
        let error = e.error.message;
        this.loading.then(loading => {
          loading.dismiss()
        })
        if (!e.error.message) {
          this.show_alert("internet error")
          throw error;
        }
        this.show_alert(e.error.message);
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

  private do_login_user(token: any) {
    let user = this.helper.decodeToken(token.access_token);
    this.oneSignal.sendTag('userID', user._id)
    this.currentUserSubject.next(user)
    this.store_token(token);
  }
  get_jwt_token() {
    return this.storage.get(JWT_TOKEN);
  }

  private store_token(token: any) {
    this.storage.set(JWT_TOKEN, token.access_token);
  }
  auto_login_after_read_message() {
    return this.storage.get(JWT_TOKEN).then(token => {
      if (token) {
        let user = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.isLogged.subscribe(isLogged => {
            if (!isLogged) {
              this.storage.get(PASSWORD).then(password => {
                this.login({ email: user.email, password: password }).subscribe(user => {
                  if (user) {
                    switch (user.userType) {

                      case 'Coachee':
                        this.router.navigateByUrl('/coachee');
                        break;
                      case 'CommonCoach':
                        this.router.navigateByUrl('/coach')
                        break;
                      case 'AdminCoach':
                        this.router.navigateByUrl('/adminCoach')
                        break;
                      default:
                        console.log("No  exists!");
                        break;
                    }
                  }
                })
              })
            }
          })
        } else {
          this.storage.remove(JWT_TOKEN);
        }
      }
    });
  }
}
