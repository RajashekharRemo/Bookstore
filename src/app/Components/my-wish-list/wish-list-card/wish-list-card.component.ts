import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-wish-list-card',
  templateUrl: './wish-list-card.component.html',
  styleUrls: ['./wish-list-card.component.scss']
})
export class WishListCardComponent implements OnInit {


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

  constructor(private dataservices:DataService, private httpServices:HttpService, private router:Router) { }

  ngOnInit(): void {

    const result= this.dataservices.Books.filter(item=>{

      if(item.id==this.Book.bookId){
        return true;
      }else{
        return false;
      }
    })

    this.book=result[0];

  }

  @Input() Book:any;


  deleteWishListItem(){
    
    this.httpServices.removeWishListItem({uId:localStorage.getItem('id'), bookId:this.book.id}).subscribe(resp=>{
      this.dataservices.WishList=this.dataservices.WishList.filter(e=>{
        if(e.bookId!=this.book.id){
          return true;
        }else{
          return false;
        }
      })

      this.dataservices.updateWishList(this.dataservices.WishList);

    })
  }

  GoToBookDetails(){
    this.router.navigate(['/bookdetails', this.Book.bookId])
  }

}
