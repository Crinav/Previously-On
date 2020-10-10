import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SerieDetailsPageRoutingModule } from './serie-details-routing.module';

import { SerieDetailsPage } from './serie-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SerieDetailsPageRoutingModule
  ],
  declarations: [SerieDetailsPage]
})
export class SerieDetailsPageModule {}
