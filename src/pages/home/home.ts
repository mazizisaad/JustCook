import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController} from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { SearchPage } from '../../pages/search/search';
import { SearchResultPage } from '../search-result/search-result';
import { Shake } from '@ionic-native/shake';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { DisplayPage } from '../display/display';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  details = [];
  searchKey = null;

  constructor(public navCtrl: NavController,  public menuService: MenuProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public shake: Shake, public authService: AuthProvider) {

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();
    this.authService.getuser().then((res: any) =>{
      loader.dismiss();
      this.details = res;
      console.log(this.details);
    })
  }

  watch = this.shake.startWatch(40).subscribe(() =>{
    this.menuService.getMenu().then((res: any) =>{
      let menus = res;
      this.navCtrl.push(DisplayPage, {id: "-L0qTDUj5YRBMsKfvm_T"});
    })
  });

  searchModal(){
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }

  searchItem(searchKey){
    this.navCtrl.push(SearchResultPage, {key: searchKey});
    this.clearSearch();
  }

  clearSearch(){
    this.searchKey = null;
  }

}
