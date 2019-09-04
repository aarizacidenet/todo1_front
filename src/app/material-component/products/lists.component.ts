import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { ProductService } from './../../services/productService';
import { ProductoDTO } from './../../shared/dto/productoDTO';
import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})

export class ListsComponent {
  products: ProductoDTO[]= [];
  displayedColumns: string[] = ['codigo', 'nombre', 'referencia', 'valor', 'tipo','stock','buttons'];
  dataSource = new MatTableDataSource<ProductoDTO>();
  @ViewChild(MatPaginator, {read: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {read: false}) sort: MatSort;

  constructor(public productService:ProductService, private router: Router){
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit () {
    this.cargarProdcutos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(producto: string){
    if (producto == null) {
      Swal.fire('ERROR', "Debes seleccionar un Producto para eliminar", 'error');
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "No puedes revertir esto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
      }).then((result) => {
        if (result.value) {
          this.productService.deleteProduct(producto).subscribe(
            response => {
              Swal.fire( 'SUCCESS' ,  'Producto eliminado', 'success' );
              this.cargarProdcutos();
            },
          );
        }
      }
             )
    }

  }

  cargarProdcutos(){
    this.productService.getProducts().subscribe(
      response => {
          this.products = response;
          this.dataSource.data = response;
      },
    );
  }
}
