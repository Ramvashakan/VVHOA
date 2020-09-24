import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { UserDetailsService } from '../services/user-details.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  imageList = [];

  image: any;


  constructor(  private loading:LoadingController,
    private imagep: ImagePicker,
    private AFS:AngularFirestore,
    private alertCtrl:AlertController,
    private userDetail:UserDetailsService) { 

      this.userDetail.getFireDate().then((result) => {
        if (result != null) {
          this.imageList = result;
        }
        console.log(this.imageList)
      });

userDetail.getUserEmail().then((result)=>{

  if(result == "vramvasu99@gmail.com"){
    document.getElementById('addImage').style.visibility = "visible";
  }
})
  

    }

  ngOnInit() {
  }


 async post() {
  const option: ImagePickerOptions = {
    height: 500,
    width: 500,
    maximumImagesCount: 1,
    outputType: 1,
  };


  let load = await this.loading.create({
    message:'Updating the Image In Gallery...',
    spinner:'circles',
    translucent:true,
    duration:1500
  })

  let alrt =await this.alertCtrl.create({
    header:"Added Images Successfully",
    buttons:['OK'],
    backdropDismiss:false,
    translucent:true
  })


  this.imagep.getPictures(option).then((result) => {
    if( result !=null && result.length ==1){
      load.present();
    var message = "data:image/jpeg;base64," + result;
   
    this.AFS.collection("gallery").add({
      images: message,
      created: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  });

  load.onDidDismiss().then(()=>{

    alrt.present();

  })

  this.userDetail.getFireDate().then((result) => {
    if ( result != null) {
      this.imageList = result;
    }
  });
}



}
