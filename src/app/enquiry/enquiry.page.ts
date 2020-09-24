import { Component, OnInit } from "@angular/core";
import { UserDetailsService } from "../services/user-details.service";
import {
  Platform,
  AlertController,
  NavController,
  ActionSheetController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

import * as firebase from 'firebase'

@Component({
  selector: "app-enquiry",
  templateUrl: "./enquiry.page.html",
  styleUrls: ["./enquiry.page.scss"],
})
export class EnquiryPage implements OnInit {
  message: any;
  allMessage = [];
  backButtonSubscription;
  userUid: any;
  UserEmail: any;

  constructor(
    private UserDetails: UserDetailsService,
    private platform: Platform,
    private alert: AlertController,
    private router: Router,
    private AFS: AngularFirestore,
    private navCtrl: NavController,
    private ActionSheet: ActionSheetController
  ) {
    this.UserDetails.getID()
      .then((result) => {
        this.userUid = result;

        console.log(this.userUid);
      })
      .then(() => {
        UserDetails.getUserEmail()
          .then((result) => {
            this.UserEmail = result;
            console.log(this.UserEmail);
          })
          .then(() => {
            this.showMessage();
          });
      });
  }

  ngOnInit() {}




  async submit() {
    let alrt = await this.alert.create({
      message: "Donot leave the Complaint box empty",
      buttons: ["OK"],
    });

    let alrt1 = await this.alert.create({
      message: "Your Enquiry has been added successfully",
      buttons: ["OK"],
    });

    if (this.message != null) {
      this.AFS.collection("message")
        .add({Message:this.message,
          userId:this.userUid,
          created:firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          alrt1.present();
          this.message = null;
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alrt.present();
    }

    console.log(this.message);
  }

  showMessage() {
    if (this.UserEmail == "vramvasu99@gmail.com") {
      document.getElementById("menu").style.visibility = "visible";
    }
  }

  async showOption() {
    const as = await this.ActionSheet.create({
      header: "Options",
      mode: "ios",

      buttons: [
        {
          text: "View Complaints",
          handler: () => {
            this.router.navigateByUrl("/complaints");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            as.dismiss();
          },
        },
      ],
    });

    as.present();
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      100,
      () => {
        this.navCtrl.back();
      }
    );
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
