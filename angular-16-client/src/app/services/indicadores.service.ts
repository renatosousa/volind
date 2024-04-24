import { HttpClient, HttpParams } from "@angular/common/http";
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
        nome: "PETR4",
        link: "www.bolsadevalores.com.br/opcao/PETR4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações da Petrobras",
        precoExercicio: 28.50,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date()
      },
      {
        nome: "VALE3",
        link: "www.bolsadevalores.com.br/opcao/VALE3",
        fonte: "Bolsa de Valores",
        descricao: "Opção de venda de ações da Vale",
        precoExercicio: 92.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      },
      {
        nome: "ITUB4",
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
  featureIndicator: [
      {
        nome: "X3",
        link: "www.bolsadevalores.com.br/opcao/PETR4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações da Petrobras",
        precoExercicio: 28.50,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date()
      },
      {
        nome: "X2",
        link: "www.bolsadevalores.com.br/opcao/VALE3",
        fonte: "Bolsa de Valores",
        descricao: "Opção de venda de ações da Vale",
        precoExercicio: 92.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      },
      {
        nome: "X4",
        link: "www.bolsadevalores.com.br/opcao/ITUB4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações do Itaú",
        precoExercicio: 30.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      }
    ]  },
  {
    id: "412asdfasd342134234123",
    indicatorType: "VolatividadeImplicita",
    descricao: "Volatividade Implícita",
    logo: "trending_up",
    rota: "volatividade",
      featureIndicator: [
      {
        nome: "b12",
        link: "www.bolsadevalores.com.br/opcao/PETR4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações da Petrobras",
        precoExercicio: 28.50,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date()
      },
      {
        nome: "b11",
        link: "www.bolsadevalores.com.br/opcao/VALE3",
        fonte: "Bolsa de Valores",
        descricao: "Opção de venda de ações da Vale",
        precoExercicio: 92.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      },
      {
        nome: "b3",
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
     id: "234123412342tt",
    indicatorType: "options",
    descricao: "Opcoes de volatividade",
    logo: "option",
    rota: "options",
    featureIndicator: [
      {
        nome: "V3",
        link: "www.bolsadevalores.com.br/opcao/PETR4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações da Petrobras",
        precoExercicio: 28.50,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date()
      },
      {
        nome: "V2",
        link: "www.bolsadevalores.com.br/opcao/VALE3",
        fonte: "Bolsa de Valores",
        descricao: "Opção de venda de ações da Vale",
        precoExercicio: 92.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      },
      {
        nome: "V1",
        link: "www.bolsadevalores.com.br/opcao/ITUB4",
        fonte: "Bolsa de Valores",
        descricao: "Opção de compra de ações do Itaú",
        precoExercicio: 30.00,
        dataExpiracao: new Date(2022, 11, 17),
        dataUltimaAtualizacao: new Date(),
      }
    ]

  }]

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private indicadores : Indicator[] = [];
  private apiUrl = environment.api;
  public listaDeIndicadores: any[] = [];

  constructor(private http: HttpClient) {
    this.listaIndicatorService().subscribe(d=>{
      this.indicadores.push(d);

    })


  }

  //retorna a lista de indicadores do servidor
  listaIndicatorService() {
    return this.http.get<any>(this.apiUrl+"actives")
  }


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
