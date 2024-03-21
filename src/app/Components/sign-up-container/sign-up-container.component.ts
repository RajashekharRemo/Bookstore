import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss']
})
export class SignUpContainerComponent implements OnInit {


  ngOnInit(): void {
  }

  password=false;
  toggleEye(){
    this.password=!this.password
  }

  userObj:any={
    fullName:'',
    email:'',
    password:'',
    phone:''
  }

  //userForm:FormGroup;
  constructor(){
    // this.userForm=new FormGroup({
    //   fullName:new FormControl('', [Validators.required, Validators.maxLength(3)]),
    //   email:new FormControl('', [Validators.required, Validators.maxLength(8), Validators.email]),
    //   password:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    //   phone:new FormControl('', [Validators.required, Validators.maxLength(10)])
    // })

    // console.log(this.userForm);
    
  }

  submitForm(){
    console.log(this.userObj);
    
  }

}
