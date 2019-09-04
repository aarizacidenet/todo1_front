import { TransferenciaDTO } from './../../shared/dto/transferenciaDTO';
import { TransaccionesService } from './../../services/transaccionesService';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductoDTO } from '../../shared/dto/productoDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {
  firstFormGroup: FormGroup;
  productInfo: ProductoDTO;
  productoId: string;
  valorTotal = 0;
  cantidad = 0;
  valorUnitario = 0;
  transferenciaGuardar: TransferenciaDTO;
  constructor(private _formBuilder: FormBuilder, public productService: ProductService,
    private router: Router, private route: ActivatedRoute, public transferenciaService: TransaccionesService) { }

  ngOnInit() {
    this.cargarForm();
    this.route.params.subscribe(param =>{
      this.productoId = param.productoId;

      if (param.productoId != null) {
        this.getProductById(this.productoId);
      }
    });
  }

  actualizarValor() {
    if(Number(this.firstFormGroup.get('cantidad').value) > Number(this.productInfo.cantidad)) {
      Swal.fire('ERROR', 'La cantidad a vender no puede ser mayor a la disponible', 'error');
      this.cargarForm();
    }else{
      this.valorTotal = this.valorUnitario * Number(this.firstFormGroup.get('cantidad').value);
      this.cantidad = Number(this.firstFormGroup.get('cantidad').value);
    }

  }
  cargarForm(){
    this.firstFormGroup = this._formBuilder.group({
      producto: new FormControl(this.productInfo ? this.productInfo.name : '', Validators.required),
      cantidad: new FormControl(this.cantidad, Validators.required),
      disponible: new FormControl(this.productInfo ? this.productInfo.cantidad : '', Validators.required),
      unitario: new FormControl(this.productInfo ? this.productInfo.valor : '', Validators.required),
      valor: [this.valorTotal, Validators.required]
    });
  }
  getProductById(productid: string){
    this.productService.getProductById(productid).subscribe(
      response => {
        this.productInfo = response;
        this.valorUnitario = Number(this.productInfo.valor);
        this.cargarForm();
      },
    );
  }

  convertirtransaccionDTO(ventatInformation: FormGroup): TransferenciaDTO{
    const ventaInfo: TransferenciaDTO = {
      id: '',
      cantidad: this.firstFormGroup.get('cantidad').value,
      total: String(this.valorTotal),
      tipo: 'venta',
      productoId: this.productInfo.codigo
    };
    return ventaInfo;
  }

  onGuardar() {
    this.transferenciaGuardar = this.convertirtransaccionDTO(this.firstFormGroup);
    this.transferenciaService.saveTransacciones(this.transferenciaGuardar).subscribe(response => {
        if (response.id) {
          var cantidad = Number(this.productInfo.cantidad) - this.cantidad;
          this.productInfo.cantidad = String(cantidad)
          this.productService.saveProduct(this.productInfo).subscribe( response2 => {
              if(response2.id){
                Swal.fire( 'SUCCESS' ,  'Venta Registrada', 'success' );
                this.router.navigate(['/starter']);
                this.firstFormGroup.reset();
              }else{
                Swal.fire('ERROR', 'Error al generar venta', 'error');
              }
            },
          );
        }else{
          Swal.fire('ERROR', 'Error al generar venta', 'error');
        }
    });
  }
}
