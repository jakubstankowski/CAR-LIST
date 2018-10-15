import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  showNumber = false;
  hideButton = false;
  constructor() { }


  showTelephone(){
    this.showNumber = true;
    this.hideButton = true;

  }

  ngOnInit() {
  }

}
