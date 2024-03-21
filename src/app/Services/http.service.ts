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
  reviewUrl="https://localhost:7034/api/Review/"

  loginUser(data1:any):Observable<any>{
    return this.http.post( this.userURL+'Login', data1);
  }

  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.bookUrl+'GetAllBooks');
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(this.bookUrl+`GetBookById?id=${id}`)
  }

  getReviewsByBookId(bookid:any):Observable<any>{
    return this.http.get(this.reviewUrl+`GetReviewsByBookId?BookId=${bookid}`);
  }

//==============================================
  private sharedValueSubject = new BehaviorSubject<any>('');
  public  sharedValue$ = this.sharedValueSubject.asObservable();

  updateSharedValue(newValue: any) {
      this.sharedValueSubject.next(newValue);
  }

}
