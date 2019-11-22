import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthService } from './services/auth.service';
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
    private alertCtrl: AlertController,
    private authService:AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }
  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('2679e88f-acf0-4ea1-a42a-35fbff80ff9f', 'Android_api');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // let additionalData = data.payload.additionalData;
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      this.authService.auto_login_after_read_message()
    });

    this.oneSignal.endInit();
  }
}


