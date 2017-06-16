import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import jQuery from "jquery";
import 'rxjs/add/operator/map';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  public slidesTotal : number[];
  public jsonArr : any;
  public headerTitle: string;

  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.slidesTotal = new Array(4);
  }

  getHeaders(){
    var headers = new Headers();

    headers.append('Content-Type', 'application/json')
    headers.append('uid', localStorage.getItem('uid'))
    headers.append('client', localStorage.getItem('client'))
    headers.append('access-token', localStorage.getItem('access-token'))

    return headers;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    var link = 'http://192.168.1.26:3000'.concat('/bundles/');
    this.http.get(link, 
      {headers : this.getHeaders()})
      .map((res : Response) => res.json())
      .subscribe((data) => this.jsonArr = data//this.navHomePage('FormPage')
    );

   /* this.jsonArr = [
      {
        "userId": 1,
        "id": 1,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "215",
        "locked": "unlocked",
        "imgSrc": "../assets/level-img-1.jpg"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "Evil beast2",
        "body": "Highest Score:",
        "score": "216",
        "locked": "unlocked",
        "imgSrc": "../assets/level-img-2.jpg"
        },
      {
        "userId": 1,
        "id": 3,
        "title": "Evil beast3",
        "body": "Highest Score:",
        "score": "217",
        "locked": "unlocked",
        "imgSrc": "../assets/level-img-3.jpg"
      },
      {
        "userId": 1,
        "id": 4,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "218",
        "locked": "locked",
        "imgSrc": "../assets/level-img-4.jpg"
      },
      {
        "userId": 1,
        "id": 5,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "219",
        "locked": "locked",
        "imgSrc": "../assets/level-img-1.jpg"
      },
      {
        "userId": 1,
        "id": 6,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "220",
        "locked": "locked",
        "imgSrc": "../assets/level-img-2.jpg"
      },
      {
        "userId": 1,
        "id": 7,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "222",
        "locked": "locked",
        "imgSrc": "../assets/level-img-2.jpg"
      },
      {
        "userId": 1,
        "id": 8,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "217",
        "locked": "locked",
        "imgSrc": "../assets/level-img-2.jpg"
      },
      {
        "userId": 1,
        "id": 9,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "217",
        "locked": "locked",
        "imgSrc": "../assets/level-img-2.jpg"
      },
      {
        "userId": 1,
        "id": 10,
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "217",
        "locked": "locked",
        "imgSrc": "../assets/level-img-2.jpg"
      }
    ]*/
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'This level is locked',
      buttons: ['Ok']
    });
    alert.present();
  }

  gameLevel(number, object) : void{
    if(jQuery(object.path).hasClass('unlocked-false')){
      this.presentAlert();
    } else {
      localStorage.setItem('level-title',  this.jsonArr[number].title);
      localStorage.setItem('level-id',  this.jsonArr[number].id);
      this.navCtrl.push('RulesPage');
    }
  }
}
