import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LoginSignUpContainerComponent } from './Components/login-sign-up-container/login-sign-up-container.component';
import { LoginContainerComponent } from './Components/login-container/login-container.component';
import { SignUpContainerComponent } from './Components/sign-up-container/sign-up-container.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MycartContainerComponent } from './Components/mycart-container/mycart-container.component';
import { DashBoardContainerComponent } from './Components/dash-board-container/dash-board-container.component';
import { DisplayCardContainerComponent } from './Components/display-card-container/display-card-container.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { MyOrderContainerComponent } from './Components/my-order-container/my-order-container.component';

const routes: Routes = [
  {path:'landing_page', component: LandingPageComponent},
  {path:'', component: DashBoardContainerComponent, children:[
    {path:'cards', component:DisplayCardContainerComponent},
    {path:'bookdetails/:id', component:BookDetailsComponent},
    {path:'cart', component: MycartContainerComponent}
  ]},
  {
    path:'login-signup', component:LoginSignUpContainerComponent, 
  children:[{path:'login', component:LoginContainerComponent},{path:'signup', component:SignUpContainerComponent}]
  },
  {path:'reset_password', component: ResetPasswordComponent},
  {path:'my-orders', component: MyOrderContainerComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
