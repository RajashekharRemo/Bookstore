import { Component, OnInit } from '@angular/core';
import { LoginSignUpContainerComponent } from '../login-sign-up-container/login-sign-up-container.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }

  login(){
    const dialogRef=this.matDialog.open(LoginSignUpContainerComponent, {width:'740px',height:'475px'});
      dialogRef.afterClosed().subscribe(resp => {
        console.log('The dialog was closed . if name problem come check here');
        // if(localStorage.getItem('fullName')){
        //   this.userName=localStorage.getItem('fullName')
        // }
      })
  }

}
