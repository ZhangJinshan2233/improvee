import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Network } from '@ionic-native/network/ngx';
import { environment } from "../environments/environment";
import { CategoryService } from "./services/category.service";
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
    private network: Network,
    private oneSignal: OneSignal,
    private appVersion: AppVersion,
    private alertController: AlertController,
    private categoryService: CategoryService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.network.onDisconnect().subscribe(() => {
          this.show_alert('network was disconnected :-(')
        })

        this.appVersion.getVersionNumber().then((value) => {
          let versionNumber = value.trim().slice(4)
          this.categoryService.get_challenge_categories("AppCategory").subscribe(res => {
            let appVersions = []
            if (this.platform.is('android')) {
              appVersions = res['categories'].filter(item => {
                return item.name = "android"
              })
            } else {
              appVersions = res['categories'].filter(item => {
                return item.name = "ios"
              })
            }
            this.applationVersion = appVersions[0].version
            if (parseInt(versionNumber) < parseInt(this.applationVersion)) {
              this.show_alert('update new version:-(')
            }
          })
        }).catch(err => {
          throw err
        })
        this.setupPush();
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


