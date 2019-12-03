import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";
/* import new Module component ... */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule} from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { ShareDirectiveModule } from "./directives/share-directive.module";
import { Camera } from '@ionic-native/Camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { customAlertEnter } from "./_helper/customAlertEnter";
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Network } from '@ionic-native/network/ngx';
const config: SocketIoConfig = { url: `${environment.url}/chat`, options: {} };
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("JWT_TOKEN")
    },
    whitelistedDomains: ["192.168.1.124:3000","192.168.1.235:3000","35.240.206.248"]
  };
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareDirectiveModule,
    IonicModule.forRoot({
      swipeBackEnabled: false,
      alertEnter: customAlertEnter
    }),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    AppRoutingModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    EmailComposer,
    ActionSheet,
    WheelSelector,
    OneSignal,
    AppVersion,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
