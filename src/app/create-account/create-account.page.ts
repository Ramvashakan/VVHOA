import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  name: any;
  email: any;
  phNumber: any;
  password: any;


  constructor(private AF: AngularFireAuth,
    public loading: LoadingController,
    public AlrtCtrl: AlertController,
    private NavCtrl: NavController,
    private router: Router) { }

  ngOnInit() {

  }


  async create(eml) {
    if (this.email == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter an valid Email id",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.email = null;
              this.password = null;
            },
          },
        ],
      });

      alert.present();
    } else if (this.password == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter an valid password",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.email = null;
              this.password = null;
            },
          },
        ],
      });

      alert.present();
    } else {
      let load = await this.loading.create({
        message: "Creating Account",
        keyboardClose: true,
        spinner: "bubbles",
        duration: 3000,
        translucent: true,
      });
      load.present();

      let alert = await this.AlrtCtrl.create({
        header: "Success",
        message: "Account created Successfull",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.router.navigate(["/user-details", { emailID: eml }]);
              //this.NavCtrl.navigateRoot('/user-details',{animationDirection:'forward'});
            },
          },
        ],
      });

      this.AF.createUserWithEmailAndPassword(this.email, this.password).then(
        (result) => {
          load.onDidDismiss().then(() => {
            this.email = null;
            this.password = null;

            alert.present();
          });
        }
      );
    }
  }

  login() {
    this.router.navigateByUrl("/home");
  }

}
