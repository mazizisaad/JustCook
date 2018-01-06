import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { CreateMenuPage } from '../create-menu/create-menu';
import { EditMenuPage } from '../edit-menu/edit-menu';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@IonicPage()
@Component({
  selector: 'page-manage-menu',
  templateUrl: 'manage-menu.html',
})
export class ManageMenuPage {

  myMenus = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    
    this.load();
  }

  load(){
    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.menuService.getMyMenu().then((res: any) =>{
      loader.dismiss();
      this.myMenus = res;
      console.log(this.myMenus);
    })
  }

  goCreate(){
    this.navCtrl.push(CreateMenuPage);
  }

  editMenu(key){
    this.navCtrl.push(EditMenuPage, {menuID: key});
  }

  deleteMenu(menuID){

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
    this.menuService.archieveMenu(menuID).then((res: any) =>{
      
      if(res.success){
        loader.dismiss();
        
        toast.setMessage('Delete Menu Success');
        toast.present();
        this.load();
      }
      else{
        loader.dismiss();
        
        alert.setTitle('Delete Menu Fail');
        alert.setMessage('Your menu cannot be deleted from database. Please try again');
        alert.present();
      }

    })
  }
}
