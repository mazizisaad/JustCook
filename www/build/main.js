webpackJsonp([11],{

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__manage_menu_manage_menu__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CreateMenuPage = (function () {
    function CreateMenuPage(navCtrl, navParams, menuService, loadingCtrl, alertCtrl, toastCtrl, actionCtrl, afireauth, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuService = menuService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.actionCtrl = actionCtrl;
        this.afireauth = afireauth;
        this.camera = camera;
        this.photoRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.storage().ref('/recipe');
        this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/DefaultRecipe.jpg?alt=media&token=afb985c6-5b8d-4154-aadd-2513a3c0e7fe';
        this.menu = {
            photo: this.photoURL,
            name: '',
            serving: '',
            duration: '',
            type: '',
            category: '',
            step: ''
        };
        this.lists = [];
        this.ing = [];
        this.qty = [];
        this.unit = [];
        this.ingredient = [];
        this.quantity = [];
        this.units = [];
        this.lists.push(null);
    }
    CreateMenuPage.prototype.selectPhoto = function () {
        var _this = this;
        var action = this.actionCtrl.create({
            title: 'Select photo option',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraPicture();
                    }
                },
                {
                    text: 'Album',
                    handler: function () {
                        _this.albumPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        action.present();
    };
    CreateMenuPage.prototype.cameraPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            loader.present();
            _this.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    CreateMenuPage.prototype.albumPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            encodingType: this.camera.EncodingType.JPEG,
        }).then(function (imageData) {
            loader.present();
            _this.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    CreateMenuPage.prototype.uploadPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.photoRef.child(this.afireauth.auth.currentUser.uid).child(this.generateUUID() + '.jpeg')
            .putString(this.photo, 'base64', { contentType: 'image/jpeg' })
            .then(function (savedPicture) {
            loader.dismiss();
            _this.photoURL = savedPicture.downloadURL;
            _this.menu.photo = savedPicture.downloadURL;
        });
    };
    CreateMenuPage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    CreateMenuPage.prototype.create = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.readData();
        this.menuService.addMenu(this.menu, this.ingredient, this.quantity, this.units).then(function (res) {
            if (res.success) {
                loader.dismiss();
                toast.setMessage('Add Menu Success');
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__manage_menu_manage_menu__["a" /* ManageMenuPage */]);
            }
            else {
                loader.dismiss();
                alert.setTitle('Add Menu Fail');
                alert.setMessage('Your menu cannot be upload to database. Please try again');
                alert.present();
            }
        });
    };
    CreateMenuPage.prototype.addInput = function () {
        this.lists.push(null);
    };
    CreateMenuPage.prototype.readData = function () {
        this.ing.push(this.ing[this.index]);
        this.qty.push(this.qty[this.index]);
        this.unit.push(this.unit[this.index]);
        for (var a in this.ing) {
            if (this.ing[a] != null) {
                this.ingredient.push(this.ing[a]);
            }
        }
        console.log(this.ingredient);
        for (var b in this.qty) {
            if (this.qty[b] != null) {
                this.quantity.push(this.qty[b]);
            }
        }
        console.log(this.quantity);
        for (var c in this.unit) {
            if (this.unit[c] != null) {
                this.units.push(this.unit[c]);
            }
        }
        console.log(this.units);
    };
    CreateMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-menu',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\create-menu\create-menu.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Create Menu</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item text-center (click)="selectPhoto()">\n      <img src="{{ menu.photo }}">\n    </ion-item>\n    <br>\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Details</ion-item-divider>\n      <ion-item>\n        <ion-label floating>Menu Name</ion-label>\n        <ion-input type="text" [(ngModel)]="menu.name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Serving Number</ion-label>\n        <ion-input type="number" [(ngModel)]="menu.serving"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Duration</ion-label>\n        <ion-datetime displayFormat="HH : mm" pickerFormat="HH mm" [(ngModel)]="menu.duration"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Menu Type</ion-label>\n        <ion-select [(ngModel)]="menu.type">\n          <ion-option value="Breakfast">Breakfast</ion-option>\n          <ion-option value="Tea Break">Tea Break</ion-option>\n          <ion-option value="Lunch">Lunch</ion-option>\n          <ion-option value="Hi Tea">High Tea</ion-option>\n          <ion-option value="Dinner">Dinner</ion-option>\n          <ion-option value="Supper">Supper</ion-option>\n          <ion-option value="Snack/ Party">Snack/ Party</ion-option>\n          <ion-option value="Beverages">Beverages</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Menu Category</ion-label>\n        <ion-select [(ngModel)]="menu.category">\n          <ion-option value="Western Cuisine">Western Cuisine</ion-option>\n          <ion-option value="Malaysia Cuisine">Malaysia Cuisine</ion-option>\n          <ion-option value="Asia Cuisine">Asia Cuisine</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n    \n    <ion-item-group>\n      <ion-item-divider color="light">Menu Ingredient</ion-item-divider>\n      <ion-item>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-10>\n              \n            </ion-col>\n            <ion-col col-2>\n              <button ion-button outline color="dark" (click)="addInput()">\n                <ion-icon name="add-circle"></ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n  \n      <ion-item *ngFor="let list of lists; let i = index">\n        <ion-input type="text" placeholder="Ingredient.." [(ngModel)]="ing[i]"></ion-input>\n        \n        <ion-input type="number" placeholder="Quantity..." [(ngModel)]="qty[i]"></ion-input>\n  \n        <ion-select [(ngModel)]="unit[i]">\n          <ion-option value="gram">gram</ion-option>\n          <ion-option value="liter">liter</ion-option>\n          <ion-option value="spoon">spoon</ion-option>\n          <ion-option value="tea spoon">tea spoon</ion-option>\n          <ion-option value="piece">piece</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Step</ion-item-divider>\n      <ion-item>\n        <ion-label floating>Menu Step</ion-label>\n        <ion-textarea [(ngModel)]="menu.step" autosize></ion-textarea>\n      </ion-item>\n    </ion-item-group>\n  </ion-list>\n  <div text-center>\n    <button ion-button color="primary" (click)="create()">Create</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\create-menu\create-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */]])
    ], CreateMenuPage);
    return CreateMenuPage;
}());

//# sourceMappingURL=create-menu.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manage_menu_manage_menu__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_toast_toast_controller__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EditMenuPage = (function () {
    function EditMenuPage(navCtrl, navParams, menuService, loadingCtrl, actionCtrl, camera, afireauth, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuService = menuService;
        this.loadingCtrl = loadingCtrl;
        this.actionCtrl = actionCtrl;
        this.camera = camera;
        this.afireauth = afireauth;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.items = [];
        this.menus = [];
        this.ingredient = [];
        this.quantity = [];
        this.unit = [];
        this.ing = [];
        this.qty = [];
        this.units = [];
        this.ings = [];
        this.qtys = [];
        this.unis = [];
        this.lists = [];
        this.photoRef = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.storage().ref('/recipe');
        this.menu = {
            photo: '',
            name: '',
            serving: '',
            duration: '',
            type: '',
            category: '',
            step: '',
            id: ''
        };
        this.menuID = this.navParams.get('menuID');
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.menuService.getMenu().then(function (res) {
            loader.dismiss();
            _this.items = res;
            for (var key in _this.items) {
                if (_this.items[key].menuID == _this.menuID) {
                    _this.menus.push(_this.items[key]);
                }
            }
            _this.menuService.getIngredient(_this.menuID).then(function (res) {
                _this.ingredient = res;
                _this.menuService.getQuantity(_this.menuID).then(function (res) {
                    _this.quantity = res;
                    _this.menuService.getUnit(_this.menuID).then(function (res) {
                        _this.unit = res;
                        var ver = 0;
                        for (var key in _this.menus) {
                            _this.menu = {
                                photo: _this.menus[key].menuPhoto,
                                name: _this.menus[key].menuName,
                                serving: _this.menus[key].menuServing,
                                duration: _this.menus[key].menuDuration,
                                type: _this.menus[key].menuType,
                                category: _this.menus[key].menuCategory,
                                step: _this.menus[key].menuStep,
                                id: _this.menus[key].menuID
                            };
                            for (var _i = 0, _a = _this.ingredient; _i < _a.length; _i++) {
                                var x = _a[_i];
                                for (var y in x) {
                                    _this.ings.push(x[y]);
                                    ver++;
                                }
                                console.log(_this.ings);
                            }
                            for (var _b = 0, _c = _this.quantity; _b < _c.length; _b++) {
                                var x = _c[_b];
                                for (var y in x) {
                                    _this.qtys.push(x[y]);
                                }
                            }
                            for (var _d = 0, _e = _this.unit; _d < _e.length; _d++) {
                                var x = _e[_d];
                                for (var y in x) {
                                    _this.unis.push(x[y]);
                                }
                            }
                            _this.lists = new Array(ver);
                        }
                    });
                });
            });
        });
    }
    EditMenuPage.prototype.addInput = function () {
        this.lists.push(null);
    };
    EditMenuPage.prototype.selectPhoto = function () {
        var _this = this;
        var action = this.actionCtrl.create({
            title: 'Select photo option',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraPicture();
                    }
                },
                {
                    text: 'Album',
                    handler: function () {
                        _this.albumPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        action.present();
    };
    EditMenuPage.prototype.cameraPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            loader.present();
            _this.menu.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    EditMenuPage.prototype.albumPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            encodingType: this.camera.EncodingType.JPEG,
        }).then(function (imageData) {
            loader.present();
            _this.menu.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    EditMenuPage.prototype.uploadPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.photoRef.child(this.afireauth.auth.currentUser.uid).child(this.generateUUID() + '.jpeg')
            .putString(this.menu.photo, 'base64', { contentType: 'image/jpeg' })
            .then(function (savedPicture) {
            loader.dismiss();
            _this.menu.photo = savedPicture.downloadURL;
        });
    };
    EditMenuPage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    EditMenuPage.prototype.readData = function () {
        this.ing.push(this.ings[this.index]);
        this.qty.push(this.qtys[this.index]);
        this.unit.push(this.unis[this.index]);
        this.ingredient = [];
        this.quantity = [];
        for (var a in this.ings) {
            if (this.ings[a] != null) {
                this.ingredient.push(this.ings[a]);
            }
        }
        console.log(this.ingredient);
        for (var b in this.qtys) {
            if (this.qtys[b] != null) {
                this.quantity.push(this.qtys[b]);
            }
        }
        console.log(this.quantity);
        for (var c in this.unis) {
            if (this.unis[c] != null) {
                this.units.push(this.unis[c]);
            }
        }
        console.log(this.units);
    };
    EditMenuPage.prototype.create = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.readData();
        this.menuService.updateMenu(this.menu, this.ingredient, this.quantity, this.units).then(function (res) {
            if (res.success) {
                loader.dismiss();
                toast.setMessage('Edit Menu Success');
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__manage_menu_manage_menu__["a" /* ManageMenuPage */]);
            }
            else {
                loader.dismiss();
                alert.setTitle('Edit Menu Fail');
                alert.setMessage('Your menu cannot be updated to database. Please try again');
                alert.present();
            }
        });
    };
    EditMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-menu',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\edit-menu\edit-menu.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Edit Menu</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list padding *ngFor="let key of menus">\n    <ion-item text-center (click)="selectPhoto()">\n      <img src="{{ key.menuPhoto }}">\n    </ion-item>\n    <br>\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Details</ion-item-divider>\n      <ion-item>\n        <ion-label floating>Menu Name</ion-label>\n        <ion-input type="text"  [(ngModel)]="menu.name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Serving Number</ion-label>\n        <ion-input type="number" [(ngModel)]="menu.serving"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Duration</ion-label>\n        <ion-datetime displayFormat="HH : mm" pickerFormat="HH mm" [(ngModel)]="menu.duration"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Menu Type</ion-label>\n        <ion-select [(ngModel)]="menu.type">\n          <ion-option value="Breakfast">Breakfast</ion-option>\n          <ion-option value="Tea Break">Tea Break</ion-option>\n          <ion-option value="Lunch">Lunch</ion-option>\n          <ion-option value="Hi Tea">High Tea</ion-option>\n          <ion-option value="Dinner">Dinner</ion-option>\n          <ion-option value="Supper">Supper</ion-option>\n          <ion-option value="Snack/ Party">Snack/ Party</ion-option>\n          <ion-option value="Beverages">Beverages</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Menu Category</ion-label>\n        <ion-select [(ngModel)]="menu.category">\n          <ion-option value="Western Cuisine">Western Cuisine</ion-option>\n          <ion-option value="Malaysia Cuisine">Malaysia Cuisine</ion-option>\n          <ion-option value="Asia Cuisine">Asia Cuisine</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n    \n    <ion-item-group>\n      <ion-item-divider color="light">Menu Ingredient</ion-item-divider>\n      <ion-item>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-10>\n              \n            </ion-col>\n            <ion-col col-2>\n              <button ion-button outline color="dark" (click)="addInput()">\n                <ion-icon name="add-circle"></ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item *ngFor="let list of lists; let i = index">\n        <ion-input type="text" placeholder="Ingredient.." [(ngModel)]="ings[i]"></ion-input>\n        <ion-input type="number" placeholder="Quantity..." [(ngModel)]="qtys[i]"></ion-input>\n        <ion-select [(ngModel)]="unis[i]">\n          <ion-option value="gram">gram</ion-option>\n          <ion-option value="liter">liter</ion-option>\n          <ion-option value="spoon">spoon</ion-option>\n          <ion-option value="tea spoon">tea spoon</ion-option>\n          <ion-option value="piece">piece</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n    \n    <ion-item-group>\n      <ion-item-divider color="light">Menu Step</ion-item-divider>\n      <ion-item>\n        <ion-label floating>Menu Step</ion-label>\n        <ion-textarea autosize [(ngModel)]="menu.step"></ion-textarea>\n      </ion-item>\n    </ion-item-group>\n\n    <br>\n    <div>\n      <button ion-button block color="primary" (click)="create()">Edit</button>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\edit-menu\edit-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
    ], EditMenuPage);
    return EditMenuPage;
}());

//# sourceMappingURL=edit-menu.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_recovery_password_recovery__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.authService.login(this.email, this.password).then(function (res) {
            if (res.success) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                loader.dismiss();
                toast.setMessage('Login Success');
                toast.present();
            }
            else if (res.failLogin) {
                loader.dismiss();
                alert.setTitle('Login Fail');
                alert.setMessage('Your username or password is incorrect');
                alert.present();
            }
        });
    };
    LoginPage.prototype.goSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.goForgetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__password_recovery_password_recovery__["a" /* PasswordRecoveryPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card padding>\n    <img src=\'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/JustCook.png?alt=media&token=3be327a4-8cad-42c5-ad58-1af4313ebacd\'>\n    <ion-card-content>\n      <ion-list>\n        <ion-item>\n          <ion-label floating>Username</ion-label>\n          <ion-input type="email" [(ngModel)]="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="password"></ion-input>\n        </ion-item>\n      </ion-list>\n      <br>\n      <div>\n        <button ion-button block color="primary" (click)="login()">Login</button>\n        <button ion-button block color="danger" (click)="goSignup()">Signup</button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n  <div text-center>\n    <button ion-button clear color="dark" (click)="goForgetPassword()">Forget Password?</button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_result_search_result__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.ingredient1 = null;
        this.ingredient2 = null;
        this.ingredient3 = null;
        this.type = null;
        this.category = null;
    }
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage.prototype.clear = function () {
        this.ingredient1 = null;
        this.ingredient2 = null;
        this.ingredient3 = null;
        this.type = null;
        this.category = null;
    };
    SearchPage.prototype.goSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__search_result_search_result__["a" /* SearchResultPage */], {
            ing1: this.ingredient1,
            ing2: this.ingredient2,
            ing3: this.ingredient3,
            type: this.type,
            category: this.category
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\search\search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Search Menu</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item-group>\n      <ion-item-divider color="light">Ingredient</ion-item-divider>\n        <ion-item>\n          <ion-label floating>Ingredient</ion-label>\n          <ion-input type="text" [(ngModel)]="ingredient1"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Ingredient</ion-label>\n          <ion-input type="text" [(ngModel)]="ingredient2"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Ingredient</ion-label>\n          <ion-input type="text" [(ngModel)]="ingredient3"></ion-input>\n        </ion-item>\n        <br>\n    </ion-item-group>\n    <ion-item-group>\n      <ion-item-divider color="light">Filter</ion-item-divider>\n      <ion-item>\n        <ion-label>Type</ion-label>\n        <ion-select [(ngModel)]="type">\n          <ion-option value="Breakfast">Breakfast</ion-option>\n          <ion-option value="Tea Break">Tea Break</ion-option>\n          <ion-option value="Lunch">Lunch</ion-option>\n          <ion-option value="High Tea">High Tea</ion-option>\n          <ion-option value="Dinner">Dinner</ion-option>\n          <ion-option value="Supper">Supper</ion-option>\n          <ion-option value="Snack/ Party">Snack/ Party</ion-option>\n          <ion-option value="Beverages">Beverages</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Category</ion-label>\n        <ion-select [(ngModel)]="category">\n          <ion-option value="Western">Western</ion-option>\n          <ion-option value="Malaysia">Malaysia</ion-option>\n          <ion-option value="Asia Cursine">Asia Cursine</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-item-group>\n    <div text-center>\n      <button ion-button color="danger" (click)="clear()">Clear</button>\n      <button ion-button color="primary" (click)="goSearch()">Search</button>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl, toastCtrl, actionCtrl, afireauth, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.actionCtrl = actionCtrl;
        this.afireauth = afireauth;
        this.camera = camera;
        this.photoRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref('/photos');
        this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/userProfile.jpg?alt=media&token=b497ea8a-0499-48bd-a7d9-17a5c4fdfd64';
        this.user = {
            name: '',
            email: '',
            password: '',
            photo: this.photoURL
        };
    }
    SignupPage.prototype.selectPhoto = function () {
        var _this = this;
        var action = this.actionCtrl.create({
            title: 'Select photo option',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraPicture();
                    }
                },
                {
                    text: 'Album',
                    handler: function () {
                        _this.albumPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        action.present();
    };
    SignupPage.prototype.cameraPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            loader.present();
            _this.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    SignupPage.prototype.albumPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Loading image'
        });
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            encodingType: this.camera.EncodingType.JPEG,
        }).then(function (imageData) {
            loader.present();
            _this.photo = imageData;
            _this.uploadPicture();
            loader.dismiss();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    SignupPage.prototype.uploadPicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.photoRef.child(this.afireauth.auth.currentUser.uid).child(this.generateUUID() + '.jpeg')
            .putString(this.photo, 'base64', { contentType: 'image/jpeg' })
            .then(function (savedPicture) {
            loader.dismiss();
            _this.photoURL = savedPicture.downloadURL;
            _this.user.photo = savedPicture.downloadURL;
        });
    };
    SignupPage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    SignupPage.prototype.signUp = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.authService.signup(this.user).then(function (res) {
            if (res.successSet) {
                loader.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                toast.setMessage('Signup Success');
                toast.present();
            }
            else if (res.failSet || res.failUpdate) {
                loader.dismiss();
                alert.setTitle('Signup Fail');
                alert.setMessage('Due to few problems, your profile is not updated. Please contact customer service for further action');
                alert.present();
            }
            else if (res.failCreate) {
                loader.dismiss();
                alert.setTitle('Signup Fail');
                alert.setMessage('Due to few problems, your account cannot be created. Please contact customer service for further action');
                alert.present();
            }
        });
    };
    SignupPage.prototype.clear = function () {
        this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/userProfile.jpg?alt=media&token=b497ea8a-0499-48bd-a7d9-17a5c4fdfd64';
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.photo = this.photoURL;
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\signup\signup.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item text-center>\n      <ion-avatar (click)="selectPhoto()">\n        <img src="{{ user.photo }}">\n      </ion-avatar>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Name</ion-label>\n      <ion-input type="text" [(ngModel)]="user.name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="user.email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n    </ion-item>\n    <br>\n    <div>\n      <button ion-button block color="primary" (click)="signUp()">Signup</button>\n      <button ion-button block color="danger" (click)="clear()">Clear</button>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordRecoveryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PasswordRecoveryPage = (function () {
    function PasswordRecoveryPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    PasswordRecoveryPage.prototype.sendRequest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.authService.recoverPassword(this.email).then(function (res) {
            if (res.success) {
                loader.dismiss();
                toast.setMessage('Request Sent');
                toast.present();
                _this.email = '';
            }
            else if (res.failRecover) {
                loader.dismiss();
                alert.setTitle('Request Fail');
                alert.setMessage('Password recovery request fail. Please contact customer service for further action');
                alert.present();
            }
        });
    };
    PasswordRecoveryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-password-recovery',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\password-recovery\password-recovery.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Password Recovery</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="email"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button block color="primary" (click)="sendRequest()">Send Request</button>\n  <br><br>\n  <ion-card>\n    <ion-card-content>\n      <p>The password recovery request will be sent to your email. Please follow the steps provided in the email to recovery your password.</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\password-recovery\password-recovery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], PasswordRecoveryPage);
    return PasswordRecoveryPage;
}());

//# sourceMappingURL=password-recovery.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyFavPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__display_display__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyFavPage = (function () {
    function MyFavPage(navCtrl, navParams, loadingCtrl, menuService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.menuService = menuService;
        this.menus = [];
        this.fav = [];
        this.data = [];
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.menuService.getFav().then(function (res) {
            _this.fav = res;
            _this.menuService.getMenu().then(function (res) {
                _this.data = res;
                for (var key in _this.data) {
                    for (var key2 in _this.fav) {
                        if (_this.data[key].menuID == _this.fav[key2].menuID) {
                            _this.menus.push(_this.data[key]);
                        }
                    }
                }
                loader.dismiss();
            });
        });
    }
    MyFavPage.prototype.goDisplay = function (menuID) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__display_display__["a" /* DisplayPage */], { id: menuID });
    };
    MyFavPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-fav',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\my-fav\my-fav.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>MyFav</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list padding>\n    <ion-item *ngFor="let key of menus" (click)="goDisplay(key.menuID)">\n      <ion-thumbnail item-start>\n        <img src="{{ key.menuPhoto }}">\n      </ion-thumbnail>\n      <h2>{{ key.menuName }}</h2>\n      <p>\n        Type: {{ key.menuType }} <br>\n        Category: {{ key.menuCategory }}\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\my-fav\my-fav.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__["a" /* MenuProvider */]])
    ], MyFavPage);
    return MyFavPage;
}());

//# sourceMappingURL=my-fav.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-menu/create-menu.module": [
		473,
		10
	],
	"../pages/display/display.module": [
		474,
		9
	],
	"../pages/edit-menu/edit-menu.module": [
		475,
		8
	],
	"../pages/fav-menu/fav-menu.module": [
		476,
		0
	],
	"../pages/login/login.module": [
		477,
		7
	],
	"../pages/manage-menu/manage-menu.module": [
		478,
		6
	],
	"../pages/my-fav/my-fav.module": [
		479,
		5
	],
	"../pages/password-recovery/password-recovery.module": [
		480,
		4
	],
	"../pages/search-result/search-result.module": [
		481,
		3
	],
	"../pages/search/search.module": [
		482,
		2
	],
	"../pages/signup/signup.module": [
		483,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(320);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_firebaseconfig__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_shake__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_list_list__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_password_recovery_password_recovery__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_create_menu_create_menu__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_auth_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_manage_menu_manage_menu__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_search_result_search_result__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_search_search__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_my_fav_my_fav__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__directives_directives_module__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_edit_menu_edit_menu__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_display_display__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_password_recovery_password_recovery__["a" /* PasswordRecoveryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_create_menu_create_menu__["a" /* CreateMenuPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_manage_menu_manage_menu__["a" /* ManageMenuPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_fav_my_fav__["a" /* MyFavPage */],
                __WEBPACK_IMPORTED_MODULE_24__directives_directives_module__["a" /* Autosize */],
                __WEBPACK_IMPORTED_MODULE_25__pages_edit_menu_edit_menu__["a" /* EditMenuPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_display_display__["a" /* DisplayPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create-menu/create-menu.module#CreateMenuPageModule', name: 'CreateMenuPage', segment: 'create-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/display/display.module#DisplayPageModule', name: 'DisplayPage', segment: 'display', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-menu/edit-menu.module#EditMenuPageModule', name: 'EditMenuPage', segment: 'edit-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fav-menu/fav-menu.module#FavMenuPageModule', name: 'FavMenuPage', segment: 'fav-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/manage-menu/manage-menu.module#ManageMenuPageModule', name: 'ManageMenuPage', segment: 'manage-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-fav/my-fav.module#MyFavPageModule', name: 'MyFavPage', segment: 'my-fav', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/password-recovery/password-recovery.module#PasswordRecoveryPageModule', name: 'PasswordRecoveryPage', segment: 'password-recovery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result/search-result.module#SearchResultPageModule', name: 'SearchResultPage', segment: 'search-result', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_5__app_firebaseconfig__["a" /* config */])
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_password_recovery_password_recovery__["a" /* PasswordRecoveryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_create_menu_create_menu__["a" /* CreateMenuPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_manage_menu_manage_menu__["a" /* ManageMenuPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_fav_my_fav__["a" /* MyFavPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_edit_menu_edit_menu__["a" /* EditMenuPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_display_display__["a" /* DisplayPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_18__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_menu_menu__["a" /* MenuProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_shake__["a" /* Shake */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MenuProvider = (function () {
    function MenuProvider(afireauth) {
        this.afireauth = afireauth;
        this.menuData = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/menu');
        this.ingredientData = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/ingredient');
        this.favData = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/myFav');
    }
    MenuProvider.prototype.addMenu = function (menu, ingredient, quantity, unit) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var idd = _this.menuData.child('menu').push().key;
            _this.menuData.child(idd).set({
                menuPhoto: menu.photo,
                menuID: idd,
                menuName: menu.name,
                menuServing: menu.serving,
                menuDuration: menu.duration,
                menuType: menu.type,
                menuCategory: menu.category,
                menuStep: menu.step,
                uid: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid
            }).then(function () {
                _this.ingredientData.child(idd).child('ingredient').push(ingredient);
                _this.ingredientData.child(idd).child('quantity').push(quantity);
                _this.ingredientData.child(idd).child('unit').push(unit);
            }).then(function () {
                resolve({ success: true });
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.addFav = function (menu) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var idd = _this.favData.child('fav').push().key;
            _this.favData.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(idd).set({
                favID: idd,
                menuID: menu
            }).then(function () {
                resolve({ success: true });
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.updateMenu = function (menu, ingredient, quantity, unit) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.menuData.child(menu.id).set({
                menuPhoto: menu.photo,
                menuID: menu.id,
                menuName: menu.name,
                menuServing: menu.serving,
                menuDuration: menu.duration,
                menuType: menu.type,
                menuCategory: menu.category,
                menuStep: menu.step,
                uid: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid
            }).then(function () {
                _this.ingredientData.child(menu.id).remove();
                _this.ingredientData.child(menu.id).remove();
                _this.ingredientData.child(menu.id).remove();
            }).then(function () {
                _this.ingredientData.child(menu.id).child('ingredient').push(ingredient);
                _this.ingredientData.child(menu.id).child('quantity').push(quantity);
                _this.ingredientData.child(menu.id).child('unit').push(unit);
            }).then(function () {
                resolve({ success: true });
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.archieveMenu = function (menuID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.menuData.child(menuID).remove().then(function () {
                _this.ingredientData.child(menuID).remove().then(function () {
                    resolve({ success: true });
                });
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getMenu = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.menuData.orderByChild('menu').once('value', function (snapshot) {
                var data = snapshot.val();
                var menu = [];
                for (var key in data) {
                    menu.push(data[key]);
                }
                resolve(menu);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getMenuDetail = function (menuID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.menuData.orderByChild('menu').once('value', function (snapshot) {
                var data = snapshot.val();
                var menu = [];
                for (var key in data) {
                    if (data[key].menuID == menuID) {
                        menu.push(data[key]);
                    }
                }
                resolve(menu);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getIngredient = function (menuID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.ingredientData.child(menuID).child('ingredient').orderByChild('ingredient').once('value', function (snapshot) {
                var data = snapshot.val();
                var ingredient = [];
                for (var key in data) {
                    ingredient.push(data[key]);
                }
                resolve(ingredient);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getQuantity = function (menuID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.ingredientData.child(menuID).child('quantity').orderByChild('quantity').once('value', function (snapshot) {
                var data = snapshot.val();
                var quantity = [];
                for (var key in data) {
                    quantity.push(data[key]);
                }
                resolve(quantity);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getUnit = function (menuID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.ingredientData.child(menuID).child('unit').orderByChild('unit').once('value', function (snapshot) {
                var data = snapshot.val();
                var unit = [];
                for (var key in data) {
                    unit.push(data[key]);
                }
                resolve(unit);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getMyMenu = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.menuData.orderByChild('menu').once('value', function (snapshot) {
                var data = snapshot.val();
                var menu = [];
                var myMenu = [];
                for (var key in data) {
                    menu.push(data[key]);
                }
                for (var item in menu) {
                    if (menu[item].uid == __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid) {
                        myMenu.push(menu[item]);
                    }
                }
                resolve(myMenu);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider.prototype.getFav = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.favData.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).orderByChild('fav').once('value', function (snapshot) {
                var data = snapshot.val();
                var fav = [];
                for (var key in data) {
                    fav.push(data[key]);
                }
                resolve(fav);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    MenuProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MenuProvider);
    return MenuProvider;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
var config = {
    apiKey: "AIzaSyCQUJ0YQCMGyOBpc63DjcnaIGO3xhq5EQc",
    authDomain: "justcook-69d9f.firebaseapp.com",
    databaseURL: "https://justcook-69d9f.firebaseio.com",
    projectId: "justcook-69d9f",
    storageBucket: "justcook-69d9f.appspot.com",
    messagingSenderId: "925066756160"
};
//# sourceMappingURL=app.firebaseconfig.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_manage_menu_manage_menu__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_my_fav_my_fav__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] },
            { title: 'Manage My Menu', component: __WEBPACK_IMPORTED_MODULE_6__pages_manage_menu_manage_menu__["a" /* ManageMenuPage */] },
            { title: 'My Fav', component: __WEBPACK_IMPORTED_MODULE_7__pages_my_fav_my_fav__["a" /* MyFavPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autosize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/*import { NgModule } from '@angular/core';
import { AutosizeDirective } from './autosize/autosize';
@NgModule({
    declarations: [AutosizeDirective],
    imports: [],
    exports: [AutosizeDirective]
})
export class DirectivesModule {}*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], Autosize.prototype, "onInput", null);
    Autosize = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: 'ion-textarea[autosize]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], Autosize);
    return Autosize;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthProvider = (function () {
    function AuthProvider(afireauth) {
        this.afireauth = afireauth;
        this.authData = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/user');
    }
    AuthProvider.prototype.signup = function (user) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then(function () {
                _this.afireauth.auth.currentUser.updateProfile({
                    displayName: user.name,
                    photoURL: user.photo
                }).then(function () {
                    _this.authData.child(_this.afireauth.auth.currentUser.uid).set({
                        uid: _this.afireauth.auth.currentUser.uid,
                        displayName: user.name,
                        photoURL: user.photo
                    }).then(function () {
                        resolve({ successSet: true });
                    }).catch(function (err) {
                        resolve({ failSet: true });
                    });
                }).catch(function (err) {
                    resolve({ failUpdate: true });
                });
            }).catch(function (err) {
                resolve({ failCreate: true });
            });
        });
        return promise;
    };
    AuthProvider.prototype.login = function (email, password) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.signInWithEmailAndPassword(email, password).then(function () {
                resolve({ success: true });
            }).catch(function (err) {
                resolve({ failLogin: true });
            });
        });
        return promise;
    };
    AuthProvider.prototype.recoverPassword = function (email) {
        var promise = new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().sendPasswordResetEmail(email).then(function () {
                resolve({ success: true });
            }).catch(function (err) {
                resolve({ failRecover: true });
            });
        });
        return promise;
    };
    AuthProvider.prototype.getuser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.authData.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value', function (snapshot) {
                var data = snapshot.val();
                resolve(data);
            }).catch(function (err) {
                resolve({ fail: true });
            });
        });
        return promise;
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_menu_create_menu__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_menu_edit_menu__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ManageMenuPage = (function () {
    function ManageMenuPage(navCtrl, navParams, menuService, loadingCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuService = menuService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.myMenus = [];
        this.load();
    }
    ManageMenuPage.prototype.load = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.menuService.getMyMenu().then(function (res) {
            loader.dismiss();
            _this.myMenus = res;
            console.log(_this.myMenus);
        });
    };
    ManageMenuPage.prototype.goCreate = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__create_menu_create_menu__["a" /* CreateMenuPage */]);
    };
    ManageMenuPage.prototype.editMenu = function (key) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__edit_menu_edit_menu__["a" /* EditMenuPage */], { menuID: key });
    };
    ManageMenuPage.prototype.deleteMenu = function (menuID) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.menuService.archieveMenu(menuID).then(function (res) {
            if (res.success) {
                loader.dismiss();
                toast.setMessage('Delete Menu Success');
                toast.present();
                _this.load();
            }
            else {
                loader.dismiss();
                alert.setTitle('Delete Menu Fail');
                alert.setMessage('Your menu cannot be deleted from database. Please try again');
                alert.present();
            }
        });
    };
    ManageMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manage-menu',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\manage-menu\manage-menu.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Manage My Menu</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="goCreate()">Create</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let key of myMenus" padding>\n    <img src="{{ key.menuPhoto }}">\n    <br>\n    <ion-card-title>\n      {{ key.menuName }}\n    </ion-card-title>\n    <ion-card-content>\n      Type: {{ key.menuType }} <br>\n      Category: {{ key.menuCategory }} <br>\n      Number of Serving: {{ key.menuServing }}\n    </ion-card-content>\n    <div text-right padding>\n      <button ion-button color="danger" (click)="deleteMenu(key.menuID)">Delete</button>\n      <button ion-button color="light" (click)="editMenu(key.menuID)">Edit</button>\n    </div>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\manage-menu\manage-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
    ], ManageMenuPage);
    return ManageMenuPage;
}());

//# sourceMappingURL=manage-menu.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DisplayPage = (function () {
    function DisplayPage(navCtrl, navParams, loadingCtrl, menuService, social, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.menuService = menuService;
        this.social = social;
        this.toastCtrl = toastCtrl;
        this.menus = [];
        this.ingredient = [];
        this.quantity = [];
        this.unit = [];
        this.lists = [];
        var ver = 0;
        this.menuID = this.navParams.get('id');
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.menuService.getMenuDetail(this.menuID).then(function (res) {
            loader.dismiss();
            _this.menus = res;
            _this.menuService.getIngredient(_this.menuID).then(function (res) {
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var ings = res_1[_i];
                    for (var i in ings) {
                        _this.ingredient.push(ings[i]);
                        ver++;
                    }
                }
                _this.lists = new Array(ver);
            });
            _this.menuService.getQuantity(_this.menuID).then(function (res) {
                for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                    var qtys = res_2[_i];
                    for (var i in qtys) {
                        _this.quantity.push(qtys[i]);
                    }
                }
            });
            _this.menuService.getUnit(_this.menuID).then(function (res) {
                for (var _i = 0, res_3 = res; _i < res_3.length; _i++) {
                    var unts = res_3[_i];
                    for (var i in unts) {
                        _this.unit.push(unts[i]);
                    }
                }
            });
        });
    }
    DisplayPage.prototype.share = function (name, photo) {
        var toast = this.toastCtrl.create({
            message: 'Share success',
            duration: 3000
        });
        this.social.shareViaFacebook(name, photo, null).then(function () {
            toast.present();
        }).catch(function () {
            toast.setMessage('Share fail');
            toast.present();
        });
    };
    DisplayPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-display',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\display\display.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Recipe</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list *ngFor="let key of menus" no-lines>\n    <ion-item>\n      <img src="{{ key.menuPhoto }}">\n    </ion-item>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Details</ion-item-divider>\n      <ion-item>\n        Category: {{ key.menuCategory }}<br>\n        Type: {{ key.menuType }}<br>\n        Duration: {{ key.menuDuration }}<br>\n        Serving: {{ key.menuServing }}\n      </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Details</ion-item-divider>\n      <ion-item>\n        <ion-grid>\n          <ion-row *ngFor="let list of lists; let i = index">\n            <ion-col col-6>\n              {{ ingredient[i] }}\n            </ion-col>\n            <ion-col col-3>\n              {{ quantity[i] }}\n            </ion-col>\n            <ion-col col-3>\n              {{ unit[i] }}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Menu Details</ion-item-divider>\n      <ion-item>\n        <ion-textarea value="{{ key.menuStep }}" readonly></ion-textarea>\n      </ion-item>\n    </ion-item-group>\n    <br>\n    <div>\n      <button ion-button block color="primary" (click)="share(key.menuName, key.menuPhoto)">Share</button>\n    </div>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\display\display.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], DisplayPage);
    return DisplayPage;
}());

//# sourceMappingURL=display.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_search_search__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_result_search_result__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_shake__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__display_display__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, menuService, loadingCtrl, modalCtrl, shake, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuService = menuService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.shake = shake;
        this.authService = authService;
        this.details = [];
        this.searchKey = null;
        this.watch = this.shake.startWatch(40).subscribe(function () {
            _this.menuService.getMenu().then(function (res) {
                var menus = res;
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__display_display__["a" /* DisplayPage */], { id: "-L0qTDUj5YRBMsKfvm_T" });
            });
        });
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        loader.present();
        this.authService.getuser().then(function (res) {
            loader.dismiss();
            _this.details = res;
            console.log(_this.details);
        });
    }
    HomePage.prototype.searchModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HomePage.prototype.searchItem = function (searchKey) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__search_result_search_result__["a" /* SearchResultPage */], { key: searchKey });
        this.clearSearch();
    };
    HomePage.prototype.clearSearch = function () {
        this.searchKey = null;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="searchModal()">\n        <ion-icon name="funnel"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-10 id="search">\n        <ion-input type="text" [(ngModel)]="searchKey" placeholder="Search menu..."></ion-input>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button (click)="searchItem(searchKey)"><ion-icon name="search"></ion-icon></button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-card padding>\n    <img src="{{ details.photoURL }}">\n    <ion-card-title>\n      Hi {{ details.displayName }}\n    </ion-card-title>\n </ion-card>\n <br>\n <ion-item-group>\n   <ion-item-divider color="light">Tips for today</ion-item-divider>\n   <ion-item>\n    <img src="https://firebasestorage.googleapis.com/v0/b/justcook-69d9f.appspot.com/o/dummie.jpg?alt=media&token=c9cc85c0-0b51-46ba-bf07-139471d5745d">\n   </ion-item>\n </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_shake__["a" /* Shake */], __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_menu_menu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__display_display__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchResultPage = (function () {
    function SearchResultPage(navCtrl, navParams, loadingCtrl, menuService, toastCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.menuService = menuService;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.menus = [];
        this.items = [];
        this.searchKey = '';
        this.noResult = false;
        this.typeArr = [];
        this.categoryArr = [];
        this.searchKey = this.navParams.get('key');
        this.ingredient1 = this.navParams.get('ing1');
        this.ingredient2 = this.navParams.get('ing2');
        this.ingredient3 = this.navParams.get('ing3');
        this.type = this.navParams.get('type');
        this.category = this.navParams.get('category');
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        if (this.searchKey != null) {
            loader.present();
            this.menuService.getMenu().then(function (res) {
                loader.dismiss();
                _this.menus = res;
                _this.items = [];
                for (var menu in _this.menus) {
                    if (_this.menus[menu].menuName.toLowerCase().indexOf(_this.searchKey.toLowerCase()) !== -1) {
                        _this.items.push(_this.menus[menu]);
                    }
                }
            });
        }
        else if (this.ingredient1 != null || this.ingredient2 != null || this.ingredient3 != null || this.type != null || this.category != null) {
            loader.present();
            this.menuService.getMenu().then(function (res) {
                _this.menus = res;
                _this.typeArr = [];
                _this.categoryArr = [];
                if (_this.type != null) {
                    for (var a in _this.menus) {
                        if (_this.menus[a].menuType.toLowerCase() == _this.type.toLowerCase()) {
                            _this.typeArr.push(_this.menus[a]);
                        }
                    }
                    if (_this.category != null) {
                        for (var b in _this.typeArr) {
                            if (_this.typeArr[b].menuCategory.toLowerCase().indexOf(_this.category.toLowerCase()) !== -1) {
                                _this.categoryArr.push(_this.typeArr[b]);
                            }
                        }
                        if (_this.ingredient1 != null && _this.ingredient2 != null && _this.ingredient3 != null) {
                            _this.items = _this.lookup(_this.categoryArr, _this.ingredient1, _this.ingredient2, _this.ingredient3);
                        }
                        else {
                            _this.items = _this.categoryArr;
                        }
                    }
                    else if (_this.category == null) {
                        for (var c in _this.typeArr) {
                            _this.categoryArr.push(_this.typeArr[c]);
                        }
                        if (_this.ingredient1 != null && _this.ingredient2 != null && _this.ingredient3 != null) {
                            _this.items = _this.lookup(_this.categoryArr, _this.ingredient1, _this.ingredient2, _this.ingredient3);
                        }
                        else {
                            _this.items = _this.categoryArr;
                        }
                    }
                }
                else if (_this.type == null) {
                    if (_this.category != null) {
                        for (var a in _this.menus) {
                            if (_this.menus[a].menuCategory.toLowerCase().indexOf(_this.category.toLowerCase()) !== -1) {
                                _this.categoryArr.push(_this.menus[a]);
                            }
                        }
                        if (_this.ingredient1 != null && _this.ingredient2 != null && _this.ingredient3 != null) {
                            _this.items = _this.lookup(_this.categoryArr, _this.ingredient1, _this.ingredient2, _this.ingredient3);
                        }
                        else {
                            _this.items = _this.categoryArr;
                        }
                    }
                    else if (_this.category == null) {
                        for (var b in _this.menus) {
                            _this.categoryArr.push(_this.menus[b]);
                        }
                        if (_this.ingredient1 != null && _this.ingredient2 != null && _this.ingredient3 != null) {
                            _this.items = _this.lookup(_this.categoryArr, _this.ingredient1, _this.ingredient2, _this.ingredient3);
                        }
                        else {
                            _this.items = _this.categoryArr;
                        }
                    }
                }
            });
            if (this.items == []) {
                this.noResult = true;
            }
            loader.dismiss();
        }
        else {
            this.noResult = true;
        }
    }
    SearchResultPage.prototype.lookup = function (filterData, k1, k2, k3) {
        var temp = [];
        var garbage = [];
        var filterGarbage = [];
        var count;
        var _loop_1 = function () {
            var id = filterData[a].menuID;
            var garbage_1 = filterData[a];
            this_1.menuService.getIngredient(id).then(function (res) {
                temp = res;
                count = 0;
                for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
                    var keys = temp_1[_i];
                    for (var key in keys) {
                        if (keys[key].toLowerCase() == k1.toLowerCase()) {
                            count++;
                        }
                        if (keys[key].toLowerCase() == k2.toLowerCase()) {
                            count++;
                        }
                        if (keys[key].toLowerCase() == k3.toLowerCase()) {
                            count++;
                        }
                    }
                }
                if (count == 3) {
                    filterGarbage.push(garbage_1);
                }
            });
        };
        var this_1 = this;
        for (var a in filterData) {
            _loop_1();
        }
        return filterGarbage;
    };
    SearchResultPage.prototype.reveal = function (menuID) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__display_display__["a" /* DisplayPage */], { id: menuID });
    };
    SearchResultPage.prototype.addMyFav = function (menuID) {
        var loader = this.loadingCtrl.create({
            content: 'Please Wait'
        });
        var alert = this.alertCtrl.create({
            buttons: ['Dismiss']
        });
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        loader.present();
        this.menuService.addFav(menuID).then(function (res) {
            if (res.success) {
                loader.dismiss();
                toast.setMessage('Add MyFav Success');
                toast.present();
            }
            else {
                loader.dismiss();
                alert.setTitle('Add MyFav Fail');
                alert.setMessage('Your add to MyFav. Please try again');
                alert.present();
            }
        });
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-result',template:/*ion-inline-start:"C:\Ionic\JustCook-Application\src\pages\search-result\search-result.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Search Result</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <ion-list no-lines>\n    <ion-item *ngIf="noResult">\n      No result found\n    </ion-item>\n    <ion-item *ngIf="!noResult">\n      <ion-card *ngFor="let item of items" padding>\n        <div (click)="reveal(item.menuID)">\n          <img src="{{ item.menuPhoto }}">\n          <ion-card-title>\n            {{ item.menuName }}\n          </ion-card-title>\n          <ion-card-content>\n              <b>Serving Menu:</b> {{ item.menuServing }}\n              <br>\n              <b>Duration:</b> {{ item.menuDuration }}\n              <br>\n              <b>Type/ Category:</b> {{ item.menuType }} /{{ item.menuCategory }}\n          </ion-card-content>\n        </div>\n        <div text-center>\n          <button ion-button block color="primary" (click)="addMyFav(item.menuID)">Add to MyFav</button>\n        </div>\n      </ion-card>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\JustCook-Application\src\pages\search-result\search-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_menu_menu__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ })

},[297]);
//# sourceMappingURL=main.js.map