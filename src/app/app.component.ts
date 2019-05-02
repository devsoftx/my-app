import { Component, OnDestroy, OnInit} from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';
import { MsalService } from '@azure/msal-angular';
import { Subscription} from "rxjs/Subscription";
import { environment } from '../environments/environment';
import { logging } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  isIframe: boolean;
  loggedIn : boolean;
  user : any;
  subscription: Subscription;
  contentAlert: boolean;

  constructor(
    private broadcastService: BroadcastService,
    private msalService: MsalService) {
      this.isIframe = window !== window.parent && !window.opener;
      if(this.msalService.getUser()) {
        this.loggedIn = true;
      }
      else {
      this.loggedIn = false;
    }
  }

  login() {
   this.msalService.loginPopup(["user.read", environment.consent_uri]);
  }

  logout() {
   this.msalService.logout();
  }

  ngOnInit() {
    //this.login();
    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("login failure " + JSON.stringify(payload));
      this.loggedIn = false;

    });

      this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
        console.log("login success " + JSON.stringify(payload));
        this.loggedIn = true;
      });

      if (this.loggedIn){
        this.contentAlert = false;
      }else{
        this.login();
        this.contentAlert = true;
      }

  }

  ngOnDestroy() {
    // disconnect from broadcast service on component destroy
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
