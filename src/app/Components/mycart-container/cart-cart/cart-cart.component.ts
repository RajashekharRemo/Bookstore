import { Component, Input, OnInit } from '@angular/core';
import { LoginSignUpContainerComponent } from '../../login-sign-up-container/login-sign-up-container.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-cart-cart',
  templateUrl: './cart-cart.component.html',
  styleUrls: ['./cart-cart.component.scss']
})
export class CartCartComponent implements OnInit {

  constructor(private matDialog:MatDialog,private datasource:DataService, private httpServices:HttpService) { }


  book:any={
    actualPrice:'',
    author:'',
    description:'',
    id:'',
    price:'',
    quantity:'',
    title:'',
    image:''
  }

  price:number=0;

  ngOnInit(): void {

    //  console.log("Arraydata converted");
    // console.log(this.ArrayData);
    

    const result= this.datasource.Books.filter(item=>{

      if(item.id==this.ArrayData.bookId){
        return true;
      }else{
        return false;
      }
    })

    this.book=result[0];
    this.price=this.book.price*this.ArrayData.quantity;
    this.count=this.ArrayData.quantity;

     
  }



  
  count=1;
  increament(){
    this.count+=1;
  }

  decreament(){
    if(this.count>0){
      this.count-=1;
    }
  }

  @Input() newCartId:any;
  @Input() ArrayData:any;



  removeItem(){

    if(localStorage.getItem('token')){
      let id= localStorage.getItem('id')

      this.httpServices.removeCartItem({uId:Number(id), bookId:this.book.id}).subscribe(resp=>{
        this.datasource.AddToCart=this.datasource.AddToCart.filter(e=> {
          if(e.bookId!=this.book.id){
            return true;
          }else{
            return false;
          }
        });
        this.datasource.updateCartList(this.datasource.AddToCart);
      })
    }else{
      this.datasource.AddToCart=this.datasource.AddToCart.filter(e=> {
        if(e.bookId!=this.book.id){
          return true;
        }else{
          return false;
        }
      });
    }


    this.datasource.updateCartList(this.datasource.AddToCart)
  }

}
