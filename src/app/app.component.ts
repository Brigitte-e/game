import { Component, ViewChild } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import {Angular2TokenService} from "../../node_modules/angular2-token/";
import {environment} from "./enviroments/enviroments";
import { FormPage } from '../pages/form/form';
import jQuery from "jquery";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = "FormPage";
  //@ViewChild(Nav) nav: Nav;

  constructor(private app : App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/*, private navCtrl: NavController, private authToken: Angular2TokenService*/) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.navCtrl.setRoot('subContent');
    });
    //this.authToken.init(environment.token_auth_config);
  }

  openPage(pageName:string) : void {
    this.app.getActiveNav().push(pageName);
    //this.navCtrl.push(pageName);

   // var elem = document.querySelector(".menu-enabled");
   // elem.classList.remove('show-menu'); 
   // console.log(elem);
    //jQuery(".menu-content").css('transform','translateX(0)');
    //jQuery(".menu-content").removeClass('menu-content-open');
  }
}
