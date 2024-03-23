import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private httpservices:HttpService,private dataservices: DataService, private router:Router,private activatedRoute:ActivatedRoute
    , private matDialog:MatDialog) { }


  userName:any='Profile';
  ngOnInit(): void {
    //debugger;
    this.postDetails();
    if(localStorage.getItem('token')){
      this.userName=localStorage.getItem('fullName')
    }
  }

  notification:number=0;

  postDetails(){
    this.httpservices.getAllBooks().subscribe(resp=>{
      this.dataservices.Books=resp;
       //console.log(this.dataservices.Books);
      // console.log("from header");
    })

    this.dataservices.sharedValue$.subscribe((value) => {
      // Update your component's view with the new value
      //console.log( value.length);
      this.notification=value.length;
    });

    this.dataservices.loginUserForHeader.subscribe(value=>{
      this.userName=value;
    })


    if(localStorage.getItem('id')){
      this.httpservices.getCartDetails(localStorage.getItem('id')).subscribe(resp=>{
        //console.log(resp);
        for(let i=0; i<resp.data.length;i++){
          this.dataservices.AddToCart.unshift({bookId :resp.data[i].id, quantity:resp.data[i].quantity})
          this.dataservices.ActualCart.unshift({bookId :resp.data[i].id, quantity:resp.data[i].quantity})
        }
        //console.log(this.dataservices.AddToCart);
        this.notification=this.dataservices.AddToCart.length;
        this.dataservices.updateSharedValue(this.dataservices.AddToCart);
      })
    }
    
  }

  

  goToCart(){
    // if(this.dataservices.AddToCart.length>0 && this.dataservices.routeBookId){
    //   //console.log(this.activatedRoute.snapshot.params);
    //   this.notification=this.dataservices.AddToCart.length;
    //   this.router.navigate(['/cart']);
    // }else if(this.dataservices.AddToCart.length>0){
    //   this.router.navigate(['/cart']);
    // }

    this.router.navigate(['/cart']);
  }

  openDialog=false;
  openList=false;
  callOpenDialog(){
    if(localStorage.getItem('token')){
      this.openList=!this.openList;

    }else{
      this.openDialog=!this.openDialog
    }
  }



  login(){
    const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        console.log('The dialog was closed . if name problem come check here');
        // if(localStorage.getItem('fullName')){
        //   this.userName=localStorage.getItem('fullName')
        // }
      })
      this.openDialog=!this.openDialog
  }

  logout(){
    debugger
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('fullName')
    localStorage.removeItem('email')
    this.openList=!this.openList;
    this.dataservices.updateNameForHeader('profile');
    this.dataservices.AddToCart=[];
    this.dataservices.updateSharedValue(this.dataservices.AddToCart);
    this.router.navigateByUrl('/cards');
  }

}
