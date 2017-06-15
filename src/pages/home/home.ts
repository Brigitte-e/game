import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slidesTotal = new Array(4);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.jsonArr = [
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
        "title": "Evil beast",
        "body": "Highest Score:",
        "score": "216",
        "locked": "unlocked",
        "imgSrc": "../assets/level-img-2.jpg"
        },
      {
        "userId": 1,
        "id": 3,
        "title": "Evil beast",
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
    ]
  }

  gameLevel(number) : void{
    this.navCtrl.push('RulesPage');

    localStorage.setItem('level-title',  this.jsonArr[number].title);

    //this.headerTitle = title;


    //.push('GamePage');
  }
}
