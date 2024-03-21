import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { Review } from '../../Model/bookstore.model';
import { StoreListService } from '../../Bookstore/store-list.service';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  id:any;

  constructor(private activatedRoute:ActivatedRoute, private services:BookstoreService, private datasource:DataService, private httpservices:HttpService) {
    //this.id=+activatedRoute.snapshot.params.id;
   
  }

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

  ReviewsPrint:Review[]=[];

  wordLimit:number=220;
  showmore=false;

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params;
    console.log(this.id.id);
    // this.services.getBookById(this.id.id).subscribe(resp=>{
    //     //console.log(resp.data);
        
    //   this.book=resp.data;
    // })


    setTimeout(()=>{
      const result= this.datasource.Books.filter(item=>{
        if(item.id==this.id.id){
          return true;
        }else{
         return false;
        }
      })
  
      this.book=result[0];
  
      this.services.getReviewsByBookId(this.id.id).subscribe(resp=>{
        //console.log(resp);
      
        this.ReviewsPrint=resp
      })
    }, 100)

  }



  count=1;

  accessCount=true;
  accessCountFunction(){
    this.accessCount=!this.accessCount;
    this.datasource.AddToCart.push({ bookId: this.id.id, quantity: this.count })
    this.datasource.routeBookId=this.id.id;
    
    console.log(this.datasource.AddToCart);
    this.httpservices.updateSharedValue(this.datasource.AddToCart);
  }

  
  increament(){
    this.count+=1;
  }

  decreament(){
    if(this.count>0){
      this.count-=1
    }
  }

  showMoreDescription(){
    this.showmore=!this.showmore;
  }


  stars=[1,2,3,4,5]
  alreadyGivenRating:number=0;
  presentGivingRating:number=0;

  updateRating(num:number){
    debugger
    this.presentGivingRating=num;
  }

}
