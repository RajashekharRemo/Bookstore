import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private httpservices:HttpService, private dataServices:DataService) { }

  ngOnInit(): void {
    this.dataServices.sharedValue$.subscribe((value) => {
      // Update your component's view with the new value
      console.log( value.length);
  });
  }

}
