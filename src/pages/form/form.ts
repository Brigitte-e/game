import {Component, Input} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IonicPage } from 'ionic-angular';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


/**
 * Generated class for the FormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  public counterValue : number;
  public message : string;
  public errorMessage: string;

  states: {};
  state: string;


  //@Input() user_login : string = '';
  //@Input() user_password : string = '';

  constructor(private http : Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  getHeaders(){
    var headers = new Headers();

  //  headers.append('Access-Control-Allow-Origin', '*');
  //  headers.append('AccessControlAllowHeaders', 'Content-Type, Accept');
  //  headers.append('AccessControlAllowMethods', 'POST, GET, PUT, DELETE, OPTIONS');
  //  headers.append('Content-Type', 'application/x-www-form-urlencoded')
      headers.append('Content-Type', 'application/json')
    return headers;
  }


  sendLoginData(value1 , value2 ) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // var hjg = 'http://192.168.1.34:3000'; ------ IP
    //URL : http://localhost:3001/getLoginData
    //Params: {user_name : value1, user_password : value2}
    //FULL URL (POST): http://localhost:3001/getLoginData?user_name=value1&user_password=value2
    var link = 'http://192.168.1.34:3000';
    var result = this.http.post( link+'/auth/sign_in', //http://localhost:3001/getLoginData
      //{user_name : value1, user_password : value2})
     // {headers : this.getHeaders()},
       {email : value1, password : value2},
       {headers : this.getHeaders()})
      .map((res : Response) => res.json())
      .subscribe((data) => this.message = "POST " + data, (error) => this.errorMessage = String(error.json().errors))
       //window.location.href='http://www.cnn.com/'
      //.catch((error:any) => this.message =error.json().error);
      //.catch(this.errorMessage);

  }


 /* getAjaxCallTest (value : string){
    console.log(value);
    var message = "";
    //var result = this.http.get('http://localhost:3001/getLocalResources')
    var result = this.http.get('http://localhost:3001/getLocalResources')//'http://localhost:3001/getLocalResources'
      .map((res : Response) => res.json())
      .subscribe((data) => this.message = "GET " + data.message); //data => message = data | alert(data.message)
  }*/

  /*hackGoogle() {
    console.log(this.getHeaders());
    var result = this.http.get('https://jsonplaceholder.typicode.com/posts', 
      {headers : this.getHeaders()})
      .map((res : Response) => res.json())
      .subscribe((data) => console.log(data));
  }*/
    /*var result = this.http.post(subUrl, {user_name : value})
     .map((res : Response) => res.json())
     .subscribe((data) => this.message = "POST " + data.message);*!/


  /*getAjaxCallTest (value : string){
    console.log(value);
    var message = "";
    var result = this.http.get('http://localhost:3001/getLocalResources')
      .map((res : Response) => res.json())
      .subscribe((data) => this.message = "GET " + data.message); //data => message = data | alert(data.message)
  }

  getAjaxCallPOSTTest(value : string ){
    var headers = new Headers({ 'Content-Type': 'application/json'});

    var subUrl = 'http://localhost:3001/getLoginData';
    var message = "";
    var result = this.http.post(subUrl, {user_name : value})
      .map((res : Response) => res.json())
      .subscribe((data) => this.message = "POST " + data.message); //data => message = data | alert(data.message)
  }*/


  /*getCountedValue(value : string) : void{
    this.counterValue *= 20;
    console.log("Click" + this.user_password );
  }*/

  ngOnInit(): void {
    this.state = 'login'; 
  }

  getState(state) {
    //console.log(state);
   /* switch (state){
      case 'login': return 'Sign In';
      case 'register': return 'Register';
      case 'forgotPassword': return 'Forgot Password';
    }*/
   // return state;
    this.state = state;
  }

  /*getStateLabel(){
    switch (this.state){
      case 'login': return 'Sign In';
      case 'register': return 'Register';
      case 'forgotPassword': return 'Forgot Password';
    }
  }*/

}
