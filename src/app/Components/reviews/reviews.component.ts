import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor() { }

  @Input() review:any;

  initials:any='';

  ngOnInit(): void {
    const fullName = this.review.fullName;
    const names = fullName.split(' ');
    this.initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      this.initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    //console.log(this.initials); // Output: "FML"
  }



  stars=[1,2,3,4,5]

  givenRating(){
    debugger

  }

}
