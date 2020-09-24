import { Component, OnInit } from "@angular/core";
import { Platform, NavController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.page.html",
  styleUrls: ["./complaints.page.scss"],
})
export class ComplaintsPage implements OnInit {
  backButtonSubscription;
  allComplaints = [];

  constructor(
    private platform: Platform,
    private NavCtrl: NavController,
    private AFS: AngularFirestore
  ) {
    AFS.collection("message").ref.orderBy("created","asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {

          this.allComplaints.push(doc.data())

        });

        console.log(this.allComplaints)

      });
  }

  ngOnInit() {}

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

  goBack() {
    this.NavCtrl.setDirection("back");
    this.NavCtrl.navigateBack("/main/enquiry");
  }
}
