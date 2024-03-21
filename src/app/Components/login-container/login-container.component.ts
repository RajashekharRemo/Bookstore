import { Component, OnInit } from '@angular/core';
import { BookstoreService } from '../../Bookstore/bookstore.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private services : BookstoreService) { }

  ngOnInit(): void {
  }

  password=false;
  toggleEye(){
    this.password=!this.password
  }

  loginObj:any={
    email : '',
    password : ''
  }

  login(){
    debugger;
    this.services.loginUser(this.loginObj).subscribe(resp=>{
      //console.log(resp);
      if(resp.result){
        alert("Login Success");
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem('id', resp.data.id);
        localStorage.setItem('fullName',resp.data.fullName);
        localStorage.setItem('email', resp.data.email);
      }
      
    }, (err:HttpErrorResponse)=>{
      console.log(err);
      
    })
  }


}
