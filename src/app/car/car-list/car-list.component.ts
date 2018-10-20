import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CarAddComponent} from '../car-add/car-add.component';
import {CarDeleteDialogComponent} from '../../material-dialog/car-delete-dialog/car-delete-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';





@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {

  cars: Car[] = [];
  private carsSub: Subscription;

  constructor(public carService: CarService, public dialog: MatDialog, private  spinner: NgxSpinnerService) {}

  onDelete(id){

    const dialogRef = this.dialog.open(CarDeleteDialogComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true){

        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.carService.deleteCar(id);
          }, 1000);

      }

    });

  }


  ngOnInit() {
   /* this.cars = this.carService.getCars();*/

    this.carService.getCars();
    this.carsSub = this.carService.getCarUpdateListener()
      .subscribe((cars: Car[]) => {
        console.log('SUBSCRIBE DONE !@#!');

        this.cars= cars;
        console.log('SUBSCIBE CAR : ', cars);
      });
  }

  ngOnDestroy(){
    this.carsSub.unsubscribe();
    console.log('UNSUBSCIBE !@#!@#');

  }




}
