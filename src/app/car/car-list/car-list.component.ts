import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {

  cars: Car[] = [];
  private carsSub: Subscription;

  constructor(public carService: CarService) {

  }



  ngOnInit() {
    this.cars = this.carService.getCars();
    this.carsSub = this.carService.getCarUpdateListener()
      .subscribe((cars: Car[]) => {
        this.cars= cars;
      });
  }

  ngOnDestroy(){
    this.carsSub.unsubscribe();

  }




}
