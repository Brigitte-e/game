import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import {Angular2TokenService} from "../../node_modules/angular2-token/";
import {environment} from "./enviroments/enviroments";
import { FormPage } from '../pages/form/form';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FormPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/*, private authToken: Angular2TokenService*/) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    //this.authToken.init(environment.token_auth_config);
  }
}
