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

    this.subscription=this.datasource.bookListAccess.subscribe((resp:any)=>{
      const result= resp.filter((item:any)=>{
        if(item.id==this.id.id){
          return true;
        }else{
         return false;
        }
      })
  
      this.book=result[0];

    })



    // this.services.getReviewsByBookId(this.id.id).subscribe(resp=>{
    //   this.ReviewsPrint=resp
    // })

    this.httpservices.getAllReviews().subscribe(resp=>{
      this.datasource.Reviews=resp.data
      this.datasource.updateReview(resp.data);
    })

    this.datasource.reviewAccess.subscribe(resp=>{
      this.ReviewsPrint=resp.filter((e:any)=>{
        if(e.bookId==this.id.id){
          return true;
        }else{
          return false;
        }
      })
    })
    
    let cartIndex= this.datasource.AddToCart.findIndex(e=>e.bookId==this.book.id);
    if(cartIndex>-1){
      this.accessCount=false;
      this.count=this.datasource.AddToCart[cartIndex].quantity;
    }

    let wishlistIndex= this.datasource.WishList.findIndex(e=>e.bookId==this.book.id);
    if(wishlistIndex>-1){
      this.wishlist=true;
    }

  }



  count:any=1;
  newlyAddedtoCart:any=0;

  accessCount=true;
  accessCountFunction(){
    this.accessCount=!this.accessCount;
    // this.datasource.routeBookId=this.id.id;
    
    this.newlyAddedtoCart=this.id.id;

    this.datasource.AddToCart.unshift({bookId:this.book.id, quantity:1})

    this.datasource.updateCartList(this.datasource.AddToCart)

  }


  wishlist=false;

  newlyAddedToWishList:number=0
  addToWishList(){
    this.wishlist=true
    
    let index = -1;
      // let userId=Number(localStorage.getItem('id'));
      // this.httpservices.getWishList(userId).subscribe(resp=>{
      //   index=resp.data.findIndex((e:any)=>e.id==this.newlyAddedToWishList)
      // }, err=>{
      //   console.log(err);
        
      // })

      index=this.datasource.WishList.findIndex(e=>e.bookId==this.id.id);

      if(index>-1){
        console.log("already added");
      }else{
        this.newlyAddedToWishList=this.id.id;
      }
    
    this.datasource.WishList.unshift({bookId:this.book.id})
    this.datasource.updateWishList(this.datasource.WishList);
    //alert('Added to WishList')
    
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

  reviewObj={
    bReview:'',
    stars:'',
    uId:'',
    bId:''
  }

  newlyAddedReview={
    review:'',
    fullName:'',
    stars:0,
    bookId:0
  }

  giveReview(){
    if(localStorage.getItem('token')){
      this.reviewObj.bId=this.id.id;
      this.reviewObj.uId=""+localStorage.getItem('id');
      this.reviewObj.stars=''+this.presentGivingRating;

      //console.log(this.reviewObj);
      this.httpservices.addReview(this.reviewObj).subscribe(resp=>{
        this.newlyAddedReview.bookId=this.id.id;
        this.newlyAddedReview.review=this.reviewObj.bReview;
        this.newlyAddedReview.stars=this.presentGivingRating;
        this.newlyAddedReview.fullName=''+localStorage.getItem('fullName');
        this.datasource.Reviews.unshift(this.newlyAddedReview);
        this.datasource.updateReview(this.datasource.Reviews);

        this.presentGivingRating=0;
        this.reviewObj.bReview='';
        //alert('Review added successfylly');
      })
      
    }else{
      alert('Please Login to Give Review..')
    }
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe;


    if(localStorage.getItem('id') && this.newlyAddedtoCart>0){
    
      const index = this.datasource.AddToCart.findIndex(item => item.bookId == this.newlyAddedtoCart);
      this.httpservices.addToCart(this.datasource.AddToCart[index]).subscribe(resp=>{
        if(resp.result){
          //alert('added to cart'); 
        }
      })
      //alert('added to cart')
    }else if(this.datasource.AddToCart.find(c=>c.bookId==this.id.id) && localStorage.getItem('id')){
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
        this.datasource.updateCartList(this.datasource.AddToCart);
  
      }
    }



    if(localStorage.getItem('id') && this.newlyAddedToWishList>0){
      this.httpservices.addTowishList({uId:localStorage.getItem('id'), bId:this.newlyAddedToWishList}).subscribe(resp=>{
        alert('Added to database');
      })
    }

  }

}
