# -*- coding: utf-8 -*-

from find_financial_data import *

def net_income(i):
    return (
        ('당기순' in i['account_nm'] and i['account_id'] == 'ifrs-full_ProfitLoss') or
        ('당기순이익' in i['account_nm'] and i['account_detail'].find('연결재무제표') != -1) or
        ('분기순이익' in i['account_nm'] and i['account_id'] == 'ifrs-full_ProfitLoss') or
        ('총포괄' in i['account_nm'] and i['account_id'] == 'ifrs-full_ProfitLoss')
    )

def net_income_non(i):
    return (
        ('당기순이익' in i['account_nm'] and i['account_detail'].find('비지배') != -1 and i['account_id'] == 'ifrs-full_ProfitLoss') or
        ('당기순이익' in i['account_nm'] and i['account_detail'].find('비지배') != -1)
    )

def operating_cashflow(i):
    return (
        (i['account_id'] == 'ifrs-full_CashFlowsFromUsedInOperatingActivities') or
        (i['account_id'] == 'ifrs_CashFlowsFromUsedInOperatingActivities') or
        (i['account_id'] == 'ifrs-full_OtherInflowsOutflowsOfCashClassifiedAsOperatingActivities')
    )

def operating_profit(i):
    return i['account_id'] == 'dart_OperatingIncomeLoss'

def revenue(i):
    return (
        (i['account_id'] == 'ifrs-full_Revenue') or
        (i['account_id'] == 'ifrs_Revenue') or
        (i['account_nm'] == '영업수익')
    )

def total_assets(i):
    return (
        (i['account_id'] == 'ifrs-full_EquityAndLiabilities') or
        (i['account_id'] == 'ifrs_EquityAndLiabilities')
    )

def total_equity(i):
    return (
        (i['account_id'] == 'ifrs-full_Equity' and i['account_nm'] == '자본총계') or
        (i['account_id'] == 'ifrs-full_Equity') or
        (i['account_id'] == 'ifrs_Equity') or
        (i['account_nm'] == '자본총계')
    )

def total_equity_con(i):
    return (
        (i['account_id'] == 'ifrs-full_EquityAttributableToOwnersOfParent') or
        (i['account_id'] == 'ifrs_EquityAttributableToOwnersOfParent')
    )