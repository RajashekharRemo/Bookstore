import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private httpservices:HttpService,private dataservices: DataService, private router:Router,private activatedRoute:ActivatedRoute
    , private matDialog:MatDialog) { }


  userName:any='Profile';
  subscription!: Subscription;

  ngOnInit(): void {
    //debugger;
    this.postDetails();
    if(localStorage.getItem('token')){
      this.userName=localStorage.getItem('fullName')
    }
  }

  notification:number=0;

  postDetails(){
    this.httpservices.getAllBooks().subscribe(resp=>{
      this.dataservices.Books=resp;
       this.dataservices.updateBookList(resp);
    })

    this.dataservices.currCartList.subscribe((value) => {
      // Update your component's view with the new value
      //console.log( value.length);
      this.notification=value.length;
    });

    this.dataservices.loginUserForHeader.subscribe(value=>{
      this.userName=value;
    })


    if(localStorage.getItem('id')){
      this.openDialog=false;
      this.httpservices.getCartDetails(localStorage.getItem('id')).subscribe(resp=>{
        //console.log(resp);
        for(let i=0; i<resp.data.length;i++){
          this.dataservices.AddToCart.unshift({bookId :resp.data[i].id, quantity:resp.data[i].quantity})
        }
        //console.log(this.dataservices.AddToCart);
        this.notification=this.dataservices.AddToCart.length;
        this.dataservices.updateCartList(this.dataservices.AddToCart);
      })

      
      this.httpservices.getWishList(localStorage.getItem('id')).subscribe(resp=>{
        for(let i=0; i<resp.data.length;i++){
          this.dataservices.WishList.unshift({bookId :resp.data[i].id})
        }
        this.dataservices.updateWishList(this.dataservices.WishList);
      })

      // this.httpservices.getAllOrders().subscribe(resp=>{
      //   this.dataservices.Orders=resp;
      //   this.dataservices.updateOrdersList(this.dataservices.Orders);
      // })


    }


  }

  

  goToCart(){
    this.router.navigate(['/cart']);
  }

  beforeSignInGotoWishList(){
    this.openDialog=!this.openDialog
    this.router.navigate(['/landing_page'])
  }

  afterLogInGotoWishList(){
    this.openDialog=false;
    this.openList=!this.openList;
    this.router.navigate(['/wishlist']);
  }


  afterLogInGotoOders(){
    this.openDialog=false;
    this.openList=!this.openList;
    this.router.navigate(['/my-orders']);
  }

  afterLoginGotoProfile(){
    this.openDialog=false;
    this.openList=!this.openList;
    this.router.navigate(['/profile']);
  }


  openDialog=false;
  openList=false;
  callOpenDialog(){
    if(localStorage.getItem('token')){
      this.openList=!this.openList;

    }else{
      this.openDialog=!this.openDialog
    }
  }



  login(){
    const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        console.log('The dialog was closed . if name problem come check here');
        // if(localStorage.getItem('fullName')){
        //   this.userName=localStorage.getItem('fullName')
        // }
      })
      this.openDialog=!this.openDialog
  }

  logout(){
    debugger
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('fullName')
    localStorage.removeItem('email')
    this.openList=!this.openList;
    this.dataservices.updateNameForHeader('profile');
    this.dataservices.AddToCart=[];
    this.dataservices.updateCartList(this.dataservices.AddToCart);
    this.dataservices.WishList=[];
    this.dataservices.updateWishList(this.dataservices.WishList);
    this.dataservices.Orders=[];
    this.dataservices.updateOrdersList(this.dataservices.Orders);
    this.router.navigateByUrl('/cards');
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

}
