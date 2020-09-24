import { Component } from "@angular/core";

import { Platform, NavController, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AF: AngularFireAuth,
    private NavCtrl: NavController,

    private route: Router,
    private alrtCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.splashScreen.hide();

      this.userRem().then((res) => {
        if (res) {
          this.NavCtrl.navigateRoot("/main", {
            animationDirection: "forward",
          }).then(() => {
            this.splashScreen.hide();
          });
        } else {
          this.NavCtrl.navigateRoot("/home", {
            animationDirection: "forward",
          }).then(() => {
            this.splashScreen.hide();
          });
        }
      });
    });
  }


  userRem(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AF.authState.subscribe((res) => {
        if (res && res.uid) {
          resolve(true);
        }
      });
    });
  }

}
