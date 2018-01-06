import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MenuProvider } from '../../providers/menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { ManageMenuPage } from '../manage-menu/manage-menu';

@IonicPage()
@Component({
  selector: 'page-create-menu',
  templateUrl: 'create-menu.html',
})
export class CreateMenuPage {

  photoRef = firebase.storage().ref('/recipe');
  photo: any;
  photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/DefaultRecipe.jpg?alt=media&token=afb985c6-5b8d-4154-aadd-2513a3c0e7fe';

  menu = {
    photo: this.photoURL,
    name: '',
    serving: '',
    duration: '',
    type: '',
    category: '',
    step: ''
  }

  lists = [];
  ing = [];
  qty = [];
  unit = [];
  index;

  ingredient = [];
  quantity = [];
  units = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, public actionCtrl: ActionSheetController, public afireauth: AngularFireAuth, public camera: Camera) {
    this.lists.push(null);
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
      this.menu.photo = savedPicture.downloadURL;
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

  create(){
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
    this.readData();
    this.menuService.addMenu(this.menu, this.ingredient, this.quantity, this.units).then((res: any) =>{

      if(res.success){
        loader.dismiss();

        toast.setMessage('Add Menu Success');
        toast.present();
        this.navCtrl.setRoot(ManageMenuPage);
      }
      else{
        loader.dismiss();
        
        alert.setTitle('Add Menu Fail');
        alert.setMessage('Your menu cannot be upload to database. Please try again');
        alert.present();
      }
    })
  }

  addInput(){
    this.lists.push(null);
  }

  readData(){

    this.ing.push(this.ing[this.index]);
    this.qty.push(this.qty[this.index]);
    this.unit.push(this.unit[this.index]);

    for(var a in this.ing){
      if(this.ing[a] != null){
        this.ingredient.push(this.ing[a]);
      }
    }
    console.log(this.ingredient);

    for(var b in this.qty){
      if(this.qty[b] != null){
        this.quantity.push(this.qty[b]);
      }
    }
    console.log(this.quantity);
    
    for(var c in this.unit){
      if(this.unit[c] != null){
        this.units.push(this.unit[c]);
      }
    }
    console.log(this.units);
  }
}
