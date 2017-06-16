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

    this.userEmail = localStorage.getItem('uid');
  }

  openPage(pageName:string) : void {
    this.navCtrl.push(pageName);
  }

  getHeaders(){
    var headers = new Headers();

    headers.append('Content-Type', 'application/json')
    headers.append('uid', localStorage.getItem('uid'))
    headers.append('client', localStorage.getItem('client'))
    headers.append('access-token', localStorage.getItem('access-token'))
    
    return headers;
  }

  logOut(){
    var link = 'http://192.168.1.26:3000'.concat('/auth/sign_out');

    this.http.delete(link, 
    {headers : this.getHeaders()})
      .map((res : Response) => res.json())
      .subscribe((data) => this.openPage('FormPage'));

    localStorage.clear();
  }
}

