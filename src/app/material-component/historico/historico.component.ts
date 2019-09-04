import { Router } from '@angular/router';
import { TransferenciaDTO } from './../../shared/dto/transferenciaDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TransaccionesService } from '../../services/transaccionesService';




@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  transacciones: TransferenciaDTO;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<TransferenciaDTO>();
  @ViewChild(MatPaginator, {read: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {read: false}) sort: MatSort;

  constructor(public transaccionesService:TransaccionesService, private router: Router){
  }

  ngOnInit() {
    this.cargarMovimientos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarMovimientos(){
    this.transaccionesService.getTransacciones().subscribe(
      response => {
          this.transacciones = response;
          this.dataSource.data = response;
      },
    );
  }
}
