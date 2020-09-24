import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from "./export";

import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreModule,
} from "@angular/fire/firestore";

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import {CallNumber} from '@ionic-native/call-number/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore,
    AngularFireAuth,
    InAppBrowser,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
