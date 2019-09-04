import { ProductoDTO } from './../shared/dto/productoDTO';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: "root"
})

export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };

  basePath = `${environment.api}productos`;

  getProducts(): Observable<any> {
    return this.httpClient.get<ProductoDTO[]>(`${this.basePath}/all`);
  }

  getProductById(productId: string): Observable<any> {
    return this.httpClient.get<ProductoDTO[]>(`${this.basePath}/${productId}`);
  }
  saveProduct(productDTO: ProductoDTO): Observable<any> {
    return this.httpClient.post<ProductoDTO[]>(`${this.basePath}/addproducto`, productDTO, this.httpOptions);
  }

  editProspect(prospectDTO:ProductoDTO): Observable<any> {
    return this.httpClient.post<ProductoDTO[]>(`${this.basePath}/updateproducto`, prospectDTO, this.httpOptions);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete<ProductoDTO[]>(`${this.basePath}/delete/${productId}`);
  }
}
