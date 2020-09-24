import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUserPage } from './all-user.page';

const routes: Routes = [
  {
    path: '',
    component: AllUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUserPageRoutingModule {}
