import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavMenuPage } from './fav-menu';

@NgModule({
  declarations: [
    FavMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FavMenuPage),
  ],
})
export class FavMenuPageModule {}
