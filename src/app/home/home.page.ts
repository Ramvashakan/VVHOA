import { Component } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  password: any;
  email: any;

  constructor(
    public AlrtCtrl: AlertController,
    private route: Router,
    public Loading: LoadingController,

    private AF: AngularFireAuth
  ) {}

  create() {
    this.route.navigateByUrl("/create-account");
  }

  async loginMain() {
    let alrt = await this.AlrtCtrl.create({
      message: "Try Again...",
      header: "Error",
      buttons: ["OK"],
    });

    const load = await this.Loading.create({
      message: "Loading...",
      spinner: "dots",
      backdropDismiss: false,
      keyboardClose: true,
      translucent: true,
      showBackdrop: true,
    });

    if (this.email == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter the valid Email id",
        buttons: ["OK"],
      });

      alert.present();
    } else if (this.password == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter the valid Password",
        buttons: ["OK"],
      });
      alert.present();
    } else {
      load.present();

      this.AF.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.route
            .navigateByUrl("/main")
            .then(() => {
              load.dismiss();
            })
            .catch(async (err) => {
              let alrt = await this.AlrtCtrl.create({
                message: err,
                header: "Error",
                buttons: ["OK"],
              });

              alrt.present();
              load.dismiss();
            });
        })
        .catch(async (err) => {
          let alrt = await this.AlrtCtrl.create({
            message: err,
            header: "Error",
            buttons: ["OK"],
          });
          alrt.present();
          load.dismiss();
        });
    }
  }
}
