import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/Services/http.service';

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
  constructor(private httpservices:HttpService){
    // this.userForm=new FormGroup({
    //   fullName:new FormControl('', [Validators.required, Validators.maxLength(3)]),
    //   email:new FormControl('', [Validators.required, Validators.maxLength(8), Validators.email]),
    //   password:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    //   phone:new FormControl('', [Validators.required, Validators.maxLength(10)])
    // })

    // console.log(this.userForm);
    
  }

  submitForm(){
    //console.log(this.userObj);
    this.httpservices.createUser(this.userObj).subscribe(resp=>{
      //console.log(resp);
      alert('Created Successfylly, Please Login..')
      this.userObj.email='';
      this.userObj.fullName='';
      this.userObj.password='';
      this.userObj.phone='';
    })
  }

}
