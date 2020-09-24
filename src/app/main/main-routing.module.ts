import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: "news-feed",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../news-feed/news-feed.module").then(
                (m) => m.NewsFeedPageModule
              ),
          },
        ],
      },
      {
        path: "gallery",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../gallery/gallery.module").then(
                (m) => m.GalleryPageModule
              ),
          },
        ],
      },
      {
        path: "enquiry",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../enquiry/enquiry.module").then(
                (m) => m.EnquiryPageModule
              ),
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },

      {
        path: "",
        redirectTo: "news-feed",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
