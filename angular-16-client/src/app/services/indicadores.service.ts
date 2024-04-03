import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Indicator } from "../models/indicator.interface";
import { FeatureIndicator } from '../models/featureIndicator';
import * as moment from 'moment';

const INDICATORS : Indicator[] = [
  { id: "asdfasdfasdfa",
    indicatorType: "LongAndShort",
    descricao: "Long And Short",
    logo: "chart",
    rota: "longandshort",
     featureIndicator: [
      {
        nome: "Opção de Compra PETR4",
        link: "www.bolsadevalores.com.br/opcao/PETR4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações da Petrobras",
        precoExercicio: 28.50,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date()
      },
      {
        nome: "Opção de Venda VALE3",
        link: "www.bolsadevalores.com.br/opcao/VALE3",
        fonte: "Bolsa de Valores",
        descricao: "Opção de venda de ações da Vale",
        precoExercicio: 92.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      },
      {
        nome: "Opção de Compra ITUB4",
        link: "www.bolsadevalores.com.br/opcao/ITUB4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações do Itaú",
        precoExercicio: 30.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      }
    ]
  },
  {
    id: "412342134234123",
    indicatorType: "Petax",
    descricao: "Ptax",
    logo: "trending",
    rota: "ptax",
      featureIndicator:[]
  },
  {
    id: "412asdfasd342134234123",
    indicatorType: "VolatividadeImplicita",
    descricao: "Volatividade Implícita",
    logo: "trending_up",
    rota: "volatividade",
          featureIndicator:[]

  },
  {
     id: "234123412342tt",
    indicatorType: "options",
    descricao: "Opcoes de volatividade",
    logo: "option",
    rota: "options",
    featureIndicator:[]

  }]

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private indicadores : Indicator[] = INDICATORS;
  private apiUrl = environment.api;
  public listaDeIndicadores: any[] = [];

  constructor(private http: HttpClient) { }

//resta funcao requisita lista de indicadores atualizados no servidor principal
  retornarListaDeIndicadores() : Indicator[] //{
   // return this.http.get<any[]>(this.apiUrl + "indicadores");
    {  return this.indicadores;

  }

  //esta funcao retorna a lista de inidicadores que estao aplicados no painel do usuario da secao
  retornaIndicadoresAplicados() {
    return this.http.get<any[]>(this.apiUrl+"/retornarindicadoraplicado");
  }

  //esta funcao faz a aplicacao do indicador no usuario da secao
  aplicarIndicador(indicador: any) {
    return this.http.post<any[]>(this.apiUrl+"aplicar", indicador);
  }

  //esta funcao retorar um indicador expecifico com suas caracteritiscas
  retornarIndicador(id: string): Indicator | undefined {
    if (this.indicadores != null) {
      return this.indicadores.find(indicator => indicator.id === id);
    }
    return undefined;
  }
}
