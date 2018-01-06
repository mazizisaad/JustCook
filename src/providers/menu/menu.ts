import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class MenuProvider {

  menuData = firebase.database().ref('/menu');
  ingredientData = firebase.database().ref('/ingredient');
  favData = firebase.database().ref('/myFav');
  constructor(public afireauth: AngularFireAuth) {
  }

  addMenu(menu, ingredient, quantity, unit){
    var promise = new Promise((resolve, reject) =>{
      let idd = this.menuData.child('menu').push().key;

      this.menuData.child(idd).set({
        menuPhoto: menu.photo,
        menuID: idd,
        menuName: menu.name,
        menuServing: menu.serving,
        menuDuration: menu.duration,
        menuType: menu.type,
        menuCategory: menu.category,
        menuStep: menu.step,
        uid: firebase.auth().currentUser.uid 
      }).then(() =>{
        this.ingredientData.child(idd).child('ingredient').push(ingredient);
        this.ingredientData.child(idd).child('quantity').push(quantity);
        this.ingredientData.child(idd).child('unit').push(unit);
      }).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  addFav(menu){
    var promise = new Promise((resolve, reject) =>{

      let idd = this.favData.child('fav').push().key;

      this.favData.child(firebase.auth().currentUser.uid).child(idd).set({
        favID: idd,
        menuID: menu
      }).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  updateMenu(menu, ingredient, quantity, unit){
    var promise = new Promise((resolve, reject) =>{

      this.menuData.child(menu.id).set({
        menuPhoto: menu.photo,
        menuID: menu.id,
        menuName: menu.name,
        menuServing: menu.serving,
        menuDuration: menu.duration,
        menuType: menu.type,
        menuCategory: menu.category,
        menuStep: menu.step,
        uid: firebase.auth().currentUser.uid 
      }).then(() =>{
        this.ingredientData.child(menu.id).remove();
        this.ingredientData.child(menu.id).remove();
        this.ingredientData.child(menu.id).remove();
      }).then(() =>{
        this.ingredientData.child(menu.id).child('ingredient').push(ingredient);
        this.ingredientData.child(menu.id).child('quantity').push(quantity);
        this.ingredientData.child(menu.id).child('unit').push(unit);
      }).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  archieveMenu(menuID){
    var promise = new Promise((resolve, reject) =>{
      this.menuData.child(menuID).remove().then(() =>{
        this.ingredientData.child(menuID).remove().then(() =>{
          resolve({success: true});
        })
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  getMenu(){
    var promise = new Promise((resolve, reject) =>{
      this.menuData.orderByChild('menu').once('value', (snapshot) =>{
        let data = snapshot.val();
        let menu = [];

        for(var key in data){
          menu.push(data[key]);
        }

        resolve(menu);
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  getMenuDetail(menuID){
    var promise = new Promise((resolve, reject) =>{
      this.menuData.orderByChild('menu').once('value', (snapshot) =>{
        let data = snapshot.val();
        let menu = [];

        for(var key in data){
          if(data[key].menuID == menuID){
            menu.push(data[key]);
          }
        }

        resolve(menu);
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  getIngredient(menuID){
    var promise = new Promise((resolve, reject) =>{
      this.ingredientData.child(menuID).child('ingredient').orderByChild('ingredient').once('value', (snapshot) =>{
        let data = snapshot.val();
        let ingredient = [];

        for(var key in data){
          ingredient.push(data[key]);
        }

        resolve(ingredient);
      }).catch((err) =>{
        resolve({fail: true})
      })
    })

    return promise;
  }

  getQuantity(menuID){
    var promise = new Promise((resolve, reject) =>{
      this.ingredientData.child(menuID).child('quantity').orderByChild('quantity').once('value', (snapshot) =>{
        let data = snapshot.val();
        let quantity = [];

        for(var key in data){
          quantity.push(data[key]);
        }

        resolve(quantity);
      }).catch((err) =>{
        resolve({fail: true})
      })
    })

    return promise;
  }

  getUnit(menuID){
    var promise = new Promise((resolve, reject) =>{
      this.ingredientData.child(menuID).child('unit').orderByChild('unit').once('value', (snapshot) =>{
        let data = snapshot.val();
        let unit = [];

        for(var key in data){
          unit.push(data[key]);
        }

        resolve(unit);
      }).catch((err) =>{
        resolve({fail: true})
      })
    })

    return promise;
  }

  getMyMenu(){
    var promise = new Promise((resolve, reject) =>{
      this.menuData.orderByChild('menu').once('value', (snapshot) =>{
        let data = snapshot.val();
        let menu = [];
        let myMenu = [];

        for(var key in data){
          menu.push(data[key]);
        }

        for(var item in menu){
          if(menu[item].uid == firebase.auth().currentUser.uid){
            myMenu.push(menu[item]);
          }
        }

        resolve(myMenu);
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }

  getFav(){
    var promise = new Promise((resolve, reject) =>{
      this.favData.child(firebase.auth().currentUser.uid).orderByChild('fav').once('value', (snapshot) =>{
        let data = snapshot.val();
        let fav = [];

        for(var key in data){
          fav.push(data[key]);
        }
        
        resolve(fav);
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }
}
