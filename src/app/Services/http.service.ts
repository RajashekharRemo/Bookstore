import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../Model/bookstore.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  userURL="https://localhost:7034/api/User/";
  bookUrl="https://localhost:7034/api/Book/";
  reviewUrl="https://localhost:7034/api/Review/";
  cartUrl='https://localhost:7034/api/Cart/';
  wishListUrl='https://localhost:7034/api/WishList/';
  orderUrl='https://localhost:7034/api/OrderAddress/';
  addressUrl='https://localhost:7034/api/OrderAddress/';

  loginUser(data1:any):Observable<any>{
    return this.http.post( this.userURL+'Login', data1);
  }

  getUser():Observable<any>{
    return this.http.get(this.userURL+`GetUserById?UId=${localStorage.getItem('id')}`);
  }

  updateUser(data:any):Observable<any>{
    return this.http.put(this.userURL+`Update?Id=${localStorage.getItem('id')}`, data)
  }

  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.bookUrl+'GetAllBooks');
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(this.bookUrl+`GetBookById?id=${id}`)
  }

  updateBook(data:any):Observable<any>{
    return this.http.put(this.bookUrl+'UpdateBook', data);
  }

  getReviewsByBookId(bookid:any):Observable<any>{
    return this.http.get(this.reviewUrl+`GetReviewsByBookId?BookId=${bookid}`);
  }

  getAllReviews():Observable<any>{
    return this.http.get(this.reviewUrl+'GetAllReviews');
  }

  addReview(data:any):Observable<any>{
    return this.http.post(this.reviewUrl+'AddReview', data);
  }


  getCartDetails(UId:any):Observable<any>{
    return this.http.get(this.cartUrl+`UserCartDetailsById?UId=${UId}`)
  }

  addToCart(data:any):Observable<any>{
    return this.http.post(this.cartUrl+`AddToCart?UId=${localStorage.getItem('id')}`, data);
  }

  updateCartBookQuantity(data:any):Observable<any>{
    return this.http.put(this.cartUrl+`UpdateCartBookQuantity?Id=${localStorage.getItem('id')}`, data);
  }

  removeCartItem(data:any):Observable<any>{
    return this.http.post(this.cartUrl+'RemoveCartItem', data);
  }

  getWishList(data:any):Observable<any>{
    return this.http.get(this.wishListUrl+`GetWishListByID?UId=${data}`);
  }

  addTowishList(data:any):Observable<any>{
    return this.http.post(this.wishListUrl+'AddToWishList',data);
  }

  removeWishListItem(data:any):Observable<any>{
    return this.http.post(this.wishListUrl+'RemoveWishListItem', data);
  }

  getAllOrders():Observable<any>{
    return this.http.get(this.orderUrl+`GetAllOrders?UId=${localStorage.getItem('id')}`);
  }

  getAllAddress():Observable<any>{
    return this.http.get(this.addressUrl+`GetAddressById?UId=${localStorage.getItem('id')}`);
  }

  updateAddress(data:any):Observable<any>{
    return this.http.put(this.addressUrl+`UpdateUserAddress?UId=${localStorage.getItem('id')}`, data);
  }

  addNewAdderss(data:any):Observable<any>{
    return this.http.post(this.addressUrl+`AddUserAddress?UId=${localStorage.getItem('id')}`, data);
  }

  addOrder(data:any):Observable<any>{
    return this.http.post(this.addressUrl+`AddOrder?UId=${localStorage.getItem('id')}`, data);
  }

}
