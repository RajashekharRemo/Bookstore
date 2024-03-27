import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/Services/http.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(private fb: FormBuilder, private httpServices:HttpService) {
    this.myForm = this.fb.group(
      {myControl:this.Address}
    );
   }

  myForm: FormGroup;
  originalData: any;

  ngOnInit(): void {
    // this.myForm = this.fb.group(
    //   this.Address
    // );
    // this.originalData = this.myForm.value;
    // console.log(this.originalData);
    // const newObject = Object.create(this.Address);
    // console.log(newObject);
    
    // console.log('new objedct');
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
    // console.log(this.originalData);
    
    // this.Address=this.originalData;
    // this.myForm.patchValue({ myControl: this.originalData });
    
    
  }


  saveChangedAddress(){
    this.edit=!this.edit;
    // this.originalData = this.myForm.value.myControl;
    this.httpServices.updateAddress(this.Address).subscribe(resp=>{
      console.log(resp);
      
    })

  }

  @ViewChild('radio') radio:any;
  @Output() SelectedAddressEmit=new EventEmitter<any>();

  checked(){
    if(this.radio.nativeElement.checked){
      console.log("checked " +this.Address.uName);
      this.SelectedAddressEmit.emit(this.Address)
    }
  }

}
