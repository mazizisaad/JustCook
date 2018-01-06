import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html',
})
export class PasswordRecoveryPage {

  email;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  sendRequest(){
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
    this.authService.recoverPassword(this.email).then((res: any) =>{
      if(res.success){
        loader.dismiss();
        
        toast.setMessage('Request Sent');
        toast.present();
        this.email = '';
      }
      else if(res.failRecover){
        loader.dismiss();
        
        alert.setTitle('Request Fail');
        alert.setMessage('Password recovery request fail. Please contact customer service for further action');
        alert.present();
      }
    })
  }
}
