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


app = flask = Flask(__name__)
CORS(app)

url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=XETRA&interval=5min&apikey=demo'

ativos = ['PETR4.SA', 'VALE3.SA', 'ITUB4.SA', 'BBDC4.SA', 'ABEV3.SA', 'WEGE3.SA', 'VIVT4.SA', 'BBAS3.SA', 'ITSA4.SA', 'JBSS3.SA', 'RENT3.SA', 'LREN3.SA', 'PETR3.SA', 'GGBR4.SA', 'CIEL3.SA', 'BRFS3.SA', 'ELET3.SA', 'ELET6.SA', 'CSNA3.SA', 'UGPA3.SA', 'BRML3.SA', 'CCRO3.SA', 'SBSP3.SA', 'QUAL3.SA', 'MRVE3.SA', 'HYPE3.SA', 'TIMP3.SA', 'BRAP4.SA', 'MULT3.SA', 'BEEF3.SA', 'EMBR3.SA', 'SUZB3.SA', 'CYRE3.SA', 'GOLL4.SA', 'BTOW3.SA', 'CVCB3.SA', 'IRBR3.SA', 'YDUQ3.SA', 'HAPV3.SA', 'BRKM5.SA', 'CSAN3.SA', 'EVEN3.SA', 'MRFG3.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5.SA', 'BRFS3.SA', 'BRAP4.SA', 'BRDT3.SA', 'BRML3.SA', 'BRKM5']

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
     indicators = {}
     for code in ativos:
            featureIndicator.append({
                 
            "nome": code.split('.')[0],
            #"code": code,
            "link": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={code}",
            # "link_with_params": f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={code}",
            "fonte": "Yahoo Finance",
            "descricao": "Yahoo Finance",
            "chart": f"https://query1.finance.yahoo.com/v8/finance/chart/{code}?metrics=high?&interval=1d&range=5d",
            "precoExercicio": 28.50,
            "dataExpiracao": datetime(2022, 12, 17),
            "dataUltimaAtualizacao": datetime(2022, 12, 17)

            })
     indicators = { 
            "id": "asdfasdfasdfqa",
            "indicatorType": "Ativos Brasileiros",
            "descricao": "Long And Short",
            "logo": "chart",
            "rota": "longandshort",
            "featureIndicator": featureIndicator
                    }
      
     return indicators

@app.route('/activeinfo/<active>', methods=['GET'])
def activeDetailsInfo(active):
    print(f"Nenhum dado encontrado para o ativo: {jsonify(active)}")  # Imprime mensagem se não houver dados

    # Obtenha dados históricos do ativo usando yfinance
    stock = yf.Ticker(active)
    hist = stock.history(period='1mo')  # Período de um mês

    # Prepare os dados em formato JSON para o gráfico
    data = {
        'dates': hist.index.strftime('%Y-%m-%d').tolist(),
        'open': hist['Open'].tolist(),
        'high': hist['High'].tolist(),
        'low': hist['Low'].tolist(),
        'close': hist['Close'].tolist(),
        'volume': hist['Volume'].tolist()
    }

    # Retorne os dados como JSON
    return jsonify(data)




if __name__ == '__main__':
    app.run()

 