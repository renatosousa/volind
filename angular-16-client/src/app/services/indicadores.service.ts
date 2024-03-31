import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private apiUrl = environment.api;
  public listaDeIndicadores: any[] = [];

  constructor(private http: HttpClient) { }

  retornarListaDeIndicadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"indicadores");
  }

  retornaIndicadoresAplicados(id: any) {
    return this.http.get<any[]>(this.apiUrl+"indicador/"+ id);
  }

  aplicarIndicador(indicador: any) {
    return this.http.post<any[]>(this.apiUrl+"aplicar", indicador);
  }


}
