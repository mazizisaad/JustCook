import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  ingredient1 = null;
  ingredient2 = null;
  ingredient3 = null;
  type = null;
  category = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  clear(){
    this.ingredient1 = null;
    this.ingredient2 = null;
    this.ingredient3 = null;
    this.type = null;
    this.category = null;
  }

  goSearch(){
    this.navCtrl.push(SearchResultPage, {
      ing1: this.ingredient1,
      ing2: this.ingredient2,
      ing3: this.ingredient3,
      type: this.type,
      category: this.category
    })
  }

}
