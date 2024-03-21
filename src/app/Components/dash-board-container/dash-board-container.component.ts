import { Component, OnInit } from '@angular/core';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { Book } from '../../Model/bookstore.model';

@Component({
  selector: 'app-dash-board-container',
  templateUrl: './dash-board-container.component.html',
  styleUrls: ['./dash-board-container.component.scss']
})
export class DashBoardContainerComponent implements OnInit {

  constructor(private services:BookstoreService) { }

  BooksPrint:Book[]=[]

  bookcount:number=0;

  ngOnInit(): void {
    // this.services.getAllBooks().subscribe(resp=>{
    //   //console.log(resp);
    //   this.BooksPrint=resp
    //   //console.log(this.BooksPrint.length);
    //   this.bookcount=this.BooksPrint.length;
    // })
  }

}
