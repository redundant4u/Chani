# -*- coding: utf-8 -*-

from get_financial_statement import *

def custom_enum(*sequential, **named):
    enums = dict(zip(sequential, range(len(sequential))), **named)
    return type('Enum', (), enums)

def get():
    return custom_enum(
    'net_income',
    'net_income_non',
    'net_income_con',
    'operating_cashflow',
    'operating_profit',
    'revenue',
    'total_assets',
    'total_equity',
    'total_equity_con',
    'total_liabilities',
    'eps',
    'roe'
)