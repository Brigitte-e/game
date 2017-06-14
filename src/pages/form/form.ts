import {Component, Input, PipeTransform, Pipe} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
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
  public errorEmail: string;
  public errorPassword: string;
  public errorConfirmPassword: string;
  public stateArr: string[];
  
  public loginPage : number[];
  public registerPage : number[];
  public forgotPasswordPage : number[];

  public passwordInput: string;
  public confirmPasswordInput: string;
  public emailInput: string;

  public inputPar : number;
  public stateJson : {};

  public test : string;

  states: {};
  state: string;


  //@Input() user_login : string = '';
  //@Input() user_password : string = '';

  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams) {
    this.loginPage = new Array(2);
    this.registerPage = new Array(3);
    this.forgotPasswordPage = new Array(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  navHomePage(pageName: string): void{
    pageName === 'HomePage' ? this.navCtrl.setRoot(pageName) : this.navCtrl.push(pageName);
  }

  getHeaders(){
    var headers = new Headers();
   // headers.append('Access-Control-Allow-Origin', '*');
   headers.append('AccessControlAllowHeaders', 'Content-Type, Accepts, client');
   // headers.append('AccessControlAllowMethods', 'POST, GET, PUT, DELETE, OPTIONS');
  //  headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //headers.append('Connection', 'keep-alive');
    //headers.append('Vary', 'Origin');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //headers.append('Content-Type', 'application/json; charset=utf-8');
    //headers.append('Transfer-Encoding', 'chunked');
    //headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('Access-Control-Allow-Methods', ' GET, POST, OPTIONS');
    headers.append('Access-Control-Allow-Headers', ' Origin, X-Requested-With, Content-Type, Accept, Authorization, client');
    headers.append('Access-Control-Expose-Headers',' client');

    headers.append('Access-Control-Allow-Headers', 'X-Total-Count');
    headers.append('Content-Type', 'application/json')
    return headers;
  }


  sendForgotPasswordData(){
    var valueAnswer=this.emailCheck(this.emailInput); //console.log(valueAnswer);
  }

  sendRegisterData(){
    var checkedFields=this.checkFields(this.emailInput,this.passwordInput,this.confirmPasswordInput, 'registration'); //console.log(checkedFields);
      var value1=this.emailInput;
      var value2=this.passwordInput;
      console.log(value1 + ' ' + value2);
    this.http.post('http://localhost:3001/regUser', 
      {email : value1, password : value2})
    .map((res : Response) => res.json())
    .subscribe((data) => this.navHomePage('FormPage'));
  }

  emailCheck(valueEmail){
    if(typeof valueEmail != 'undefined' && Object.keys(valueEmail) != null && Object.keys(valueEmail).length != 0){
      if(valueEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){/*alert(true);*/ return true}else{/*alert(false);*/ this.errorEmail = 'Email don`t match'; return false; }
    }else{
      this.errorEmail = 'Please enter your email'; return false; 
    }
  }

  emailPassword(valuePassword){
    if(typeof valuePassword != 'undefined' && Object.keys(valuePassword) != null && Object.keys(valuePassword).length != 0 && Object.keys(valuePassword).length > 5){
      return true; 
    }else{
      this.errorPassword = 'Password must be at least 6 characters long';
      return false; 
    }
  }

  confirmPassword(valueConfirm, valuePassword){
    if(valuePassword == valueConfirm){
     return true; 
    }else{
      this.errorConfirmPassword = 'Passwords are not egular';
      return false; 
    }
  }

  checkFields(valueEmail, valuePassword, valueConfirm, status) {

    var emailAnswer = this.emailCheck(valueEmail); 
    var passwordAnswer = this.emailPassword(valuePassword);
    var confirmPassword = this.confirmPassword(valueConfirm, valuePassword);
    
    if (status == 'login') {
      if(emailAnswer==true && passwordAnswer==true){
        return true;
      }else {
        return false;
      }
    }

    if(status == 'registration') {
      if(emailAnswer==true && passwordAnswer==true && confirmPassword == true){
        return true;
      }else {
        return false;
      }
    }

    if(status == 'forgotPassword') {
      if(emailAnswer==true){
        return true;
      }else {
        return false;
      }
    }
  }

  sendLoginData() {
    //var value1 = this.loginInput;
    //var value2 = this.passwordInput;
    var error = 'error';

    var checkedFields=this.checkFields(this.emailInput, this.passwordInput,'', 'login'); //console.log(checkedFields);

    //console.log(value1 + ' ' + value2);
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    // var hjg = 'http://192.168.1.34:3000'; ------ IP
    //URL : http://localhost:3001/getLoginData
    //Params: {user_name : value1, user_password : value2}
    //FULL URL (POST): http://localhost:3001/getLoginData?user_name=value1&user_password=value2
    if(checkedFields){
      //var link = 'http://192.168.1.26:3000'.concat('/auth/sign_in');
      var link = 'http://localhost:3001/authUser';
      var value1 =this.emailInput;
      var value2=this.passwordInput;
      var result = this.http.post( link, /*'http://localhost:3001/getLoginData',*/
        //{user_name : this.loginInput, user_password : this.passwordInput})
        //{headers : this.getHeaders()},
         {email : value1, password : value2},
         {headers : this.getHeaders()})
        .map((res : Response) => res.json())
        .subscribe(
          (data) =>  
          this.feedBack(data),

          (error) => this.errorMessage = String(error.json().errors))
         //window.location.href='http://www.cnn.com/'
        //.catch((error:any) => this.message =error.json().error);
        //.catch(this.errorMessage);
        //console.log(this.message );

        /*
        
        .map((res : Response) => res.json())
  .subscribe((data) => this.userEmail = data.userEmail);
    
        */

        console.log(this.errorMessage);
       
    }else{
      //alert(error); 
      return error;
    }
  }

  feedBack(data){
    localStorage.removeItem('userid');
    localStorage.setItem('userid',  data.userid);
    this.navHomePage('HomePage');
  }

  getState(state, fieldsNumber) {
    //console.log(state + ' ' + fieldsNumber.length);
    this.state = state;
    this.inputPar = fieldsNumber;
    this.errorEmail = '';
    this.errorPassword = '';
    this.errorConfirmPassword = '';
    this.emailInput = 'mail@mail.com'; 
    this.passwordInput = '123123123';
    this.confirmPasswordInput = '';
  }

  ngOnInit(): void {
    //this.state = 'login'; 
    this.getState('login', new Array(2));
  }
    //this.stateArr = [];

    // var statesObj = {
    //   login_1 : {"name" : "#form_user_login", "placeholder": "Username"}, 
    //   login_2 : {"name" : "#form_user_password", "placeholder" : "Password"},

    //   register_1 : {"name" : "#form_user_login", "placeholder": "Username"}, 
    //   register_2 : {"name" : "#form_user_password", "placeholder" : "Password"}, 
    //   register_3 : {"name" : "#form_user_password_confirm", "placeholder" : "Confirm Password"},

    //   forgot_password : {"name" : "#form_user_email", "placeholder": "Useremail"}
    // }
    
    // for(var key in statesObj) {
    //   this.stateArr.push(statesObj[key]);
    // }

    //this.stateArr.push({"name" : "#form_user_login", "placeholder": "Username"}, {"name" : "#form_user_password", "placeholder" : "Password"});
    //this.stateArr.push({"name" : "#form_user_login", "placeholder": "Username"}, {"name" : "#form_user_password", "placeholder" : "Password"}, {"name" : "#form_user_password_confirm", "placeholder" : "Confirm Password"});
    //this.stateArr.push({"name" : "#form_user_email", "placeholder": "Useremail"});
    



    //   "login": {
    //     "username": [
    //       {
    //         "name": "#form_user_login",
    //         "placeholder": "Username"
    //       },
    //       {
    //         "name": "#form_user_password",
    //         "placeholder": "Userpassword"
    //       }
    //     ]
    //   },
    //   "register": {
    //     "username": [
    //       {
    //         "name": "#form_user_login",
    //         "placeholder": "Username"
    //       },
    //       {
    //         "name": "#form_user_password",
    //         "placeholder": "Userpassword"
    //       },
    //       {
    //         "name": "#form_user_forgotpasswprd",
    //         "placeholder": "User forgot password"
    //       }
    //     ],
    //   },
    //   "forgot_password": {
    //     "useremail": [
    //       {
    //         "name": "#form_user_email",
    //         "placeholder": "User email"
    //       }
    //     ]
    //   }
    // }
 


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
    /*const stateFields = [
        {login: {
                  username: {name: '#form_user_login', placeholder: 'Username'},
                  password: {name: '#form_user_password', placeholder: 'Username'}
                }},
 
        {register: {
                  username: {name: '#form_user_login', placeholder: 'Username'},
                  password: {name: '#form_user_password', placeholder: 'Username'}
                }},
      
        {forgotPassword: {
                  username: {name: '#form_user_login', placeholder: 'Username'},
                  password: {name: '#form_user_password', placeholder: 'Username'}
                }}

    ];*/

   // console.log(JSON.stringify(stateFields.login.username.name))

    //this.inputPar = stateFields.login.username.name;

  /*getStateLabel(){
    switch (this.state){
      case 'login': return 'Sign In';
      case 'register': return 'Register';
      case 'forgotPassword': return 'Forgot Password';
    }
  }*/

}
