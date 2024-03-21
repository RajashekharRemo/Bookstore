import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private httpservices:HttpService,private dataservices: DataService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //debugger;
    this.postDetails();
  }

  notification:number=0;

  postDetails(){
    this.httpservices.getAllBooks().subscribe(resp=>{
      this.dataservices.Books=resp;
       //console.log(this.dataservices.Books);
      // console.log("from header");
    })

    this.httpservices.sharedValue$.subscribe((value) => {
      // Update your component's view with the new value
      console.log( value.length);
      this.notification=value.length;
    });
    
  }

  

  goToCart(){
    if(this.dataservices.AddToCart.length>0 && this.dataservices.routeBookId){
      //console.log(this.activatedRoute.snapshot.params);
      this.notification=this.dataservices.AddToCart.length;
      this.router.navigate(['/cart', this.dataservices.routeBookId]);
    }
  }

  openDialog=true;
  callUser(){
    this.openDialog=!this.openDialog
  }


}
