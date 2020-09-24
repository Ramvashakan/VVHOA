import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class UserDetailsService {
  userUid: any;
  current_UserName: any;
  proPicture: any;

  constructor(private AF: AngularFireAuth, private AFS: AngularFirestore) {
    this.getID().then((result) => {
      this.userUid = result;
      this.UserName();
    });
  }

  getID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AF.authState.subscribe((user) => {
        if (user) {
          resolve(user.uid);
        }
      });
    });
  }

  UserName(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AFS.collection("Allusers")
        .doc(this.userUid)
        .get()
        .subscribe((result) => {
          if(result != null)  
            resolve(result.data().Name)
        });
    });
  }


  getUserEmail():Promise<any>{

    return new Promise((resolve,reject)=>{

      this.AF.authState.subscribe((user)=>{
        if(user){
          resolve(user.email)
        }
      })

    })
  }


  getPropic(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AFS.collection('propicture/')
        .doc(this.userUid)
        .get().subscribe((snapshot)=>{
          let a = snapshot.data().ProfilePicture;
          resolve(a);
        })

    });
  }

}
