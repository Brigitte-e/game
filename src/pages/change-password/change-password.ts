import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(private http : Http, public navCtrl: NavController, public navParams: NavParams) {
  	this.oldPasswordInput = '';
  	this.newPasswordInput = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  	public oldPasswordInput: string;
  	public newPasswordInput: string;
  	public errorMessage: string;
  	public successMessage: string;

  	getHeaders(){
 	    var headers = new Headers();
  
 	    headers.append('Content-Type', 'application/json')
 	    headers.append('uid', localStorage.getItem('uid'))
 	    headers.append('client', localStorage.getItem('client'))
 	    headers.append('access-token', localStorage.getItem('access-token'))
  
 	    return headers;
 	  }

	sendChangePasswordData(){
	   	var value1 = this.oldPasswordInput;
	   	var value2 = this.newPasswordInput;
	
   		if(this.oldPasswordInput == localStorage.getItem('password')) {
	     	var link = 'http://192.168.1.26:3000'.concat('/auth/password');
	     	this.http.put(link, 
	     	  {password : value2, password_confirmation : value2},
	     	  {headers : this.getHeaders()})
	     	  .map((res : Response) => this.checkData(res))
	     	  .subscribe((data) =>  this.successMessage = data.message
	     	);
	  	} else {
	  		this.errorMessage = 'Check old password';
	  	}
	}

	checkData(res){
		if(res.status==200 && res.headers.get('uid') != null && res.headers.get('access-token') != null && res.headers.get('client') != null){
    		localStorage.clear();

    		localStorage.setItem('password',  this.newPasswordInput);
    		
    		localStorage.setItem('uid',  res.headers.get('uid'));
    		localStorage.setItem('access-token',  res.headers.get('access-token'));
    		localStorage.setItem('client',  res.headers.get('client'));
    	}
		return res.json();
	}

}
