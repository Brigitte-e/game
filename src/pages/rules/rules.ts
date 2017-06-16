import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

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
  public jsonArr : any;
  public lastScore : string;
  public maxStreak : string;
  public reactionTime : string;
  public starts : string;
  public levelText : string;
  public levelImage : string;

  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewDidLoad RulesPage');

    this.setData();

    var link = 'http://192.168.1.26:3000'.concat('/bundles/'+localStorage.getItem('level-id')+'/games/information');
    this.http.get(link, 
      {headers : this.getHeaders()})
      .map((res : Response) => res.json())
      .subscribe((data) => this.getArray(data))
  }

  getArray(data) {
    this.jsonArr = data;
    this.lastScore = this.jsonArr.last_score; 
    this.maxStreak = this.jsonArr.max_streak; 
    this.lastScore = this.jsonArr.last_score; 
    this.reactionTime = this.jsonArr.average_reaction_time;
    this.starts = 'http://192.168.1.26:3000'.concat(this.jsonArr.star_url);
    this.levelImage = 'http://192.168.1.26:3000'.concat(this.jsonArr.image_url);
    this.levelText = this.jsonArr.text;
    return data;
  }

  setData() : void {
    this.headerTitle = localStorage.getItem('level-title');
  }

  openPage(pageName:string) : void {
    this.navCtrl.push(pageName);
  }
}
