import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {ChartModule} from "primeng/chart";

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
