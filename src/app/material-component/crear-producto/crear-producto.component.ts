import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/productService';
import { ProductoDTO } from './../../shared/dto/productoDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
export interface Referencia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  firstFormGroup: FormGroup;
  referencia = 'sin referencia';
  tipo = 'sin tipo';
  productInfo: ProductoDTO;
  productId: string;
  productGuardar: ProductoDTO;
  constructor(private _formBuilder: FormBuilder, public productService: ProductService,
     private router: Router, private route: ActivatedRoute) {
      this.productInfo = {
        id: '',
        name: '',
        referencia: '',
        descripcion: '',
        detalle: '',
        cantidad: '',
        valor: '',
        codigo: '',
        tipo: ''
      };
   }
  referencias: Referencia[] = [
    {value: 'Vaso', viewValue: 'Vaso'},
    {value: 'comic', viewValue: 'comic'},
    {value: 'camiseta', viewValue: 'camiseta'}
  ];

  tipos: Referencia[] = [
    {value: 'DC', viewValue: 'DC'},
    {value: 'MARVEL', viewValue: 'MARVEL'},
    {value: 'PROPIO', viewValue: 'PROPIO'}
  ];

  ngOnInit() {
    this.cargarForm();
    this.route.params.subscribe(param =>{
      this.productId = param.productId;

      if(param.productId!=null){
        this.getProductById(this.productId);
      }
    });


  }

  cargarForm(){
    this.firstFormGroup = this._formBuilder.group({
      nombre: new FormControl(this.productInfo ? this.productInfo.descripcion : '', Validators.required),
      descripcion: new FormControl(this.productInfo ? this.productInfo.descripcion : '', Validators.required),
      detalle: new FormControl(this.productInfo ? this.productInfo.detalle : '', Validators.required),
      referencia: new FormControl(this.productInfo ? this.productInfo.referencia : ''),
      valor: new FormControl(this.productInfo ? this.productInfo.valor : '', Validators.required),
      cantidad: new FormControl(this.productInfo ? this.productInfo.cantidad : '', Validators.required),
      codigo: new FormControl(this.productInfo ? this.productInfo.codigo : '', Validators.required),
      tipo: new FormControl(this.productInfo ? this.productInfo.tipo : '')
    });
  }
  onGuardar(){
    this.productGuardar = this.convertirProductDTO(this.firstFormGroup);
    this.productService.saveProduct(this.productGuardar).subscribe(
      response => {
        if(response.id){
          Swal.fire( 'SUCCESS' ,  'Producto creado', 'success' );
          this.router.navigate(['/starter']);
          this.firstFormGroup.reset();
        }else{
          Swal.fire('ERROR', response.message, 'error');
        }
      },
    );
  }

  getProductById(productid: string){
    this.productService.getProductById(productid).subscribe(
      response => {
        this.productInfo = response;
        this.tipo = this.productInfo.tipo;
        this.referencia= this.productInfo.referencia;
        this.cargarForm();
      },
    );
  }

  convertirProductDTO(productInformation: FormGroup): ProductoDTO{
    const productInfo: ProductoDTO = {
      id: this.productInfo ? this.productInfo.id: "",
      name:productInformation.get('nombre').value,
      referencia: this.referencia,
      descripcion: productInformation.get('descripcion').value,
      detalle:productInformation.get('detalle').value,
      cantidad:productInformation.get('cantidad').value,
      valor:productInformation.get('valor').value,
      codigo:productInformation.get('codigo').value,
      tipo:this.tipo
    };

    return productInfo;
  }
}
