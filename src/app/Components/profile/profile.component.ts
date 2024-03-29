import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/Model/bookstore.model';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dataservice:DataService, private httpServices:HttpService) { }

  ngOnInit(): void {
    this.dataservice.AddressListAccess.subscribe(data=>{
      this.AllAddressOfUser=data;
    })

    this.httpServices.getUser().subscribe(resp=>{
      this.User=resp.data;
    })

  }

  User:any;
  AllAddressOfUser:Address[]=[]

  isEditMode = false;

  toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
      this.isEditMode = false;
  }

  updateUser={
    fullName:'',
    email:'',
    phone:''
  }

  saveUserUpdatedDetails(){
    this.isEditMode = false;
    this.updateUser.fullName=this.User.fullName;
    this.updateUser.email=this.User.email;
    this.updateUser.phone=this.User.phone;
    this.httpServices.updateUser(this.updateUser).subscribe(resp=>{
      
    })
  }

}
