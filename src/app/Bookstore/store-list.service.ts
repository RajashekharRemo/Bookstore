import { Injectable } from '@angular/core';
import { Book, Review } from '../Model/bookstore.model';

@Injectable({
  providedIn: 'root'
})
export class StoreListService {

  constructor() { }

  Books:Book[]=[];
  Reviews:Review[]=[]

}
