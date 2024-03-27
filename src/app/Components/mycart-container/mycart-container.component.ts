import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';
import { Address } from 'src/app/Model/bookstore.model';

@Component({
  selector: 'app-mycart-container',
  templateUrl: './mycart-container.component.html',
  styleUrls: ['./mycart-container.component.scss']
})
export class MycartContainerComponent implements OnInit{

  constructor(private matDialog:MatDialog, private activatedRoute:ActivatedRoute, private dataservice:DataService, private httpServices:HttpService) { }


  
  routeId:any=0;

  CartDetails:any;
  cartLength:any=0;
  Address=[];

  ngOnInit(): void {


    this.dataservice.currCartList.subscribe(resp=>{
      this.CartDetails=resp
      this.cartLength=resp.length
      if(resp.length>1){
        this.forFooterCss=true;
      }
    })

    // this.dataservice.placeOrderAccess.subscribe(resp=>{
    //   this.showPlaceOrder=resp;
    // })  // change here 


  }

  forFooterCss=false;

  AllAddressOfUser:Address[]=[]
  showPlaceOrder:boolean=true;// change here 
  
  placeOrder(){
    if(localStorage.getItem('token')){
      this.showPlaceOrder=false;
      this.httpServices.getAllAddress().subscribe(resp=>{
        this.dataservice.Address=resp;
        this.dataservice.updateAddressList(this.dataservice.Address);
        this.dataservice.AddressListAccess.subscribe(data=>{
          this.AllAddressOfUser=data;
        })
      })
      this.forFooterCss=true;
    }else{
      const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        //console.log('The dialog was closed');
      })
      
    }

  }

  addAddress=false;

  addNewAddress(){
    this.addAddress=true;
  }
  cancelToAddNewAddr(){
    this.addAddress=false;
  }

  newAddr:any={
    uName:'',
    uPhone:'',
    city:'',
    state:'',
    uAddress:'',
    addressType:''
  }
  
  saveTheNewAddr(){
    this.addAddress=false;
    console.log(this.newAddr);
    this.httpServices.addNewAdderss(this.newAddr).subscribe(resp=>{
      if(resp.result){
        this.dataservice.Address.push(resp.data);
        this.dataservice.updateAddressList(this.dataservice.Address);
      }
    })
  }

  SelectedAddressForOrder:any={}
  EmittedAddres($event:any){
    this.SelectedAddressForOrder=$event
  }

  OrderObj={
    uName:'',
    address:'',
    city:'',
    phone: '',
    state: '',
    bookId:'',
    quantity:''
  }
  disableContinueButton=false;
  ContinueOrder(){
    if(this.SelectedAddressForOrder.id){
      this.dataservice.SelectedAddress=[this.SelectedAddressForOrder]
      //console.log(this.dataservice.SelectedAddress);
      this.OrderObj.uName=this.dataservice.SelectedAddress[0].uAddress;
      this.OrderObj.address=this.dataservice.SelectedAddress[0].uAddress;
      this.OrderObj.city=this.dataservice.SelectedAddress[0].city;
      this.OrderObj.phone=this.dataservice.SelectedAddress[0].uPhone;
      this.OrderObj.state=this.dataservice.SelectedAddress[0].state;

      this.disableContinueButton=true;
    }else{
      alert('Select the address or Add new Address');
    }
    
  }


  checkout(){
    debugger
    //let filteredBook:any=[];


    if(this.dataservice.AddToCart.length>0){
      let length=this.dataservice.AddToCart.length;
      for(let i=0; i<length; i++){
        for(let j=0; j<this.dataservice.Books.length;j++){
          if(this.dataservice.Books[j].id==this.dataservice.AddToCart[i].bookId && this.dataservice.Books[j].quantity>this.dataservice.AddToCart[i].quantity){
            this.OrderObj.bookId=''+this.dataservice.AddToCart[i].bookId;
            this.OrderObj.quantity=''+this.dataservice.AddToCart[i].quantity;

            this.httpServices.addOrder(this.OrderObj).subscribe(resp=>{
              if(resp.result){
                //alert('ordered successfully');
              }
            })
          }else{
            //alert('Actual book quantity of '+this.dataservice.Books[j].title+' is less than in your book count');
          }
        }
      }
    }

    if(this.dataservice.AddToCart.length>0){
      let length=this.dataservice.AddToCart.length;
    for(let i =0;i<length; i++){
      this.dataservice.Books=this.dataservice.Books.filter(e=>{
        if(e.id==this.dataservice.AddToCart[i].bookId){
          if(e.quantity>this.dataservice.AddToCart[i].quantity){
            e.quantity=e.quantity-this.dataservice.AddToCart[i].quantity;

            this.httpServices.updateBook(e).subscribe(resp=>{

              //console.log("updated successfully"+e.id);
              this.httpServices.removeCartItem({uId:localStorage.getItem('id'), bookId:e.id}).subscribe(resp=>{
                //console.log("deleted successfylly");
                this.dataservice.AddToCart=this.dataservice.AddToCart.filter(f=>{
                  if(f.bookId!=e.id){
                    return true;
                  }else{
                    return false;
                  }
                })

                //console.log(this.dataservice.AddToCart);
                this.dataservice.updateBookList(this.dataservice.Books);
                this.dataservice.updateCartList(this.dataservice.AddToCart);

              })
            })
            
          }else{
            alert('Actual book quantity of '+e.title+' is less than in your book count');
          }
          return true;
        }else{
          return true;
        }
      })
      
    }



    }
  }

}
