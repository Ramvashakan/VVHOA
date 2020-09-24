import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  paytmentList;
  bankLinks;
  backButtonSubscription;
  constructor(
    private inAppBrowser: InAppBrowser,
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.payment();
  }

  ngOnInit() {
  }


  payment() {
    this.paytmentList = [
      {
        name: "BSNL Bill Pay",
        url: "https://portal.bsnl.in/myportal/",
      },

      {
        name: "TNEB",
        url:
          "https://www.tnebnet.org/awp/login;jsessionid=J1YJDVWeqY1h4G-GBiAgV3EW",
      },
      {
        name: "Airtel-Prepaid",
        url: "https://www.airtel.in/prepaid-recharge/",
      },
      {
        name: "Airtel-Postpaid",
        url: "https://www.airtel.in/postpaid-bill-pay",
      },
      {
        name: "Jio Recharge",
        url: "https://www.jio.com/en-in/4g-plans",
      },
    ];

    this.bankLinks = [
      {
        name: "Sbi Bank",
        url: "https://www.onlinesbi.com/",
      },
      {
        name: "Axis Bank",
        url:
          "https://www.axisbank.com/bank-smart/internet-banking/getting-started",
      },
      {
        name: "HDFC Bank",
        url: "https://v1.hdfcbank.com/assets/popuppages/netbanking.htm",
      },
      {
        name: "TMB",
        url: "https://www.tmbnet.in/",
      },
      {
        name: "Candra Bank",
        url: "https://www.canarabank.com/NET_Banking.aspx",
      },
      {
        name: "KVB",
        url: "https://www.kvbin.com/B001/ENULogin.jsp",
      },
      {
        name: "Indian Bank",
        url: "https://www.indianbank.net.in/jsp/startIB.jsp",
      },
    ];
  }

  link(i) {
    const ref = this.inAppBrowser.create(this.paytmentList[i].url, "_system");

    ref.show();
  }

  link1(j) {
    const ref1 = this.inAppBrowser.create(this.bankLinks[j].url, "_system");
    ref1.show();
  }

  filterList(ev) {
    this.payment();

    var searchItem = ev.target.value;

    this.paytmentList = this.paytmentList.filter((names) => {
      return names.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
    });

    this.bankLinks = this.bankLinks.filter((names) => {
      return names.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
    });
  }

  back() {
    this.navCtrl.setDirection("back");
    this.navCtrl.pop();
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
