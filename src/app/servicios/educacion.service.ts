import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  //URL = 'http://localhost:8080/educacion/'; // URL por defecto
  URL = 'https://lqf-backend.onrender.com/educacion/'; // URL por defecto
  constructor(private httpClient: HttpClient) { }

  // -------------------------------Desarrollo de los metodos -------------------------------------------
  // Aqui tare la lista de todo lo que tengas -----------------------------------------------------------
  public lista(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.URL + 'lista');
  }

  // Mandamos por parametro un id en especifico para saber ----------------------------------------------
  public detail(id: number): Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.URL + `detail/${id}`);
  }

  // Creando un objeto  ---------------------------------------------------------------------------------
  public save(educacion: Educacion): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', educacion);
  }

  // Actualizar un registro  ----------------------------------------------------------------------------
  public update(id: number, educacion: Educacion): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, educacion);
  }

  // Aqui borras un registro con un id  ------------------------------------------------------------------
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
