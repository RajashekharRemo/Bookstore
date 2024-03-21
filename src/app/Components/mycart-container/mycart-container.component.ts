import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-mycart-container',
  templateUrl: './mycart-container.component.html',
  styleUrls: ['./mycart-container.component.scss']
})
export class MycartContainerComponent implements OnInit {

  constructor(private matDialog:MatDialog, private activatedRoute:ActivatedRoute, private datasource:DataService) { }


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
  id:any;

  price:number=0;

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params;
    console.log(this.id.id);

    setTimeout(()=>{
      const result= this.datasource.Books.filter(item=>{
        if(item.id==this.id.id){
          return true;
        }else{
         return false;
        }
      })
  
      this.book=result[0];
      this.price=this.book.price

     }, 100)

  }


  count=1;
  increament(){
    this.count+=1;
    this.price=this.book.price*this.count;
  }

  decreament(){
    if(this.count>0){
      this.count-=1;
      this.price=this.book.price*this.count;
    }
  }


  bookOrder(){
    if(localStorage.getItem('token')){

    }else{
      console.log("token not found");
      const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        console.log('The dialog was closed');
      })
      
    }

  }

}
