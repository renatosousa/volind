from queue import Full
from flask import Flask, request, jsonify
import requests
import pandas as pd
import pandas_datareader as pdr
import yfinance
from flask_cors import CORS
from datetime import datetime
import yfinance as yf  
import pandas_datareader as pdr
from yahoo_finance import Share
import urllib.request
import json
import math

app = flask = Flask(__name__)
CORS(app)

empresas_tecnologia = [
    "Apple Inc. (AAPL)",
    "Alphabet Inc. (GOOGL, GOOG)",
    "Amazon.com, Inc. (AMZN)",
    "Microsoft Corporation (MSFT)",
    "Meta Platforms, Inc. (META)",
    "NVIDIA Corporation (NVDA)",
    "Tesla, Inc. (TSLA)",
    "Cisco Systems, Inc. (CSCO)",
    "Oracle Corporation (ORCL)",
    "Intel Corporation (INTC)",
    "Netflix, Inc. (NFLX)",
    "Adobe Inc. (ADBE)"
]


url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=XETRA&interval=5min&apikey=demo'
ativos = ['PETR4.SA', 'VALE3.SA', 'ITUB4.SA', 'BBDC4.SA', 'ABEV3.SA', 'WEGE3.SA', 'VIVT4.SA', 'BBAS3.SA', 'ITSA4.SA', 'JBSS3.SA', 'RENT3.SA', 'LREN3.SA', 'PETR3.SA', 'GGBR4.SA', 'CIEL3.SA', 'BRFS3.SA', 'ELET3.SA', 'ELET6.SA', 'CSNA3.SA', 'UGPA3.SA', 'BRML3.SA', 'CCRO3.SA', 'SBSP3.SA', 'QUAL3.SA', 'MRVE3.SA', 'HYPE3.SA', 'TIMP3.SA', 'BRAP4.SA', 'MULT3.SA', 'BEEF3.SA', 'EMBR3.SA', 'SUZB3.SA', 'CYRE3.SA', 'GOLL4.SA', 'BTOW3.SA', 'CVCB3.SA', 'IRBR3.SA', 'YDUQ3.SA', 'HAPV3.SA', 'BRKM5.SA', 'CSAN3.SA', 'EVEN3.SA', 'MRFG3.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5']
opcoes = ["AAPL", "GOOGL", "AMZN", "MSFT","META","NVDA","TSLA","CSCO","ORCL","INTC","NFLX","ADBE"]

 # Remover duplicatas
ativos_unicos = set(ativos)

#faz correcoes de importacoes da biblioteca yfinance
yfinance.pdr_override()

@app.route('/', methods=['GET'])
def details():
    r = requests.get(url)  
    return r.json()

#enviar lista de ativos

@app.route('/test', methods=['GET'])
def test(): 
    return {"test": "test"}
     

@app.route('/actives', methods=['GET'])
def activesDetails(): 
     featureIndicator = []
     listaOpcoes = []
     indicators = []

   

     for code in ativos:
            featureIndicator.append({
                 
            "nome": code,
            #"code": code,
            "link": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={code}",
            # "link_with_params": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={code}",
            "fonte": "Yahoo Finance",
            "descricao": "Yahoo Finance",
            "chart": f"https://query1.finance.yahoo.com/v8/finance/chart/{code}?metrics=high?&interval=1d&range=5d",
            "precoExercicio": 28.50,
            "dataExpiracao": datetime(2022, 12, 17),
            "dataUltimaAtualizacao": datetime(2022, 12, 17),
            "symbol": code, 
            "modo":"active"
            })

     for op in opcoes:
            listaOpcoes.append({
            "nome": op,
            #"op": op,
            "link": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={op}",
            # "link_with_params": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={op}",
            "fonte": "Yahoo Finance",
            "descricao": "Yahoo Finance",
            "chart": f"https://query1.finance.yahoo.com/v8/finance/chart/{op}?metrics=high?&interval=1d&range=5d",
            "precoExercicio": 28.50,
            "dataExpiracao": datetime(2022, 12, 17),
            "dataUltimaAtualizacao": datetime(2022, 12, 17),
            "symbol": op, 
            "modo":"table"
            })

     actives = { 
            "id": "asdfasdfasdfqa",
            "indicatorType": "Ativos",
            "descricao": "Meus Ativos",
            "logo": "chart",
            "rota": "longandshort",
            "modo":"active",
            "featureIndicator": featureIndicator
                    }
     options = {
            "id": "options",
            "indicatorType": "Opções",
            "descricao": "Minhas Opções",
            "logo": "chart",
            "rota": "opcoes",
            "modo":"table",
            "featureIndicator": listaOpcoes
     }
     indicators.append(actives) 
     indicators.append(options)
     return indicators



@app.route('/activeinfo/<active>', methods=['GET'])
def activeDetailsInfo(active):
    print(f"Nenhum dado encontrado para o ativo: {jsonify(active)}")  # Imprime mensagem se não houver dados

    # Obtenha dados históricos do ativo usando yfinance
    stock = yf.Ticker(active)
    hist = stock.history(period='1mo')  # Período de um mês

    # Prepare os dados em formato JSON para o gráfico
    # data = {
    #     'dates': { hist.index.strftime('%Y-%m-%d').tolist()} ,
    #     'open': hist['Open'].tolist(),
    #     'high': hist['High'].tolist(),
    #     'low': hist['Low'].tolist(),
    #     'close': hist['Close'].tolist(),
    #     'volume': hist['Volume'].tolist()
    # }
    max_lines = 30
    headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
    types = ['string', 'number', 'number', 'number', 'number', 'number']
    nameActive = getActiveNameInfo(active);  
    dataSet = list(zip(hist.index.strftime('%Y-%m-%d').tolist()[:max_lines], 
                    hist['Open'].tolist()[:max_lines], 
                    hist['High'].tolist()[:max_lines], 
                    hist['Low'].tolist()[:max_lines], 
                    hist['Close'].tolist()[:max_lines],
                    hist['Volume'].tolist()[:max_lines]
                    
    ))
    response = {
        "headers" : headers,
        "types" :types,
        "dataSet" : dataSet,
        "nameActive" : nameActive
    }
    return response

@app.route('/activename/<symbol>', methods=['GET'])
def getActiveName(symbol):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={symbol}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes'][0]['shortname']
    #stock_name = yf.Ticker(symbol).info["longName"]
    return data

def getActiveNameInfo(symbol):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={symbol}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes'][0]['shortname']
    #stock_name = yf.Ticker(symbol).info["longName"]
    return data

@app.route('/datasetoptions/<symbol>', methods=['GET'])
def get_options_list(symbol):
    # Obter parâmetros opcionais da requisição
    expiration_date = request.args.get('expiration_date')  # Data de vencimento para filtrar as opções
    limit = request.args.get('limit', type=int, default=30)  # Limite do número de opções a retornar

    try:
        # Obter o objeto do ticker da ação usando yfinance
        stock = yf.Ticker(symbol)
        
        # Obter os dados das opções (chamadas e lançamentos)
        option_chain = stock.option_chain()

        # Filtrar as opções de chamadas por data de vencimento, se especificada
        if expiration_date:
            calls = option_chain.calls[option_chain.calls['contractExpDate'] == expiration_date]
            puts = option_chain.puts[option_chain.puts['contractExpDate'] == expiration_date]
        else:
            calls = option_chain.calls
            puts = option_chain.puts
        
        # Limitar o número de opções retornadas
        calls = calls.head(limit)
        puts = puts.head(limit)

        # Converter os dados das opções em dicionários
        calls_dict = calls.to_dict(orient='list')
        puts_dict = puts.to_dict(orient='list')

        # Retornar uma resposta JSON com os dados das opções filtradas
        options = {
            'symbol': symbol,
            'calls': replace_nan_with_zero(calls_dict),
            'puts': replace_nan_with_zero(puts_dict)
        }
        dataSetCalls  = list(zip(calls_dict['ask'], 
                    calls_dict['bid'], 
                    calls_dict['change'], 
                    calls_dict['contractSize'],
                    calls_dict['contractSymbol'],
                    calls_dict['currency'],
                    calls_dict['impliedVolatility'],
                    calls_dict['inTheMoney'],
                    calls_dict['lastPrice'],
                    calls_dict['lastTradeDate'],
                    calls_dict['openInterest'],
                    calls_dict['percentChange'],
                    calls_dict['strike'],
                    calls_dict['volume']   ))
        
        dataSetPuts  = list(zip(puts_dict['ask'], 
                    puts_dict['bid'], 
                    puts_dict['change'], 
                    puts_dict['contractSize'],
                    puts_dict['contractSymbol'],
                    puts_dict['currency'],
                    puts_dict['impliedVolatility'],
                    puts_dict['inTheMoney'],
                    puts_dict['lastPrice'],
                    puts_dict['lastTradeDate'],
                    puts_dict['openInterest'],
                    puts_dict['percentChange'],
                    puts_dict['strike'],
                    puts_dict['volume']   ))
                    
        headers = [  "ask",
                    "bid",
                    "change",
                    "contractSize",
                    "contractSymbol",
                    "currency",
                    "impliedVolatility",
                    "inTheMoney",
                    "lastPrice",
                    "lastTradeDate",
                    "openInterest",
                    "percentChange",
                    "strike",
                    "volume"]
        
        types = [   "number",
                    "number",
                    "number",
                    "string",
                    "string",
                    "string",
                    "number",
                    "boolean",
                    "number",
                    "string",
                    "number",
                    "number",
                    "number",
                    "number"
                ]   
        nameActive = getActiveNameInfo(symbol);

        responseOP = {
        "headers" : headers,
        "types" :types,
        "nameActive" : nameActive,
        "dataSetCalls": dataSetCalls,
        "dataSetPuts": dataSetPuts
         }  
        return responseOP
        
    except Exception as e:
        # Captura e trata exceções que possam ocorrer
        return jsonify({
            'error': 'Ocorreu um erro ao obter as opções para o símbolo fornecido.',
            'details': str(e)
        }), 400  # Retorna um código de status HTTP 400 para indicar uma solicitação ruim


def replace_nan_with_zero(data):
   
    if isinstance(data, dict):
        # Se for um dicionário, itera por suas chaves e valores
        for key, value in data.items():
            data[key] = replace_nan_with_zero(value)
    elif isinstance(data, list):
        # Se for uma lista, itera por seus elementos
        for i in range(len(data)):
            data[i] = replace_nan_with_zero(data[i])
    elif isinstance(data, float):
        # Se for um float, verifica se é NaN e substitui por 0
        if math.isnan(data):
            return 0
    return data

if __name__ == '__main__':
    app.run()
	
