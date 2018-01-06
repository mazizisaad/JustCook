import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  photoRef = firebase.storage().ref('/photos');
  photo: any;
  photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/userProfile.jpg?alt=media&token=b497ea8a-0499-48bd-a7d9-17a5c4fdfd64';

  user = {
    name: '',
    email: '',
    password: '',
    photo: this.photoURL
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, public actionCtrl: ActionSheetController, public afireauth: AngularFireAuth, public camera: Camera) {
  }

  selectPhoto(){
    let action = this.actionCtrl.create({
      title: 'Select photo option',
      buttons: [
        {
          text: 'Camera',
          handler: () =>{
            this.cameraPicture();
          }
        },
        {
          text: 'Album',
          handler: () =>{
            this.albumPicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    action.present();
  }

  cameraPicture(){
    let loader = this.loadingCtrl.create({
      content: 'Loading image'
    });

    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData =>{
      loader.present();
      this.photo = imageData;
      this.uploadPicture();
      loader.dismiss();
    }, error =>{
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  albumPicture(){
    let loader = this.loadingCtrl.create({
      content: 'Loading image'
    });

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      loader.present();
      this.photo = imageData;
      this.uploadPicture();
      loader.dismiss();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  uploadPicture(){

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.photoRef.child(this.afireauth.auth.currentUser.uid).child(this.generateUUID() + '.jpeg')
    .putString(this.photo, 'base64', { contentType: 'image/jpeg' })
    .then((savedPicture) => {
      loader.dismiss();
      this.photoURL = savedPicture.downloadURL;
      this.user.photo = savedPicture.downloadURL;
    });
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  signUp(){
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
    this.authService.signup(this.user).then((res: any) =>{

      if(res.successSet){
        loader.dismiss();

        this.navCtrl.setRoot(HomePage);
        toast.setMessage('Signup Success');
        toast.present();
      }
      else if(res.failSet || res.failUpdate){
        loader.dismiss();
        
        alert.setTitle('Signup Fail');
        alert.setMessage('Due to few problems, your profile is not updated. Please contact customer service for further action');
        alert.present();
      }
      else if(res.failCreate){
        loader.dismiss();
        
        alert.setTitle('Signup Fail');
        alert.setMessage('Due to few problems, your account cannot be created. Please contact customer service for further action');
        alert.present();
      }
    })
  }

  clear(){

    this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/userProfile.jpg?alt=media&token=b497ea8a-0499-48bd-a7d9-17a5c4fdfd64';
    this.user.name = '';
    this.user.email = '';
    this.user.password = '';
    this.user.photo = this.photoURL;
  }

}
