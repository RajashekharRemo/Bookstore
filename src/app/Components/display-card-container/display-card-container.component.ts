import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { Book } from '../../Model/bookstore.model';
import { StoreListService } from '../../Bookstore/store-list.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-display-card-container',
  templateUrl: './display-card-container.component.html',
  styleUrls: ['./display-card-container.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DisplayCardContainerComponent implements OnInit {

  constructor( private dataservice:DataService) { }

  BooksPrint:Book[]=[]

  bookcount:number=0;

  page:number=1;
  count:number=0;
  booksize:number=12;


  ngOnInit(): void {
    debugger
      setTimeout(()=>{
          this.BooksPrint=this.dataservice.getBookData();
          this.bookcount=this.BooksPrint.length;
      }, 100)
  }



  // postDetails(){
  //   this.services.getAllBooks().subscribe(resp=>{
  //     //console.log(resp);
  //     this.BooksPrint=resp
  //     console.log(this.BooksPrint);
  //     this.bookcount=this.BooksPrint.length;
  //     this.dataservice.Books=resp;
  //   })
  // }

  onTableDataChange(event:any){
    this.page=event;
    this.BooksPrint=this.dataservice.Books;
    this.bookcount=this.BooksPrint.length;
  }

}
