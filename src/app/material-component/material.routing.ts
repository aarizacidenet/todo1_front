import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { CrearCompraComponent } from './crear-compra/crear-compra.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { HistoricoComponent } from './historico/historico.component';
import { ComprasComponent } from './compras/compras.component';
import { Routes } from '@angular/router';
import { ListsComponent } from './products/lists.component';


export const MaterialRoutes: Routes = [
  {
    path: 'historico',
    component: HistoricoComponent
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent
  },
  {
    path: 'editar-producto/:productId',
    component: CrearProductoComponent
  },
  {
    path: 'registrar-compra/:productoId',
    component: CrearCompraComponent
  },
  {
    path: 'registrar-venta/:productoId',
    component: CrearVentaComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  }
];
