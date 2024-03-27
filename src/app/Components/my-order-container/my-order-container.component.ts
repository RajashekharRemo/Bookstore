import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/Model/bookstore.model';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-my-order-container',
  templateUrl: './my-order-container.component.html',
  styleUrls: ['./my-order-container.component.scss']
})
export class MyOrderContainerComponent implements OnInit {

  constructor(private dataServices:DataService, private httpServices:HttpService) { }

  ngOnInit(): void {

    this.httpServices.getAllOrders().subscribe(resp=>{
      this.Orders=resp.reverse();
      if(resp.length>2){
        this.forFooterCss=true
      }
    })

    // this.dataServices.ordersAaccess.subscribe(resp=>{
    //   this.Orders=resp;
    //   if(resp.length>2){
    //     this.forFooterCss=true
    //   }
    // })
    
  }

  forFooterCss=false;

  Orders:Orders[]=[];

}
