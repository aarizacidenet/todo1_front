import { TransferenciaDTO } from './../shared/dto/transferenciaDTO';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: "root"
})

export class TransaccionesService {

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };

  basePath = `${environment.api}transacciones`;

  getTransacciones(): Observable<any> {
    return this.httpClient.get<TransferenciaDTO[]>(`${this.basePath}/all`);
  }

  saveTransacciones(transferenciaDTO: TransferenciaDTO): Observable<any> {
    return this.httpClient.post<TransferenciaDTO[]>(`${this.basePath}/add`, transferenciaDTO, this.httpOptions);
  }

}
