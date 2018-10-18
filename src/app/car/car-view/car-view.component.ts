import { Component, OnInit } from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  showNumber = false;
  hideButton = false;

  constructor(public carService: CarService) {
    console.log('CARS : ', carService.cars);
  }





  showTelephone(){
    this.showNumber = true;
    this.hideButton = true;
  }




  ngOnInit() {
  }

}
