import { MaterialComponentsModule } from './../material-component/material.module';
import { ListsComponent } from '../material-component/products/lists.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';

@NgModule({

  declarations: [StarterComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    MaterialComponentsModule
  ],
})
export class StarterModule {}
