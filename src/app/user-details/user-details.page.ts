import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {


  name: any;
  phNumber: any;
  drNumber: any;
  email: any;
  a: any;

  constructor( public AF: AngularFireAuth,
    public AlrtCtrl: AlertController,
    public Loading: LoadingController,
    private router: Router,
    private AFS:AngularFirestore,
    private NavCtrl: NavController,
    private route: ActivatedRoute,
    ) 
    {
      
      this.email = this.route.snapshot.paramMap.get("emailID");

      console.log(this.email);
    }

  ngOnInit() {
  }

  async save() {
    if (this.name == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter the valid name",
        buttons: ["OK"],
      });

      alert.present();
    } else if (this.phNumber == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter the valid Mobile number",
        buttons: ["OK"],
      });
      alert.present();
    } else if (this.drNumber == null) {
      let alert = await this.AlrtCtrl.create({
        header: "Error",
        message: "Enter the valid Door number",
        buttons: ["OK"],
      });
      alert.present();
    } else {
      const load = await this.Loading.create({
        message: "Adding...",
        spinner: "dots",
        backdropDismiss: false,
        keyboardClose: true,
        translucent: true,
        showBackdrop: true,
      });
      load.present();

      this.a = (await this.AF.currentUser).uid;

      this.AFS.collection('Allusers').doc(this.a).set({
        Name: this.name,
        PhoneNumber: this.phNumber,
        DoorNumber: this.drNumber,
        Email: this.email,
      });

      this.name = null;
      this.phNumber = null;
      this.drNumber = null;

      load.dismiss();
      let alrt = await this.AlrtCtrl.create({
        message: "Data has been added successfully",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              this.NavCtrl.navigateRoot("/main",{animationDirection:'forward'});
            },
          },
        ],
      });
      alrt.present();
    }
  }

}
