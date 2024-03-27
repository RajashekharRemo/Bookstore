import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  isEditMode = false;

  toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
      this.isEditMode = false;
     
  }

}
