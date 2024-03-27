import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(private dataservices:DataService) { }


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

  price:number=0;

  @Input() ArrayData:any;

  ngOnInit(): void {
    const result= this.dataservices.Books.filter(item=>{

      if(item.id==this.ArrayData.bookId){
        return true;
      }else{
        return false;
      }
    })

    this.book=result[0];
    this.price=this.book.price*this.ArrayData.quantity;
  }

}
