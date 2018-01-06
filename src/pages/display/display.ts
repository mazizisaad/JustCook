import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  menuID;

  menus = [];
  ingredient = [];
  quantity = [];
  unit = [];

  lists = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public menuService: MenuProvider, public social: SocialSharing, public toastCtrl: ToastController) {
  
    let ver = 0;
    this.menuID = this.navParams.get('id');

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.menuService.getMenuDetail(this.menuID).then((res: any) =>{
      loader.dismiss();

      this.menus = res;

      this.menuService.getIngredient(this.menuID).then((res: any) =>{
        for(var ings of res){
          for(var i in ings){
            this.ingredient.push(ings[i]);
            ver++;
          }
        }
        this.lists = new Array(ver);
      })

      this.menuService.getQuantity(this.menuID).then((res: any) =>{
        for(var qtys of res){
          for(var i in qtys){
            this.quantity.push(qtys[i]);
          }
        }
      })

      this.menuService.getUnit(this.menuID).then((res: any) =>{
        for(var unts of res){
          for(var i in unts){
            this.unit.push(unts[i]);
          }
        }
      })
    })
  }
  
  share(name, photo){

    let toast = this.toastCtrl.create({
      message: 'Share success',
      duration: 3000
    })

    this.social.shareViaFacebook(name,photo, null).then(() =>{
      toast.present();
    }).catch(() =>{
      toast.setMessage('Share fail');
      toast.present();
    })
  }
}
