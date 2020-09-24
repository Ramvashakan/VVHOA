import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  backButtonSubscription;

  constructor(private platform: Platform) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0,() => {
      navigator["app"].exitApp();
    });
  }

}
