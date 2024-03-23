import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { AddToCart, Review } from '../../Model/bookstore.model';
import { StoreListService } from '../../Bookstore/store-list.service';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  id:any;

  constructor(private activatedRoute:ActivatedRoute, private services:BookstoreService, private datasource:DataService, private httpservices:HttpService,
    private matDialog:MatDialog) {
    //this.id=+activatedRoute.snapshot.params.id;
   
  }

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


  CartList:AddToCart[]=[];

  ReviewsPrint:Review[]=[];

  wordLimit:number=220;
  showmore=false;
  subscription!: Subscription;
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params;
    //console.log(this.id.id);
    // this.services.getBookById(this.id.id).subscribe(resp=>{
    //     //console.log(resp.data);
        
    //   this.book=resp.data;
    // })


    this.subscription=this.datasource.currCartList.subscribe((resp:any)=>{
      this.CartList=resp;
      const result= resp.filter((item:any)=>{
        if(item.id==this.id.id){
          return true;
        }else{
         return false;
        }
      })
  
      this.book=result[0];

    })



    setTimeout(()=>{
      const result= this.datasource.Books.filter(item=>{
        if(item.id==this.id.id){
          return true;
        }else{
         return false;
        }
      })
  
      this.book=result[0];
  
      this.services.getReviewsByBookId(this.id.id).subscribe(resp=>{
        //console.log(resp);
      
        this.ReviewsPrint=resp
      })



      // console.log(this.datasource.AddToCart.filter(c=>c.bookId==this.id.id));
      

      // console.log('log from checking');
      if(this.datasource.AddToCart.find(c=>c.bookId==this.id.id)){
        
        let result=this.datasource.AddToCart.find(c=>c.bookId==this.id.id)
       this.accessCount=false;
       this.count=result?.quantity;
     }

    }, 100)

    
     

  }



  count:any=1;
  newlyAddedtoCart:any=0;

  accessCount=true;
  accessCountFunction(){
    this.accessCount=!this.accessCount;
    // this.datasource.AddToCart.unshift({ bookId: this.id.id, quantity: this.count })
    // this.datasource.routeBookId=this.id.id;
    
    // //console.log(this.datasource.AddToCart);
    // this.newlyAddedtoCart=this.id.id;
    // this.datasource.updateSharedValue(this.datasource.AddToCart);

    let obj={
      bookId:this.book.id,
      quantity:1,
    }

    this.datasource.updateCartList([...this.CartList, obj])

  }

  
  increament(){
    this.count+=1;
  }

  decreament(){
    if(this.count>0){
      this.count-=1
    }
  }

  showMoreDescription(){
    this.showmore=!this.showmore;
  }


  stars=[1,2,3,4,5]
  alreadyGivenRating:number=0;
  presentGivingRating:number=0;

  updateRating(num:number){
    
    this.presentGivingRating=num;
  }


  ngOnDestroy(): void {
    
    this.subscription.unsubscribe;

    //console.log(this.datasource.AddToCart);
    if(localStorage.getItem('id') && this.newlyAddedtoCart>0){
      debugger
      const index = this.datasource.AddToCart.findIndex(item => item.bookId == this.newlyAddedtoCart);
      if(this.datasource.AddToCart[index].quantity>this.count || this.datasource.AddToCart[index].quantity<this.count){
        this.httpservices.addToCart(this.datasource.AddToCart[index]).subscribe(resp=>{
          if(resp.result){
            //alert('added to cart');
          }
        })
      }
    }else if(this.datasource.AddToCart.find(c=>c.bookId==this.id.id && localStorage.getItem('id'))){
      const index = this.datasource.AddToCart.findIndex(item => item.bookId == this.id.id);
      if(this.datasource.AddToCart[index].quantity>this.count || this.datasource.AddToCart[index].quantity<this.count){
        this.datasource.AddToCart[index].quantity=this.count;
        //console.log(this.datasource.AddToCart[index]);
        this.httpservices.updateCartBookQuantity(this.datasource.AddToCart[0]).subscribe(resp=>{
          if(resp.result){
           // alert('updated quantity')
          }
        }, err=>{
          console.log(err);
          
        })
      }

    }else if(this.datasource.AddToCart.find(c=>c.bookId==this.id.id) && localStorage.getItem('id')==null){
      debugger
      const index = this.datasource.AddToCart.findIndex(item => item.bookId == this.id.id);
      if(this.datasource.AddToCart[index].quantity>this.count || this.datasource.AddToCart[index].quantity<this.count){
        this.datasource.AddToCart[index].quantity=this.count;
        console.log(this.datasource.AddToCart[index]);
        this.datasource.updateSharedValue(this.datasource.AddToCart);
  
      }
    }
  }


}
