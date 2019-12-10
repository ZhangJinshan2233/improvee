import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from "../environments/environment.prod";
import { CategoryService } from "./services/category.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NetworkService } from './services/network.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  applationVersion: any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private appVersion: AppVersion,
    private alertController: AlertController,
    private categoryService: CategoryService,
    private iab: InAppBrowser,
    private networkService: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        //detect network
        this.networkService
          .getNetworkStatus()
          .pipe(debounceTime(300))
          .subscribe((connected: boolean) => {
            this.show_alert('network was disconnected :-(')
          });
        
        //initialize notification
        this.setupPush();
        
        //update new version
        this.appVersion
          .getVersionNumber()
          .then((value) => {
            let versionNumber = value.trim().slice(4)
            this.categoryService
              .get_challenge_categories("AppCategory")
              .subscribe(res => {
                let appVersions = []
                if (this.platform.is('ios')) {
                  appVersions = res['categories'].filter(item => {
                    return item.name == "ios"
                  })
                } else {
                  appVersions = res['categories'].filter(item => {
                    return item.name == "android"
                  })
                }
                this.applationVersion = appVersions[0].version
                if (parseInt(versionNumber) < parseInt(this.applationVersion)) {
                  const alert = this.alertController.create({
                    header: 'update new version!',
                    buttons: [
                      {
                        text: 'Cancel',
                        cssClass: 'secondary'
                      }, {
                        text: 'Update',
                        handler: () => {
                          const browser = this.iab.create(appVersions[0].storeUrl);
                          browser.close()
                        }
                      }
                    ]
                  });
                  alert.then(alert => {
                    alert.present()
                  })
                }
              })
          }).catch(err => {
            throw err
          })
      }
    });
  }
  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(environment.ONESIGNAL_ID, environment.ANDROID_ID);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // let additionalData = data.payload.additionalData;
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // this.authService.auto_login_after_read_message()
    });

    this.oneSignal.endInit();
  }

  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}


