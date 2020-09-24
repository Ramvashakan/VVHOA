import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import {
  LoadingController,
  NavController,
  AlertController,
} from "@ionic/angular";
import { UserDetailsService } from "../services/user-details.service";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { AngularFirestore } from "@angular/fire/firestore";
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  darkMode: boolean = false;

  userEmail: any;
  Username: any;
  userUid: any;
  proPicture: any = null;

  allDetails = [];

  callDetails = [
    {
      name: "Police",
      number: "100",
    },
    {
      name: "Security Main Gate",
      number: "8098459511",
    },

    {
      name: "Security Side Gate",
      number: "8098459519",
    },
    {
      name: "Austinpatti Police Station",
      number: "9498101406",
    },
    {
      name: "FireStation",
      number: "101",
    },
    {
      name: "Goverment Ambulance",
      number: "108",
    },
    {
      name: "TNEB Thirunagar",
      number: "4522484079",
    },
    {
      name: "Cable TV",
      number: "9750662194",
    },
  ];

  constructor(
    private AF: AngularFireAuth,
    private AFS: AngularFirestore,
    private router: Router,
    private impicker:ImagePicker,
    private UserDetails: UserDetailsService,
    private loading: LoadingController,
    private NavCtrl: NavController,
    private call: CallNumber,
    private alertCtrl: AlertController
  ) {
    this.UserDetails.getID()
      .then((result) => {
        this.userUid = result;
      })
      .then(() => {
        this.getDetails().then((result) => {
          this.allDetails = result;
        });

        this.UserDetails.getPropic().then((result) => {
          if (result != null) {
            this.proPicture = result;
          }
        });

        this.UserDetails.UserName()
          .then((result) => {
            console.log(result);

            this.Username = result;
          })
          .catch((err) => {
            console.log(err);
          });
      });

    UserDetails.getUserEmail().then((result) => {
      this.userEmail = result;
      if (this.userEmail != "vramvasu99@gmail.com") {
        let x = document.getElementById("alluser");
        x.remove();
      }
    });
  }

  ngOnInit() {}

  getDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AFS.collection("Allusers/")
        .doc(this.userUid)
        .get()
        .subscribe((result) => {
          if(result != null){
          let details = result.data();
          console.log(details);
          resolve(details);
          }
          
        });
    });
  }



  async propic() {
    let load = await this.loading.create({
      message: "Updating Your Profile Pic...",
      spinner: "circles",
      translucent: true,
      duration: 2000,
    });

    let alrt = await this.alertCtrl.create({
      header: "Added Profile Picture Successfully",
      buttons: ["OK"],
      backdropDismiss: false,
      translucent: true,
    });

    const option: ImagePickerOptions = {
      height: 200,
      width: 200,
      maximumImagesCount: 1,
      outputType: 1,
      quality: 100,
    };

    this.impicker.requestReadPermission().then(() => {
      this.impicker.hasReadPermission().then((val) => {
        if (val) {
          this.impicker.getPictures(option).then((result) => {
            if (result != null && result.length == 1) {
              load.present();
              this.proPicture = "data:image/jpeg;base64,"+ result;

              this.AFS.collection("propicture").doc(this.userUid).set({
                ProfilePicture: this.proPicture,
              });
            }
          });
          load.onDidDismiss().then(() => {
            alrt.present();
          });
        }
      });
    });
  }



  dark() {
    this.darkMode != this.darkMode;

    document.body.classList.toggle("dark");
  }

  callUser(i) {
    let number = this.callDetails[i].number;

    //this.call.callNumber(number,true)
    alert(this.callDetails[i].number);
  }

  payment() {
    this.router.navigateByUrl("/payment");
  }

  callUser1(num) {
    //this.call.callNumber(num,true)
    alert(num);
  }

  allUser() {
    this.router.navigateByUrl("/all-user");
  }

  logout() {
    this.AF.signOut().then(() => {
      this.NavCtrl.navigateRoot("/home", { animationDirection: "back" });
    });
  }
}
