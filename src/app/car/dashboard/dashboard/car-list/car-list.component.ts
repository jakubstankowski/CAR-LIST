import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../../../car.model';
import {CarService} from '../../../car.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CarDeleteDialogComponent} from '../../../../material-dialog/car-delete-dialog/car-delete-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {DeleteDoneComponent} from '../../../../material-dialog/delete-done/delete-done.component';





@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {

  cars: Car[] = [];
  private carsSub: Subscription;

  constructor(public carService: CarService, public dialog: MatDialog, public snackBar: MatSnackBar) {}



  onDelete(id) {
    const dialogRef = this.dialog.open(CarDeleteDialogComponent,
      {
        disableClose: true,
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        setTimeout(() => {
          this.carService.deleteCar(id);
          }, 1000);

        setTimeout(() => {
          this.
          snackBar.openFromComponent(DeleteDoneComponent, {
            duration: 1000,
          });
        }, 500);
      }
    });

  }


  ngOnInit() {

    console.log('TO SIĘ WYKONA CAR LIST !@!@#');

    this.carService.showSpinner();
    this.carService.getCars();
    this.carsSub = this.carService.getCarUpdateListener()

      .subscribe((cars: Car[]) => {
        console.log('SUBSCRIBE DONE !@#!');

        this.cars = cars;
        console.log('THIS CARS : ', this.cars);
        console.log('SUBSCIBE CAR : ', cars);
      });
  }

  ngOnDestroy() {
    this.carsSub.unsubscribe();
    console.log('UNSUBSCIBE !@#!@#');

  }




}
