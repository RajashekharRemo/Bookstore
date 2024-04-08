import { Component, OnInit } from '@angular/core';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/Services/http.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private services : BookstoreService, private httpServices:HttpService, private dataServices:DataService) { }

  ngOnInit(): void {
  }

  passwordToggle=true;
  toggleEye(){
    this.passwordToggle=!this.passwordToggle
  }

  loginObj:any={
    email : '',
    password : ''
  }

  login(){
    //console.log(this.dataServices.AddToCart);
    
    debugger;
    this.services.loginUser(this.loginObj).subscribe(resp=>{
      //console.log(resp);
      if(resp.result){
        alert("Login Success");
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem('id', resp.data.id);
        localStorage.setItem('fullName',resp.data.fullName);
        localStorage.setItem('email', resp.data.email);
        this.dataServices.updateNameForHeader(resp.data.fullName);

        this.dataServices.updatePlaceOrder(false);

        this.httpServices.getCartDetails(resp.data.id).subscribe(cart=>{

          for(let j =0; j<this.dataServices.AddToCart.length; j++){

            let index=cart.data.findIndex((item:any)=>item.id==this.dataServices.AddToCart[j].bookId);
            if(index>-1){
              cart.data[index].quantity=this.dataServices.AddToCart[j].quantity+cart.data[index].quantity;;
              this.httpServices.updateCartBookQuantity({bookId:cart.data[index].id, quantity:cart.data[index].quantity}).subscribe(og=>{
                console.log('updated');
              })
            }else{
              cart.data.push({id:this.dataServices.AddToCart[j].bookId, quantity:this.dataServices.AddToCart[j].quantity});
              this.httpServices.addToCart({bookId:this.dataServices.AddToCart[j].bookId, quantity:this.dataServices.AddToCart[j].quantity}).subscribe(og=>{
                console.log(og);
                
              })
            }
          }
          //console.log(cart.data);
          
          let arr=[];
          for(let i = 0; i<cart.data.length; i++){
             arr.push({bookId:cart.data[i].id, quantity:cart.data[i].quantity})
          }

          this.dataServices.AddToCart=arr;
          this.dataServices.updateCartList(this.dataServices.AddToCart);
        })

        this.httpServices.getWishList(resp.data.id).subscribe(list=>{
          let arr=[];
          for(let i = 0; i<list.data.length; i++){
            arr.unshift({bookId:list.data[i].id})
          }

          for(let j =0; j<this.dataServices.WishList.length; j++){
            let index=arr.findIndex((item:any)=>item.bookId==this.dataServices.WishList[j].bookId);
            if(index>-1){
            }else{
              arr.unshift({bookId:this.dataServices.WishList[j].bookId});
              this.httpServices.addTowishList({uId:localStorage.getItem('id'), bId:this.dataServices.WishList[j].bookId}).subscribe(og=>{
                //console.log('wishList Added');
              })
            }
          }
          this.dataServices.WishList=arr;
          this.dataServices.updateWishList(this.dataServices.WishList);

        })



      }
      
    }, (err:HttpErrorResponse)=>{
      console.log(err);
      
    })


  }


}
