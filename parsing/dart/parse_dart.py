# -*- coding: utf-8 -*-

import json
import os
import find_financial_data as find

financial_tmp_19 = {}
financial_tmp_18 = {}
financial_tmp_17 = {}

financial_raw_data_19 = {}
financial_raw_data_18 = {}
financial_raw_data_17 = {}

result_json_19 = []
result_json_18 = []
result_json_17 = []

check = 0

def open_financial_data():
    global financial_raw_data_19
    global financial_raw_data_18
    global financial_raw_data_17

    with open( os.getcwd() + '/corp_info/data_20191230.json', 'r', encoding='utf-8' ) as i:
        financial_raw_data_19 = json.load(i)

    with open( os.getcwd() + '/corp_info/data_20181228.json', 'r', encoding='utf-8' ) as i:
        financial_raw_data_18 = json.load(i)

    with open( os.getcwd() + '/corp_info/data_20171228.json', 'r', encoding='utf-8' ) as i:
        financial_raw_data_17 = json.load(i)

def parse_json():
    # 가장 최신 재무제표 파일을 가져온다.
    corp_info = financial_raw_data_19

    for i in range( 0, len(corp_info) ):
        json_init()
        print( str(i) + ' ' + corp_info[i]['corp_name'] + ': ' )

        try:
            with open( os.getcwd() + '/api_json/' + corp_info[i]['corp_name'] + '.json', 'r', encoding='utf-8' ) as json_file:
                financial_tmp = json.load(json_file)

            add_stock_code(i)
            add_issued_stock(i)
            add_net_income(financial_tmp)
            add_financial_statement(financial_tmp)
            append_financial_to_result(financial_tmp_19, financial_tmp_18, financial_tmp_17)

            # print(financial_tmp_19)
            # print(financial_tmp_18)
            # print(financial_tmp_17)

        except FileNotFoundError: print('no data\n')

def add_stock_code(i):
    financial_tmp_19['stock_code'] = financial_raw_data_19[i]['stock_code'].zfill(6)
    financial_tmp_18['stock_code'] = financial_tmp_19['stock_code']
    financial_tmp_17['stock_code'] = financial_tmp_19['stock_code']

def add_issued_stock(i):
    financial_tmp_19['issued_stock'] = int(financial_raw_data_19[i]['issued_stock'])

    for j in financial_raw_data_18:
        if( j['stock_code'] == financial_raw_data_19[i]['stock_code'] ):
            financial_tmp_18['issued_stock'] = int(j['issued_stock'])
            break

    for j in financial_raw_data_17:
        if( j['stock_code'] == financial_raw_data_19[i]['stock_code'] ):
            financial_tmp_17['issued_stock'] = int(j['issued_stock'])
            break

def add_net_income(financial_tmp):
    # 당기순이익 가져오기
    for i in financial_tmp:
        if( find.net_income(i) ):
            try:
                financial_tmp_19['net_income'] = int(i['thstrm_amount'])
                financial_tmp_18['net_income'] = int(i['frmtrm_amount'])
                financial_tmp_17['net_income'] = int(i['bfefrmtrm_amount'])

            except (ValueError, KeyError) as e: print( str(e) + ': no value 1' )
            break
    
    # 비지배 당기순이익 가져오기, 비지배 당기순이익 값이 없을 수도 있으므로 기본 0 값으로 지정
    financial_tmp_19['net_income_non'] = 0
    financial_tmp_18['net_income_non'] = 0
    financial_tmp_17['net_income_non'] = 0

    for i in financial_tmp:
        if( find.net_income_non(i) ):
            try:
                financial_tmp_19['net_income_non'] = int(i['thstrm_amount'])
                financial_tmp_18['net_income_non'] = int(i['frmtrm_amount'])
                financial_tmp_17['net_income_non'] = int(i['bfefrmtrm_amount'])

            # 비지배 당기순이익 데이터가 비어 있을경우
            except (ValueError, KeyError) as e: print( str(e) + ': no value 2' )
            break

    try:
        financial_tmp_19['net_income_con'] = financial_tmp_19['net_income'] - financial_tmp_19['net_income_non']
        financial_tmp_18['net_income_con'] = financial_tmp_18['net_income'] - financial_tmp_18['net_income_non']
        financial_tmp_17['net_income_con'] = financial_tmp_17['net_income'] - financial_tmp_17['net_income_non']

    except (ValueError, KeyError) as e: print( str(e) + ': no value 2' )

def add_financial_statement(financial_tmp):
    global check
    check = 0

    for i in financial_tmp:
        if( check == 6 ): break
        add_operating_cashflow(i) # 영업활동 현금흐름 추가
        add_operating_profit(i) # 영업이익 추가
        add_revenue(i) # 매출액 추가
        add_total_assets(i) # 자산총계 추가
        add_total_equity(i) # 자본총계 추가
        add_total_equity_con(i) # 지배 자본총계 추가

    add_total_liabilities(i) # 부채총계 추가
    add_eps() # eps 추가
    add_roe() # roe 추가

def add_operating_cashflow(i):
    if( find.operating_cashflow(i) ):
        try:
            financial_tmp_19["operating_cashflow"] = int(i['thstrm_amount'])
            financial_tmp_18['operating_cashflow'] = int(i['frmtrm_amount'])
            financial_tmp_17['operating_cashflow'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 4' )

        add_check()

def add_operating_profit(i):
    if( find.operating_profit(i) ):
        try:
            financial_tmp_19['operating_profit'] = int(i['thstrm_amount'])
            financial_tmp_18['operating_profit'] = int(i['frmtrm_amount'])
            financial_tmp_17['operating_profit'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 5' )

        add_check()

def add_revenue(i):
    if( find.revenue(i) ):
        try:
            financial_tmp_19['revenue'] = int(i['thstrm_amount'])
            financial_tmp_18['revenue'] = int(i['frmtrm_amount'])
            financial_tmp_17['revenue'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 6' )

        add_check()

def add_total_assets(i):
    if( find.total_assets(i) ):
        try:
            financial_tmp_19['total_assets'] = int(i['thstrm_amount'])
            financial_tmp_18['total_assets'] = int(i['frmtrm_amount'])
            financial_tmp_17['total_assets'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 6' )

        add_check()

def add_total_equity(i):
    if( find.total_equity(i) ):
        try:
            financial_tmp_19['total_equity'] = int(i['thstrm_amount'])
            financial_tmp_19['total_equity_con'] = int(i['thstrm_amount'])

            financial_tmp_18['total_equity'] = int(i['frmtrm_amount'])
            financial_tmp_18['total_equity_con'] = int(i['frmtrm_amount'])

            financial_tmp_17['total_equity'] = int(i['bfefrmtrm_amount'])
            financial_tmp_17['total_equity_con'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 7' )

        add_check()

def add_total_equity_con(i):
    if( find.total_equity_con(i) ):
        try:
            financial_tmp_19['total_equity_con'] = int(i['thstrm_amount'])
            financial_tmp_18['total_equity_con'] = int(i['frmtrm_amount'])
            financial_tmp_17['total_equity_con'] = int(i['bfefrmtrm_amount'])

        except (ValueError, KeyError) as e: print( str(e) + ': no value 8' )

        add_check()

def add_total_liabilities(i):
    try:
        financial_tmp_19['total_liabilities'] = financial_tmp_19['total_assets'] - financial_tmp_19['total_equity']
        financial_tmp_18['total_liabilities'] = financial_tmp_18['total_assets'] - financial_tmp_18['total_equity']
        financial_tmp_17['total_liabilities'] = financial_tmp_17['total_assets'] - financial_tmp_17['total_equity']

    except (ValueError, KeyError) as e: print( str(e) + ': no value 9' )

def add_eps():
    try:
        financial_tmp_19['eps'] = round( financial_tmp_19['net_income_con'] / financial_tmp_19['issued_stock'] )
        financial_tmp_18['eps'] = round( financial_tmp_18['net_income_con'] / financial_tmp_18['issued_stock'] )
        financial_tmp_17['eps'] = round( financial_tmp_17['net_income_con'] / financial_tmp_17['issued_stock'] )
    
    except (ValueError, KeyError) as e: print( str(e) + ': no value 10' )

def add_roe():
    try:
        financial_tmp_19['roe'] = round( financial_tmp_19['net_income_con'] / financial_tmp_19['total_equity_con'] * 100, 2 )
        financial_tmp_18['roe'] = round( financial_tmp_18['net_income_con'] / financial_tmp_18['total_equity_con'] * 100, 2 )
        financial_tmp_17['roe'] = round( financial_tmp_17['net_income_con'] / financial_tmp_17['total_equity_con'] * 100, 2 )
    
    except (ValueError, KeyError, ZeroDivisionError) as e: print( str(e) + ': no value 10' )

def append_financial_to_result(financial_tmp_19, financial_tmp_18, financial_tmp_17):
    global result_json_19
    global result_json_18
    global result_json_17

    result_json_19.append(financial_tmp_19)
    result_json_18.append(financial_tmp_18)
    result_json_17.append(financial_tmp_17)

def save_json():
    with open( './result_2019.json', 'w', encoding='utf-8' ) as i:
        i.write( json.dumps(result_json_19, indent=4, ensure_ascii=False))

    with open( './result_2018.json', 'w', encoding='utf-8' ) as i:
        i.write( json.dumps(result_json_18, indent=4, ensure_ascii=False))

    with open( './result_2017.json', 'w', encoding='utf-8' ) as i:
        i.write( json.dumps(result_json_17, indent=4, ensure_ascii=False))

def json_init():
    global financial_tmp_19
    global financial_tmp_18
    global financial_tmp_17

    financial_tmp_19 = {}
    financial_tmp_18 = {}
    financial_tmp_17 = {}

def add_check():
    global check
    check += 1