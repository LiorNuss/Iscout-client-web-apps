import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {ChartModule} from "primeng/chart";
import {AdminGuardService} from "./admin-guard.service";

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [AdminComponent],
  exports: [AdminComponent],
  providers: [AdminGuardService]
})
export class AdminModule { }
