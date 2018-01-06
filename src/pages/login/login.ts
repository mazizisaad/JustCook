import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { PasswordRecoveryPage } from '../password-recovery/password-recovery';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  login(){

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    let alert = this.alertCtrl.create({
      buttons: ['Dismiss']
    });

    let toast = this.toastCtrl.create({
      duration: 3000
    });

    loader.present();
    this.authService.login(this.email, this.password).then((res: any) =>{
      if(res.success){
        this.navCtrl.setRoot(HomePage);
        loader.dismiss();
        
        toast.setMessage('Login Success');
        toast.present();
      }
      else if(res.failLogin){
        loader.dismiss();

        alert.setTitle('Login Fail');
        alert.setMessage('Your username or password is incorrect');
        alert.present();
      }
    })
  }

  goSignup(){
    this.navCtrl.push(SignupPage);
  }

  goForgetPassword(){
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
