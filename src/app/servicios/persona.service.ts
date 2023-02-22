import { HttpClient } from '@angular/common/http';
//Angular usa Obserbable para hacer las peticiones asincronas.
// Podemos definir eventos que se envian al componente hijo y a su vez se lo pasa al componente padre
// Usa el observable es usado por el common para manejar las peticiones

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  //URL='http://localhost:8080/personas/';
  URL='https://lqf-backend.onrender.com/personas/';

  constructor(private httpClient: HttpClient) {}
  // -------------------------------Desarrollo de los metodos -------------------------------------------
  // Aqui tare la lista de todo lo que tengas -----------------------------------------------------------
  public lista(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.URL + 'lista');
  }

  // Mandamos por parametro un id en especifico para saber ----------------------------------------------
  public detail(id: number): Observable<Persona>{
    return this.httpClient.get<Persona>(this.URL + `detail/${id}`);
  }

  // Actualizar un registro  ----------------------------------------------------------------------------
  public update(id: number, persona: Persona): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, persona);
  }
}
