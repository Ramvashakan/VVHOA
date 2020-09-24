import { Component, OnInit } from "@angular/core";
import { ActionSheetController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UserDetailsService } from "../services/user-details.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.page.html",
  styleUrls: ["./news-feed.page.scss"],
})
export class NewsFeedPage implements OnInit {
  newsFeed = [];
  trail = [];
  length: any;
  current_UserName: any;
  proPicture: any = "";
  AllFeed = [];
  image: any;
  userUid: any;

  constructor(
    private AFS: AngularFirestore,
    private ActionSheet: ActionSheetController,
    private Route: Router,
    private navCtrl: NavController,
    private userDetails: UserDetailsService
  ) {
    userDetails.getUserEmail().then((result) => {
      if (result == "vramvasu99@gmail.com") {
        document.getElementById("addFeed").style.visibility = "visible";
      }
    });

    this.userDetails
      .getID()
      .then((result) => {
        this.userUid = result;
      })
      .then(() => {
        this.userDetails
          .UserName()
          .then((result) => {
            this.current_UserName = result;
          })
          .catch((err) => {
            console.log(err);
          });
        this.userDetails.getPropic().then((result) => {
          if (result != null && result.length == 1) this.proPicture = result;
        });

        this.getArray()
          .then((result) => {
            if (result != null) {
              for (let i = result.length - 1; i >= 0; i--) {
                this.trail.push(result[i]);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  ngOnInit() {}

  getArray(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AFS.collection("newsFeed")
        .ref.orderBy("created", "asc")
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (doc.data() != null) {
              arr.push(doc.data());
            }
          });
          resolve(arr);
        });
    });
  }

  post() {
    this.Route.navigateByUrl("/post");
  }

  getUpdateList(ev) {
    this.getArray()
      .then((result) => {
        console.log(result);
        this.trail = [];
        console.log(result);
        if (result != null) {
          for (let i = result.length - 1; i >= 0; i--) {
            this.trail.push(result[i]);
          }
        } else {
          ev.target.complete();
        }
      })
      .then(() => {
        ev.target.complete();
      })
      .catch(() => {
        ev.target.complete();
      });
  }
}
