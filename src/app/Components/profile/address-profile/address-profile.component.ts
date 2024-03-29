import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-address-profile',
  templateUrl: './address-profile.component.html',
  styleUrls: ['./address-profile.component.scss']
})
export class AddressProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private httpServices:HttpService, private dataServices: DataService) {
    this.myForm = this.fb.group(
      {myControl:this.Address}
    );
   }

  myForm: FormGroup;
  originalData: any;

  ngOnInit(): void {
     this.originalData={...this.Address};
    
  }


  edit=false;
  accessEdit(){
    this.edit=!this.edit;
  }

  
  @Input() Address:any;
  @Input() index:any;

  cancelChangeAddress(){
    this.edit=!this.edit;
  }

  @ViewChild('ChangeType') ChangeType:any;

  saveChangedAddress(){
    this.edit=!this.edit;
    
    console.log(this.ChangeType.nativeElement.value);
    this.Address.addressType=this.ChangeType.nativeElement.value;
    
    

    this.httpServices.updateAddress(this.Address).subscribe(resp=>{
      //console.log(resp);
      this.dataServices.Address[this.index].addressType=this.ChangeType.nativeElement.value;
      this.dataServices.Address[this.index].city=this.Address.city;
      this.dataServices.Address[this.index].state=this.Address.state;
      this.dataServices.Address[this.index].uAddress=this.Address.uAddress;
      //this.dataServices.Address[this.index].
      this.dataServices.updateAddressList(this.dataServices.Address);

    })

  }
}
