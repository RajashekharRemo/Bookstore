import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Model/bookstore.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private router:Router) { }

  @Input() Book:any;

  ngOnInit(): void {}

  goToBookDetails(){
    this.router.navigate(['/bookdetails', this.Book.id])
  }

}
