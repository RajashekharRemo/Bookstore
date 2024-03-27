import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dataServices:DataService) { }

  ngOnInit(): void {
    
  }

  toDoList(){
    let cartLength=0
    this.dataServices.currCartList.subscribe(resp=>{
      cartLength=resp.length;
    })

    let wishListLength=0
    this.dataServices.wishListAccess.subscribe(resp=>{
      wishListLength=resp.length;
    })

    


  }

  year=new Date().getFullYear();

}
