import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthService } from './services/auth.service';
import { environment } from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private appVersion: AppVersion
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        console.log(this.appVersion.getVersionNumber())
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
}


