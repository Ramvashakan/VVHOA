import { Component, OnInit } from "@angular/core";
import {
  Platform,
  NavController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserDetailsService } from "../services/user-details.service";
import { Router } from "@angular/router";

import * as firebase from "firebase";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  userUid: any;
  newsFeed = [];
  userName: any = "";
  postImage: any = "";
  propic: any = "";
  discription: string = "";
  backButtonSubscription;

  constructor(
    private platform: Platform,
    private AFS: AngularFirestore,
    private userDetails: UserDetailsService,
    private Router: Router,
    private NavCtrl: NavController,
    private alrtCtrl: AlertController,
    private Loading: LoadingController
  ) {
    this.userDetails
      .getID()
      .then((result) => {
        if (result != null) {
          this.userUid = result;
          console.log(this.userUid);
        }
      })
      .then(() => {
        this.userDetails
          .UserName()
          .then((result) => {
            this.userName = result;
            console.log(this.userName);
          })
          .then(() => {
            this.userDetails.getPropic().then((result) => {
              if (result != null) {
                this.propic = result;
              }
            });
          });
      });
  }

  ngOnInit() {}

  selectImage() {
    this.platform.ready().then(() => {
      const option = {
        height: 500,
        width: 500,
        maximumImagesCount: 1,
        outputType: 1,
      };

      // this.imagep.getPictures(option).then((result) => {
      //   if (result != null && result.length == 1) {
      //     this.postImage = "data:image/jpeg;base64," + result;
      //   }
      // });
    });
  }

  async postNews() {
    let load = await this.Loading.create({
      message: "Posting Your News...",
      keyboardClose: true,
      spinner: "circles",
      mode: "ios",
    });

    if (this.postImage != "" || this.discription.trim() != "") {
      load.present();
      this.newsFeed.push({
        url: this.postImage,
        comment: this.discription,
        propic: this.propic,
        userName: this.userName,
      });

      this.AFS.collection("newsFeed")
        .add({
          url: this.postImage,
          comment: this.discription,
          propic: this.propic,
          userName: this.userName,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.postImage = null;
          this.discription = "";
          load.dismiss();
          this.Router.navigateByUrl("/main");
        });
    } else {
      let alert = await this.alrtCtrl.create({
        header: "Please add an Image or Discription",
        mode: "ios",
        buttons: ["OK"],
      });

      alert.present();
    }
  }

  goBack() {
    this.NavCtrl.setDirection("back");
    this.NavCtrl.navigateBack("/main");
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      100,
      () => {
        this.NavCtrl.back();
      }
    );
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
