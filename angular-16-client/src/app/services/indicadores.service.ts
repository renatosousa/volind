import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { JsonpClientBackend } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Indicator } from "../models/indicator.interface";
import { FeatureIndicator } from '../models/featureIndicator';
import * as moment from 'moment';
import { interval, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';



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
   //   this.getAct();
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

  detalhesActive(symbol: any) {
     return this.http.get<any>(`${this.apiUrl}/activeinfo/`+symbol).pipe(
        catchError(error => {
            console.error('Erro na requisição:', error);
            return throwError(error);
        })
    )}
//retorna a lista de indicadores do servidor

  //desconsidere funcoes abaixo....
async returnDataSetYahooFinance1(url: string) {

    return  this.http.get<any>(url,  {headers: this.createHeader('application/json')});

}

async  handleError(error: any): Promise<never> {
    console.error('Erro na requisição HTTP:', error);
    return Promise.reject('Ocorreu um erro ao buscar dados.');
  }
  private createHeader(contentType: string): any {
    return { headers: new HttpHeaders({ 'Content-Type': contentType }), responseType: 'text' };
  }

  async returnDataSetYahooFinance22(url: any) {
    try {
        // Faz a requisição HTTP GET à URL fornecida
        const response = await this.http.get<any>(url).toPromise()

        // Verifica se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Verifique a estrutura dos dados recebidos
        console.log('Estrutura dos dados recebidos:', data);

        // Acesse os dados corretos
        let nestedData = data;
        if (nestedData.source && nestedData.source.source && nestedData.source.source.source) {
            nestedData = nestedData.source.source.source;
        }

        // Retorne os dados acessados
        return nestedData;
    } catch (error) {
        // Trata possíveis erros na requisição
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}
returnDataSetYahooFinance5(url: any): void {
  //const url = 'https://api.exemplo.com/dados';  // Substitua pela URL correta
  const headers = new HttpHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
    'Connection': 'keep-alive',
    'Host': 'query1.finance.yahoo.com',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'TE': 'trailers',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0'
  });  // Use o método get() para fazer uma requisição GET

  this.http.get<any>('http://localhost:5000/test' ).subscribe(response => {
    // Armazene a resposta na propriedade data
     response;
    alert('Dados recebidos:'+response);
  });
}



returnDataSetYahooFinance4(url: any): void {
  //const url = 'https://api.exemplo.com/dados';  // Substitua pela URL correta
  const headers = new HttpHeaders().set('dataType', 'jsonp'); // Aqui está o cabeçalho que você deseja adicionar
  // Use o método get() para fazer uma requisição GET
  this.http.get(url, { headers }).subscribe(response => {
    // Armazene a resposta na propriedade data
    const data = response;
    console.log('Dados recebidos:', data);
  });
}
  //retorna a lista de indicadores do servidor
  returnDataSetYahooFinance() {
    const headers2 = new HttpHeaders({'Content-Type': 'application/json'});

    const headers1 = new HttpHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
      'Connection': 'keep-alive',
      'Host': 'query1.finance.yahoo.com',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site',
      'TE': 'trailers',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0'
    });
    return this.http.get(`https://query1.finance.yahoo.com/v8/finance/chart/WEGE3.SA?metrics=high?&interval=1d&range=5d`,  {responseType: 'text'});
  }

  act = [];
  url = 'https://query1.finance.yahoo.com/v8/finance/chart/WEGE3.SA?metrics=high%3F&interval=1d&range=5d';




  getAct() {
    console.log("update");

    return interval(100)
      .pipe(
        flatMap(() => {
          return this.http.get<any>(this.url)
            .pipe(
              map(res => res)
            );
        })
      );


    }

    subject = webSocket('wss://streamer.finance.yahoo.com');

subscribeToWebsocket() {
  console.log('Subscribing to websocket...');
  this.subject.subscribe((res) => {
    console.log('Response from websocket: ' + res);
  });

  this.subject.next({ subscribe: ['AAPL'] });
}


}
