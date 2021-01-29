# -*- coding: utf-8 -*-

import json
import os
import find_financial_data as find
import get_financial_statement as kind
from Financial import Financial

COMPLETE = True
financial = Financial(0)
kind = kind.get()
result = []

def parse_json():
    global financial
    global result

    years = [ 2019, 2018, 2017 ]
    latest_financial_raw_data = open_latest_financial_raw_data()

    for year in years:
        financial_raw_data = open_financial_raw_data(year)
        result.clear()

        for i in range( 0, len(latest_financial_raw_data) ):
            financial = Financial(year)

            print( str(year) + ' ' + str(i) + ' ' + latest_financial_raw_data[i]['corp_name'] + ': ' )

            try:
                with open( os.getcwd() + '/api_json/' + latest_financial_raw_data[i]['corp_name'] + '.json', 'r', encoding='utf-8' ) as f:
                    financial_tmp_data = json.load(f)

                financial.add_stock_code(latest_financial_raw_data, i)
                financial.add_issued_stock(latest_financial_raw_data, financial_raw_data, i)
                find_financial_statement(financial_tmp_data)
                append_financial_statement()

            except FileNotFoundError: print('no data\n')

        save_financial_statement()
        # print(financial.financial_data)

def open_latest_financial_raw_data():
    with open( os.getcwd() + '/corp_info/data_2019.json', 'r', encoding='utf-8' ) as f:
        return json.load(f)

def open_financial_raw_data(year):
    with open( os.getcwd() + '/corp_info/data_' + str(year) + '.json', 'r', encoding='utf-8' ) as f:
        return json.load(f)

def find_financial_statement(data):
    for i in data:
        try:
            if  ( financial.find_check[1] == COMPLETE ): break
            if  ( find.net_income_non(i)      ): financial.add_financial_statement(kind.net_income_non, i)
            elif( find.net_income(i)          ): financial.add_financial_statement(kind.net_income, i)
            elif( find.operating_cashflow(i)  ): financial.add_financial_statement(kind.operating_cashflow, i)
            elif( find.operating_profit(i)    ): financial.add_financial_statement(kind.operating_profit, i)
            elif( find.revenue(i)             ): financial.add_financial_statement(kind.revenue, i)
            elif( find.total_assets(i)        ): financial.add_financial_statement(kind.total_assets, i)
            elif( find.total_equity(i)        ): financial.add_financial_statement(kind.total_equity, i)
            elif( find.total_equity_con(i)    ): financial.add_financial_statement(kind.total_equity_con, i)

        except (ValueError, KeyError) as e: print(str(e))

    try:
        financial.add_financial_statement(kind.net_income_con, i)
        financial.add_financial_statement(kind.total_liabilities, i)
        financial.add_financial_statement(kind.eps, i)
        financial.add_financial_statement(kind.roe, i)

    except (ValueError, KeyError, ZeroDivisionError) as e: print(str(e))

    # print(financial.financial_data)

def append_financial_statement():
    global result
    result.append(financial.financial_data)

def save_financial_statement():
    global result
    with open( './result_' + str(financial.year) + '.json', 'w', encoding='utf-8' ) as f:
        f.write( json.dumps(result, indent=4, ensure_ascii=False))