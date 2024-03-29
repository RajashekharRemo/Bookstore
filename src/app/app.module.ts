import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HeaderComponent } from './Components/header/header.component';

import {MatFormFieldModule} from '@angular/material/form-field';
//import {MatLabelModule} from '@angular/material/label';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';



import { LoginSignUpContainerComponent } from './Components/login-sign-up-container/login-sign-up-container.component';
import { LoginContainerComponent } from './Components/login-container/login-container.component';
import { SignUpContainerComponent } from './Components/sign-up-container/sign-up-container.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MycartContainerComponent } from './Components/mycart-container/mycart-container.component';
import { DashBoardContainerComponent } from './Components/dash-board-container/dash-board-container.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CardsComponent } from './Components/cards/cards.component';
import { DisplayCardContainerComponent } from './Components/display-card-container/display-card-container.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpService } from './Services/http.service';
import { DataService } from './Services/data.service';
import { CartComponent } from './Components/cart/cart.component';
import { MyOrderContainerComponent } from './Components/my-order-container/my-order-container.component';
import { OrderCardComponent } from './Components/my-order-container/order-card/order-card.component';
import { CartCartComponent } from './Components/mycart-container/cart-cart/cart-cart.component';
import { MyWishListComponent } from './Components/my-wish-list/my-wish-list.component';
import { WishListCardComponent } from './Components/my-wish-list/wish-list-card/wish-list-card.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AddressComponent } from './Components/mycart-container/address/address.component';
import { CheckOutComponent } from './Components/mycart-container/check-out/check-out.component';
import { SuccessOrderComponent } from './Components/success-order/success-order.component';
import { AddressProfileComponent } from './Components/profile/address-profile/address-profile.component';
import { SearchBookPipe } from './Pipes/search-book.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    LoginSignUpContainerComponent,
    LoginContainerComponent,
    SignUpContainerComponent,
    ResetPasswordComponent,
    MycartContainerComponent,
    DashBoardContainerComponent,
    FooterComponent,
    CardsComponent,
    DisplayCardContainerComponent,
    BookDetailsComponent,
    ReviewsComponent,
    CartComponent,
    MyOrderContainerComponent,
    OrderCardComponent,
    CartCartComponent,
    MyWishListComponent,
    WishListCardComponent,
    ProfileComponent,
    AddressComponent,
    CheckOutComponent,
    SuccessOrderComponent,
    AddressProfileComponent,
    SearchBookPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDividerModule,
    MatBadgeModule,


    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule


  ],
  providers: [HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
