import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public userEmail: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');

    var userid = localStorage.getItem('userid');
  
    this.http.get('http://localhost:3001/getUserInfo/' + userid)
      .map((res : Response) => res.json())
      .subscribe((data) => this.userEmail = data.userEmail);
  }

  openPage(pageName:string) : void {
    this.navCtrl.push(pageName);
  }
}

