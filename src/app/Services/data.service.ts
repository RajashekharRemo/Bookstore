import { Injectable } from '@angular/core';
import { AddToCart, Book, Review } from '../Model/bookstore.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  Books:Book[]=[];
  Reviews:Review[]=[];
  AddToCart:AddToCart[]=[];
  ActualCart:AddToCart[]=[];

  routeBookId:any=''

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
  private sharedValueSubject = new BehaviorSubject<any>('');
  public  sharedValue$ = this.sharedValueSubject.asObservable();

  updateSharedValue(newValue: any) {
      this.sharedValueSubject.next(newValue);
  }


  private loginUserName=new BehaviorSubject<any>('Profile');
  public loginUserForHeader=this.loginUserName.asObservable();

  updateNameForHeader(newValue:any){
    this.loginUserName.next(newValue);
  }


  private cartList=new BehaviorSubject<any>([]);
  currCartList=this.cartList.asObservable();

  updateCartList(newValue:any){
    this.cartList.next(newValue);
  }


}
