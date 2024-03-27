import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Model/bookstore.model';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-my-wish-list',
  templateUrl: './my-wish-list.component.html',
  styleUrls: ['./my-wish-list.component.scss']
})
export class MyWishListComponent implements OnInit {

  constructor(private dataServices:DataService) { }

  ngOnInit(): void {
    
    this.dataServices.wishListAccess.subscribe(resp=>{
      this.WishList=resp
      if(resp.length>2){
        this.forFooterCss=true;
      }
    })
  }

  forFooterCss=false;

  WishList=[]

}
