import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUserPageRoutingModule } from './all-user-routing.module';

import { AllUserPage } from './all-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUserPageRoutingModule
  ],
  declarations: [AllUserPage]
})
export class AllUserPageModule {}
