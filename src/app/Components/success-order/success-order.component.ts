import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss']
})
export class SuccessOrderComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.orderedNumberAccess.subscribe(resp=>{
      this.OrderNum=resp;
    })
  }

  OrderNum='';

}
