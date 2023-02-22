import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  //URL = 'http://localhost:8080/proyectos/';
  URL = 'https://lqf-backend.onrender.com/proyectos/';

  constructor(private httpClient: HttpClient) { }
  // -------------------------------Desarrollo de los metodos -------------------------------------------
  // Aqui tare la lista de todo lo que tengas -----------------------------------------------------------
  public lista(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(this.URL + 'lista');
  }
  
  // Mandamos por parametro un id en especifico para saber ----------------------------------------------
  public detail(id: number): Observable<Proyectos>{
    return this.httpClient.get<Proyectos>(this.URL + `detail/${id}`);
  }

  // Creando un objeto  ---------------------------------------------------------------------------------
  public save(proyectos: Proyectos): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', proyectos);
  }

  // Actualizar un registro  ----------------------------------------------------------------------------
  public update(id: number, proyectos: Proyectos): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, proyectos);
  }

  // Aqui borras un registro con un id  ------------------------------------------------------------------
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
