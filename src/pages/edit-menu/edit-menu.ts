import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { ManageMenuPage } from '../manage-menu/manage-menu';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-edit-menu',
  templateUrl: 'edit-menu.html',
})
export class EditMenuPage {

  items = [];
  menus = [];
  ingredient = [];
  quantity = [];
  unit = [];
  
  index;
  ing = [];
  qty = [];
  units = [];
  ings = [];
  qtys = [];
  unis = [];
  lists= [];

  menuID;
  photoRef = firebase.storage().ref('/recipe');

  menu = {
    photo: '',
    name: '',
    serving: '',
    duration: '',
    type: '',
    category: '',
    step: '',
    id: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuProvider, public loadingCtrl: LoadingController, public actionCtrl: ActionSheetController, public camera: Camera, public afireauth: AngularFireAuth, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.menuID = this.navParams.get('menuID'); 

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.menuService.getMenu().then((res: any) =>{
      loader.dismiss();
      this.items = res;

      for(var key in this.items){
        if(this.items[key].menuID == this.menuID){
          this.menus.push(this.items[key]);
        }
      }

      this.menuService.getIngredient(this.menuID).then((res: any) =>{
        this.ingredient = res;

        this.menuService.getQuantity(this.menuID).then((res: any) =>{
          this.quantity = res;

          this.menuService.getUnit(this.menuID).then((res: any) =>{
            this.unit = res;
            let ver = 0;

            for(var key in this.menus){
              this.menu = {
                photo: this.menus[key].menuPhoto,
                name: this.menus[key].menuName,
                serving: this.menus[key].menuServing,
                duration: this.menus[key].menuDuration,
                type: this.menus[key].menuType,
                category: this.menus[key].menuCategory,
                step: this.menus[key].menuStep,
                id: this.menus[key].menuID
              }

              for(var x of this.ingredient){
                for(var y in x){
                  this.ings.push(x[y]);
                  ver++;
                }
                console.log(this.ings);
              }

              for(var x of this.quantity){
                for(var y in x){
                  this.qtys.push(x[y]);
                }
              }

              for(var x of this.unit){
                for(var y in x){
                  this.unis.push(x[y]);
                }
              }
            
              this.lists = new Array(ver);
            }
          })
        })
      })
    });
  }

  addInput(){
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
      this.menu.photo = imageData;
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
      this.menu.photo = imageData;
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
    .putString(this.menu.photo, 'base64', { contentType: 'image/jpeg' })
    .then((savedPicture) => {
      loader.dismiss();
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

  readData(){

    this.ing.push(this.ings[this.index]);
    this.qty.push(this.qtys[this.index]);
    this.unit.push(this.unis[this.index]);

    this.ingredient = [];
    this.quantity = [];
    
    for(var a in this.ings){
      if(this.ings[a] != null){
        this.ingredient.push(this.ings[a]);
      }
    }
    console.log(this.ingredient);

    for(var b in this.qtys){
      if(this.qtys[b] != null){
        this.quantity.push(this.qtys[b]);
      }
    }
    console.log(this.quantity);
    
    for(var c in this.unis){
      if(this.unis[c] != null){
        this.units.push(this.unis[c]);
      }
    }
    console.log(this.units);
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
    this.menuService.updateMenu(this.menu, this.ingredient, this.quantity, this.units).then((res: any) =>{

      if(res.success){
        loader.dismiss();

        toast.setMessage('Edit Menu Success');
        toast.present();
        this.navCtrl.setRoot(ManageMenuPage);
      }
      else{
        loader.dismiss();
        
        alert.setTitle('Edit Menu Fail');
        alert.setMessage('Your menu cannot be updated to database. Please try again');
        alert.present();
      }
    })
  }
}
