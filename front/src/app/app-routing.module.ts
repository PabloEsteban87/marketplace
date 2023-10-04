import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicTableComponent } from './components/user/comic-table/comic-table.component';
import { ComicDetailComponent } from './components/user/comic-detail/comic-detail.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeuserviewComponent } from './views/homeuserview/homeuserview.component';
import { HomeloginviewComponent } from './views/homeloginview/homeloginview.component';
import { UserPurchaseHistoryViewComponent } from './views/user-purchase-history-view/user-purchase-history-view.component';
import { RegisterAComponent } from './components/user/register-a/register-a.component';
import { ShopingCartClientComponent } from './components/user/shoping-cart-client/shoping-cart-client.component';
import { NewComponent } from './components/admin/new/new.component';
import { AdminloginviewComponent } from './views/adminloginview/adminloginview.component';
import { EditComicComponent } from './components/admin/edit-comic/edit-comic.component';
import {ClientDetailsComponent} from './components/admin/client-details/client-details.component';
 

const routes: Routes = [
  { path: 'comic/:isbn', component:  ComicDetailComponent },
  { path: 'comicList', component: HomeuserviewComponent},
  { path: '', component:  HomeloginviewComponent},
  {path: 'register', component: RegisterAComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: ShopingCartClientComponent},
  {path: 'newcomic',component: NewComponent},
  { path: 'purchase-history/:email', component: UserPurchaseHistoryViewComponent},
  { path: 'editar/:isbn', component: EditComicComponent },
  { path: 'admin', component: AdminloginviewComponent},
  { path: 'admin-client', component: ClientDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
