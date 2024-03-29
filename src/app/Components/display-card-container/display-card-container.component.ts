import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Book } from '../../Model/bookstore.model';
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

  ngOnInit(): void {
    
    this.dataservice.bookListAccess.subscribe(resp=>{
      this.BooksPrint=resp;
      this.bookcount=resp.length
    })

    this.dataservice.searchBookAccess.subscribe(resp=>{
      this.searchString=resp
    })
  }

  searchString='';
  
  page:number=1;
  count:number=0;
  booksize:number=12;

  onTableDataChange(event:any){
    this.page=event;
    this.BooksPrint=this.dataservice.Books;
    this.bookcount=this.BooksPrint.length;
  }

}
