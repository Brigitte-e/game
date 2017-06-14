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

  states: {};
  state: string;

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
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('AccessControlAllowHeaders', 'Content-Type, Accepts, client');
    //headers.append('AccessControlAllowMethods', 'POST, GET, PUT, DELETE, OPTIONS');
    //headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //headers.append('Connection', 'keep-alive');
    //headers.append('Vary', 'Origin');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //headers.append('Content-Type', 'application/json; charset=utf-8');
    //headers.append('Transfer-Encoding', 'chunked');
    //headers.append('Access-Control-Allow-Credentials', 'true');

    //headers.append('Access-Control-Allow-Methods', ' GET, POST, OPTIONS');
    //headers.append('Access-Control-Allow-Headers', ' Origin, X-Requested-With, Content-Type, Accept, Authorization, client');
    //headers.append('Access-Control-Expose-Headers',' client');

    //headers.append('Access-Control-Allow-Headers', 'X-Total-Count');
    headers.append('Content-Type', 'application/json')
    return headers;
  }

  sendForgotPasswordData(){
    var valueAnswer=this.emailCheck(this.emailInput);
  }

  sendRegisterData(){

    var value1 = this.emailInput;
    var value2 = this.passwordInput;
    var checkedFields=this.checkFields(this.emailInput,this.passwordInput,this.confirmPasswordInput, 'registration');

    if(checkedFields) {
      this.http.post('http://localhost:3001/regUser', 
        {email : value1, password : value2})
        .map((res : Response) => res.json())
        .subscribe((data) => this.navHomePage('FormPage')
      );
    }
  }

  emailCheck(valueEmail){
    if(typeof valueEmail != 'undefined' && Object.keys(valueEmail) != null && Object.keys(valueEmail).length != 0){
      if(valueEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        return true
      }else {
        this.errorEmail = 'Email don`t match'; return false; 
      }
    }else {
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

    var error = 'Oops..Something went wrong';
    var checkedFields=this.checkFields(this.emailInput, this.passwordInput,'', 'login');

    if(checkedFields){
      //var link = 'http://192.168.1.26:3000'.concat('/auth/sign_in');
      var link = 'http://localhost:3001/authUser';
      var value1 =this.emailInput;
      var value2=this.passwordInput;
      var result = this.http.post( link, 
        {email : value1, password : value2})//,
        //{headers : this.getHeaders()})
        .map((res : Response) => res.json())
        .subscribe(
          (data) =>  this.feedBack(data),
          (error) => this.errorMessage = String(error.json().errors)
        ) 
    }else{
      return error;
    }
  }

  feedBack(data){
    localStorage.removeItem('userid');
    localStorage.setItem('userid',  data.userid);
    this.navHomePage('HomePage');
  }

  getState(state, fieldsNumber) {
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
    this.getState('login', this.loginPage);
  }
}
