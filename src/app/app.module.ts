import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {  ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { HeaderComponent } from './car/dashboard/header/header.component';
import { CarListComponent } from './car/dashboard/dashboard/car-list/car-list.component';
import { CarAddComponent } from './car/dashboard/dashboard/car-add/car-add.component';
import { CarViewComponent } from './car/dashboard/dashboard/car-view/car-view.component';
import { CarDeleteDialogComponent } from './material-dialog/car-delete-dialog/car-delete-dialog.component';
import { DeleteDoneComponent } from './material-dialog/delete-done/delete-done.component';
import { AddDoneComponent } from './material-dialog/add-done/add-done.component';
import { EditDoneComponent } from './material-dialog/edit-done/edit-done.component';



const appRoutes: Routes = [


  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'dashboard', component: CarListComponent},
  {path:'dashboard/add', component: CarAddComponent},
  {path:'dashboard/edit/:carId', component: CarAddComponent},
  {path:'dashboard/car/:carId', component: CarViewComponent}


  /*{path:'wep', component: WepComponent, canActivate:[AuthGuard]}*/
];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarListComponent,
    CarAddComponent,
    CarViewComponent,
    CarDeleteDialogComponent,
    DeleteDoneComponent,
    AddDoneComponent,
    EditDoneComponent  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxSpinnerModule,
    ScrollDispatchModule,
    MatSnackBarModule
  ],

  entryComponents: [
    CarDeleteDialogComponent,
    DeleteDoneComponent,
    AddDoneComponent,
    EditDoneComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
