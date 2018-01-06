import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { config } from './app.firebaseconfig';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Shake } from '@ionic-native/shake';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PasswordRecoveryPage } from '../pages/password-recovery/password-recovery';
import { CreateMenuPage } from '../pages/create-menu/create-menu';
import { AuthProvider } from '../providers/auth/auth';
import { MenuProvider } from '../providers/menu/menu';
import { ManageMenuPage } from '../pages/manage-menu/manage-menu';
import { SearchResultPage } from '../pages/search-result/search-result';
import { SearchPage } from '../pages/search/search';
import { MyFavPage } from '../pages/my-fav/my-fav';
import { Autosize } from '../directives/directives.module';
import { EditMenuPage } from '../pages/edit-menu/edit-menu';
import { DisplayPage } from '../pages/display/display';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PasswordRecoveryPage,
    CreateMenuPage,
    ManageMenuPage,
    SearchResultPage,
    SearchPage,
    SearchResultPage,
    MyFavPage,
    Autosize,
    EditMenuPage,
    DisplayPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PasswordRecoveryPage,
    CreateMenuPage,
    ManageMenuPage,
    SearchResultPage,
    SearchPage,
    SearchResultPage,
    MyFavPage,
    EditMenuPage,
    DisplayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    MenuProvider,
    Camera,
    SocialSharing,
    Shake
  ]
})
export class AppModule {}
