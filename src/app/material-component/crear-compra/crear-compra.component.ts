import { TransferenciaDTO } from './../../shared/dto/transferenciaDTO';
import { TransaccionesService } from './../../services/transaccionesService';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductoDTO } from '../../shared/dto/productoDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-compra',
  templateUrl: './crear-compra.component.html',
  styleUrls: ['./crear-compra.component.css']
})

export class CrearCompraComponent implements OnInit {
  firstFormGroup: FormGroup;
  productInfo: ProductoDTO;
  productoId: string;
  cantidad = 0;
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
    if(Number(this.firstFormGroup.get('cantidad').value) <= 0) {
      Swal.fire('ERROR', 'La cantidad a comprar no puede ser menor o igual a 0', 'error');
      this.cargarForm();
    }else{
      this.cantidad = Number(this.firstFormGroup.get('cantidad').value);
    }

  }
  cargarForm(){
    this.firstFormGroup = this._formBuilder.group({
      producto: new FormControl(this.productInfo ? this.productInfo.name : '', Validators.required),
      cantidad: new FormControl(this.cantidad, Validators.required),
      disponible: new FormControl(this.productInfo ? this.productInfo.cantidad : '', Validators.required),
      unitario: new FormControl(this.productInfo ? this.productInfo.valor : '', Validators.required)
    });
  }
  getProductById(productid: string){
    this.productService.getProductById(productid).subscribe(
      response => {
        this.productInfo = response;
        this.cargarForm();
      },
    );
  }

  convertirtransaccionDTO(ventatInformation: FormGroup): TransferenciaDTO{
    const ventaInfo: TransferenciaDTO = {
      id: '',
      cantidad: this.firstFormGroup.get('cantidad').value,
      total: String(Number(this.firstFormGroup.get('cantidad').value) * Number(this.firstFormGroup.get('unitario').value)),
      tipo: 'compra',
      productoId: this.productInfo.codigo
    };
    return ventaInfo;
  }

  onGuardar() {
    this.transferenciaGuardar = this.convertirtransaccionDTO(this.firstFormGroup);
    this.transferenciaService.saveTransacciones(this.transferenciaGuardar).subscribe(response => {
        if (response.id) {
          var cantidad = Number(this.productInfo.cantidad) + Number(this.firstFormGroup.get('cantidad').value);
          this.productInfo.cantidad = String(cantidad);
          this.productInfo.valor = this.firstFormGroup.get('unitario').value;
          this.productService.saveProduct(this.productInfo).subscribe( response2 => {
              if(response2.id){
                Swal.fire( 'SUCCESS' ,  'Compra Registrada', 'success' );
                this.router.navigate(['/starter']);
                this.firstFormGroup.reset();
              }else{
                Swal.fire('ERROR', 'Error al registrar compra', 'error');
              }
            },
          );
        }else{
          Swal.fire('ERROR', 'Error al registrar compra', 'error');
        }
    });
  }
}
