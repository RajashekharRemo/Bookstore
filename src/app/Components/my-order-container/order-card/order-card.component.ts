import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //console.log(this.Order);
    this.OrderDate=this.OrderMonths[+this.Order.orderDate.substring(3, 5)-1]+' '+ this.Order.orderDate.substring(0, 2)
    //console.log(this.OrderDate);
    
  }

  @Input() Order:any;
  OrderDate='';
  OrderMonths=['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

}
