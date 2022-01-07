import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsRoutingModule } from './cards-routing.module';
import { ListsComponent } from './lists/lists.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListsComponent,
    CardPopupComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    CardsRoutingModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class CardsModule { }
