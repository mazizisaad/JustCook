import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { MenuProvider } from '../../providers/menu/menu';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DisplayPage } from '../display/display';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  menus = [];
  items = [];

  ingredient1;
  ingredient2;
  ingredient3;
  type;
  category;

  searchKey = '';

  noResult: boolean = false;

  typeArr = [];
  categoryArr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public menuService: MenuProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.searchKey = this.navParams.get('key');

    this.ingredient1 = this.navParams.get('ing1');
    this.ingredient2 = this.navParams.get('ing2');
    this.ingredient3 = this.navParams.get('ing3');
    this.type = this.navParams.get('type');
    this.category = this.navParams.get('category');

    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    if(this.searchKey != null){

      loader.present();
      this.menuService.getMenu().then((res: any) =>{
        loader.dismiss();
        this.menus = res;
  
        this.items = [];
       for(var menu in this.menus){
          if(this.menus[menu].menuName.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1){
            this.items.push(this.menus[menu]);
          }
        }
      });
    }
    else if(this.ingredient1 != null || this.ingredient2 != null || this.ingredient3 != null || this.type != null || this.category != null){

      loader.present();
      this.menuService.getMenu().then((res: any) =>{
        this.menus = res;

        this.typeArr = [];
        this.categoryArr = [];

        if(this.type != null){
          for(var a in this.menus){
            if(this.menus[a].menuType.toLowerCase() == this.type.toLowerCase()){
              this.typeArr.push(this.menus[a]);
            }
          }

          if(this.category != null){
            for(var b in this.typeArr){
              if(this.typeArr[b].menuCategory.toLowerCase().indexOf(this.category.toLowerCase()) !== -1){
                this.categoryArr.push(this.typeArr[b]);
              }
            }

            if(this.ingredient1 != null && this.ingredient2 != null && this.ingredient3 != null){
              this.items = this.lookup(this.categoryArr, this.ingredient1, this.ingredient2, this.ingredient3);
            }
            else{
              this.items = this.categoryArr;
            }
          }
          else if(this.category == null){
            for(var c in this.typeArr){
              this.categoryArr.push(this.typeArr[c]);
            }

            if(this.ingredient1 != null && this.ingredient2 != null && this.ingredient3 != null){
              this.items = this.lookup(this.categoryArr, this.ingredient1, this.ingredient2, this.ingredient3);
            }
            else{
              this.items = this.categoryArr;
            }
          }
        }
        else if(this.type == null){
          if(this.category != null){
            for(var a in this.menus){
              if(this.menus[a].menuCategory.toLowerCase().indexOf(this.category.toLowerCase()) !== -1){
                this.categoryArr.push(this.menus[a]);
              }
            }

            if(this.ingredient1 != null && this.ingredient2 != null && this.ingredient3 != null){
              this.items = this.lookup(this.categoryArr, this.ingredient1, this.ingredient2, this.ingredient3);
            }
            else{
              this.items =this. categoryArr;
            }
          }
          else if(this.category == null){
            for(var b in this.menus){
              this.categoryArr.push(this.menus[b]);
            }

            if(this.ingredient1 != null && this.ingredient2 != null && this.ingredient3 != null){
              this.items = this.lookup(this.categoryArr, this.ingredient1, this.ingredient2, this.ingredient3);
            }
            else{
              this.items = this.categoryArr;
            }
          }
        }
      })

      if(this.items == []){
        this.noResult = true;
      }

      loader.dismiss();
    }
    else{
      this.noResult = true;
    }
  }

  lookup(filterData, k1, k2, k3){
    let temp = [];
    let garbage = [];
    let filterGarbage = [];
    let count;

    for(var a in filterData){
      let id = filterData[a].menuID;
      let garbage = filterData[a];
      
      this.menuService.getIngredient(id).then((res: any) =>{
        temp = res;
        count = 0;

        for(var keys of temp){
          for(var key in keys){
            if(keys[key].toLowerCase() == k1.toLowerCase()){
              count++;
            }
            if(keys[key].toLowerCase() == k2.toLowerCase()){
              count++;
            }
            if(keys[key].toLowerCase() == k3.toLowerCase()){
              count++;
            }
          }
        }

        if(count == 3){
          filterGarbage.push(garbage);
        }
      })
    }

    return filterGarbage;
  }

  reveal(menuID){
    
    this.navCtrl.push(DisplayPage, {id: menuID});
  }

  addMyFav(menuID){

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
    this.menuService.addFav(menuID).then((res: any) =>{
      
      if(res.success){
        loader.dismiss();
        
        toast.setMessage('Add MyFav Success');
        toast.present();
      }
      else{
        loader.dismiss();
        
        alert.setTitle('Add MyFav Fail');
        alert.setMessage('Your add to MyFav. Please try again');
        alert.present();
      }
    })
  }
}
