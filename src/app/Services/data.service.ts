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


}
