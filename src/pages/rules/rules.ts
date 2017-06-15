import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RulesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})


export class RulesPage {
  public headerTitle : string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RulesPage');

    this.setData();

  }

  setData() : void {
    this.headerTitle = localStorage.getItem('level-title');
  }


}
