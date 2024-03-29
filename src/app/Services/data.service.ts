import { Injectable } from '@angular/core';
import { AddToCart, Book, Orders, Review, WishList, Address } from '../Model/bookstore.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  Books:Book[]=[];
  Reviews:Review[]=[];
  AddToCart:AddToCart[]=[];
  WishList:WishList[]=[];
  Orders:Orders[]=[];
  Address:Address[]=[];
  SelectedAddress:Address[]=[];

  routeBookId:any='';

  getBookData(){
    return this.Books;
  }

  getReviews(){
    return this.Reviews;
  }

  getRouteBookId(){
    return this.routeBookId;
  }

//=====================================================================


  private loginUserName=new BehaviorSubject<any>('Profile');
  public loginUserForHeader=this.loginUserName.asObservable();

  updateNameForHeader(newValue:any){
    this.loginUserName.next(newValue);
  }



  private bookList=new BehaviorSubject<any>([]);
  bookListAccess=this.bookList.asObservable();

  updateBookList(newValue:any){
    this.bookList.next(newValue);
  }


  private cartList=new BehaviorSubject<any>([]);
  currCartList=this.cartList.asObservable();

  updateCartList(newValue:any){
    this.cartList.next(newValue);
  }

  
  private wishList=new BehaviorSubject<any>([]);
  wishListAccess=this.wishList.asObservable();

  updateWishList(newValue:any){
    this.wishList.next(newValue);
  }

  private ordersBehavior=new BehaviorSubject<any>([]);
  ordersAaccess=this.ordersBehavior.asObservable();

  updateOrdersList(newValue:any){
    this.ordersBehavior.next(newValue);
  }

  private placeOrder=new BehaviorSubject<boolean>(true);
  placeOrderAccess=this.placeOrder.asObservable();

  updatePlaceOrder(newValue:boolean){
    this.placeOrder.next(newValue);
  }

  private AddressList=new BehaviorSubject<any>([]);
  AddressListAccess=this.AddressList.asObservable();

  updateAddressList(newVAlue:any){
    this.AddressList.next(newVAlue);
  }

  private searchBook=new BehaviorSubject<string>('');
  searchBookAccess=this.searchBook.asObservable(); 

  updateSearchBook(newVAlue:string){
    this.searchBook.next(newVAlue);
  }

  private orderedNumber=new BehaviorSubject<any>('');
  orderedNumberAccess=this.orderedNumber.asObservable();

  updateOrderNum(newVAlue:any){
    this.orderedNumber.next(newVAlue);
  }


  private Review=new BehaviorSubject<any>([]);
  reviewAccess=this.Review.asObservable();

  updateReview(newValue:any){
    this.Review.next(newValue) 
  }

}
