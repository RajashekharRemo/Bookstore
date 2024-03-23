import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-mycart-container',
  templateUrl: './mycart-container.component.html',
  styleUrls: ['./mycart-container.component.scss']
})
export class MycartContainerComponent implements OnInit, OnDestroy{

  constructor(private matDialog:MatDialog, private activatedRoute:ActivatedRoute, private dataservice:DataService, private httpServices:HttpService) { }


  
  routeId:any=0;

  CartDetails:any;
  cartLength:any=0;

  ngOnInit(): void {
    // this.routeId=this.activatedRoute.snapshot.params;
    // console.log(this.routeId.id);

    // setTimeout(()=>{
    //   this.CartDetails=this.dataservice.AddToCart
    //   console.log(this.CartDetails);
    //   this.cartLength=this.CartDetails.length;
    // }, 100)

    // this.dataservice.sharedValue$.subscribe((value) => {
    //   // Update your component's view with the new value
    //   debugger
    //   //console.log( value.length);
    //   this.CartDetails=value;
    //   this.cartLength=this.CartDetails.length;

    // });


    this.dataservice.currCartList.subscribe(resp=>{
      this.CartDetails=resp
    })

  }



  // ngOnChanges(changes: SimpleChanges): void {
  //   this.dataservice.sharedValue$.subscribe((value) => {
  //     // Update your component's view with the new value
  //     console.log( value.length +"from changes");
  //     this.CartDetails=value;
  //     this.cartLength=this.CartDetails.length;

  //   });
  // }


  
  bookOrder(){
    if(localStorage.getItem('token')){


    }else{
      //console.log("token not found");
      const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        //console.log('The dialog was closed');
      })
      
    }

  }


  ngOnDestroy(): void {
    debugger
    if(localStorage.getItem('token')==null && this.dataservice.AddToCart.length>0 && this.dataservice.AddToCart.find(c=>c.bookId==this.routeId.id)){
      if(confirm('please login to save your cart otherwise you loose your cart items')){
        const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
        dialogRef.afterClosed().subscribe(resp => {
          console.log('The dialog was closed');
          debugger
          if(localStorage.getItem('token')){
            // this.httpservices.addToCart({ bookId: this.id.id, quantity: this.count }).subscribe(resp=>{
            //   console.log(resp);
              
            // })

            
            debugger
            var index = this.dataservice.AddToCart.map(function(e) { return e.bookId; }).indexOf(this.routeId.id);
            let alreadyaddedToCart=this.dataservice.ActualCart.filter(a=>{
              if(a.bookId ==this.routeId.id){ return true
              }else{  return false;
              }
            })

            if(alreadyaddedToCart.length>-1){
              alert("Already added");
             }else{
              this.httpServices.addToCart(this.dataservice.AddToCart[index]).subscribe(resp=>{
                if(resp.result){
                  alert('added to cart');
                  
                }
              })
            }
          }
        })
      }
    }else if(localStorage.getItem('token') && this.dataservice.AddToCart.length>0 && this.dataservice.AddToCart.find(c=>c.bookId==this.routeId.id) ){
      debugger;
      var index = this.dataservice.AddToCart.map(function(e) { return e.bookId; }).indexOf(this.routeId.id);
      var actualcartIndex= this.dataservice.ActualCart.map(function(e) { return e.bookId; }).indexOf(this.routeId.id);
      if(this.dataservice.AddToCart[index].quantity>this.dataservice.ActualCart[actualcartIndex].quantity || this.dataservice.AddToCart[index].quantity<this.dataservice.ActualCart[actualcartIndex].quantity){
        this.dataservice.ActualCart[actualcartIndex].quantity=this.dataservice.AddToCart[index].quantity;
        // this.httpServices.updateCartBookQuantity(this.dataservice.ActualCart[actualcartIndex]).subscribe((resp)=>{
        //   if(resp.result){
        //     alert('updated successfully');
        //   }
        // })
      }
    }
  }

}
