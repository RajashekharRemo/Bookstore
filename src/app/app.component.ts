import { Component, HostListener, OnDestroy } from '@angular/core';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookStore';

  constructor(private dataServices:DataService){}

  // ngOnDestroy(): void {
  //   debugger
  //   if(localStorage.getItem('token')==null && this.dataServices.AddToCart.length>0){
  //     if(confirm('please login to save your cart otherwise you loose your cart items')){

  //     }
  //   }
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   debugger
  //   // Perform your action here (e.g., save data, show a confirmation message)
  //   console.log('Performing action before page refresh...');
  //   // You can also return a custom message to display to the user
  //   $event.returnValue = true;

  //   if(localStorage.getItem('token')==null && this.dataServices.AddToCart.length>0){
  //     if(confirm('please login to save your cart otherwise you loose your cart items')){

  //     }
  //   }
  // }

}
