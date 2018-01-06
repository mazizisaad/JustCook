import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { DisplayPage } from '../display/display';

@IonicPage()
@Component({
  selector: 'page-my-fav',
  templateUrl: 'my-fav.html',
})
export class MyFavPage {

  menus = [];
  fav = [];
  data = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public menuService: MenuProvider) {
    
    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.menuService.getFav().then((res: any) =>{
      this.fav = res;

      this.menuService.getMenu().then((res: any) =>{
        this.data = res;

        for(var key in this.data){
          for(var key2 in this.fav){
            if(this.data[key].menuID == this.fav[key2].menuID){
              this.menus.push(this.data[key]);
            }
          }
        }
        loader.dismiss();
      })
    })
  }

  goDisplay(menuID){
    this.navCtrl.push(DisplayPage, {id: menuID});
  }
}
