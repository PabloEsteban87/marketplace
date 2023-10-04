import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeuserviewComponent } from './views/homeuserview/homeuserview.component';
import { BannerComponent } from './components/user/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderclientComponent } from './shared/headerclient/headerclient.component';
import { HeaderadminComponent } from './shared/headeradmin/headeradmin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComicTableComponent } from './components/user/comic-table/comic-table.component';
import { LoginComponent } from './components/user/login/login.component';
import { ComicDetailComponent } from './components/user/comic-detail/comic-detail.component';
import { HeaderloginComponent } from './shared/headerlogin/headerlogin.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShopingCartClientComponent } from './components/user/shoping-cart-client/shoping-cart-client.component';
import { RegisterAComponent } from './components/user/register-a/register-a.component';
import { HomeloginviewComponent } from './views/homeloginview/homeloginview.component';
import { NewComponent } from './components/admin/new/new.component';
import { UserPurchaseHistoryComponent } from './components/user/user-purchase-history/user-purchase-history.component';
import { ClientDetailsComponent } from './components/admin/client-details/client-details.component';
import { ModificateComicsComponent } from './components/admin/modificate-comics/modificate-comics.component';
import { ComictableadminComponent } from './components/admin/comictableadmin/comictableadmin.component';
import { EditComicComponent } from './components/admin/edit-comic/edit-comic.component';
import { AdminloginviewComponent } from './views/adminloginview/adminloginview.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserPurchaseHistoryViewComponent } from './views/user-purchase-history-view/user-purchase-history-view.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeuserviewComponent,
    HomeloginviewComponent,
    BannerComponent,
    FooterComponent,
    HeaderadminComponent,
    HeaderclientComponent,
    ComicTableComponent,
    LoginComponent,
    ComicDetailComponent,
    HeaderloginComponent,
    ShopingCartClientComponent,
    RegisterAComponent,
    NewComponent,
    ClientDetailsComponent,
    UserPurchaseHistoryComponent,
    ModificateComicsComponent,
    ComictableadminComponent,
    EditComicComponent,
    AdminloginviewComponent,
    UserPurchaseHistoryViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule.forRoot()
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
