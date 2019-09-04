import { ListsComponent } from './products/lists.component';
import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';;
import { ComprasComponent } from './compras/compras.component';
import { HistoricoComponent } from './historico/historico.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { CrearCompraComponent } from './crear-compra/crear-compra.component';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatSelectModule
  ],
  providers: [],
  declarations: [
    ComprasComponent,
    HistoricoComponent,
    CrearProductoComponent,
    CrearCompraComponent,
    CrearVentaComponent,
    ListsComponent
  ],
  exports:[
    ComprasComponent,
    HistoricoComponent,
    CrearProductoComponent,
    CrearCompraComponent,
    CrearVentaComponent,
    ListsComponent
  ]
})
export class MaterialComponentsModule {}
