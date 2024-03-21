
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-login-sign-up-container',
  templateUrl: './login-sign-up-container.component.html',
  styleUrls: ['./login-sign-up-container.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoginSignUpContainerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginSignUpContainerComponent>,private services:HttpService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  login=true;

  goToSignUp(){
    this.login=false;
  }

  goToLogin(){
    this.login=true
  }

}
