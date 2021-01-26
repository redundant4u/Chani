import os
from enum import Enum

class Kind(Enum):
    net_income = 0
    net_income_con = 1
    net_income_non = 2

def enum_config(*sequential, **named):
    enums = dict(zip(sequential, range(len(sequential))), **named)
    return type('Enum', (), enums)

enum_config = enum_config('net_income', 'net_income_con')
print(enum_config.net_income_con)

imglobal = 1

class Fianancial:
    financial_tmp = {}
    year = 0

    def __init__(self, year):
        self.year = year

    def set_net_income(self, n): self.financial_tmp['net_income'] = n

    def set_net_income_con(self, n):
        self.financial_tmp['net_income_non'] = n + imglobal

test = Fianancial(2018)
test.set_net_income(10)
test.set_net_income_con(1000)

print(test.year)
print(test.financial_tmp)

print(Kind.net_income.value)


tss = 1
if tss == 1: print('hi')

print( os.getcwd() )

res = []
res.append(1)

print(res)
res.clear()
print(res)

res = {}
res['asd'] = 1
print(res)
res.clear()
print(res)