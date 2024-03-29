class Financial:
    year = 0
    year_key = ""
    financial_data = {}
    find_check = []
    

    def __init__(self, year):
        self.count = 0
        self.year = year
        self.financial_data = {}
        self.financial_data['net_income_non'] = 0
        self.find_check = [ False, False, False, False, False, False, False, False, False ]

    def add_stock_code(self, raw_data, index):
        self.financial_data['stock_code'] = raw_data[index]['stock_code'].zfill(6)

    def add_issued_stock(self, raw_data, data, index):
        if( self.year == 2019 ):
            self.financial_data['issued_stock'] = int(data[index]['issued_stock'])
        else:
            for i in data:
                if( i['stock_code'] == raw_data[index]['stock_code'] ):
                    self.financial_data['issued_stock'] = int(i['issued_stock'])
                    break

    def add_financial_statement(self, kind, index):
        self.get_year_key()

        if( kind == 0 and self.find_check[kind] == False ):
            self.financial_data['net_income'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 1 and self.find_check[kind] == False ):
            self.financial_data['net_income_non'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 2 and self.find_check[kind] == False ):
            self.financial_data['net_income_con'] = self.financial_data['net_income'] - self.financial_data['net_income_non']
            self.find_check[kind] = True
        elif( kind == 3 and self.find_check[kind] == False ):
            self.financial_data['operating_cashflow'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 4 and self.find_check[kind] == False ):
            self.financial_data['operating_profit'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 5 and self.find_check[kind] == False ):
            self.financial_data['revenue'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 6 and self.find_check[kind] == False ):
            self.financial_data['total_assets'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 7 and self.find_check[kind] == False ):
            self.financial_data['total_equity'] = int(index[ self.year_key ])
            self.financial_data['total_equity_con'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 8 and self.find_check[kind] == False ):
            self.financial_data['total_equity_con'] = int(index[ self.year_key ])
            self.find_check[kind] = True
        elif( kind == 9 ):
            self.financial_data['total_liabilities'] = self.financial_data['total_assets'] - self.financial_data['total_equity']
        elif( kind == 10 ):
            self.financial_data['eps'] = round( self.financial_data['net_income_con'] / self.financial_data['issued_stock'] )
        elif( kind == 11 ):
            self.financial_data['roe'] = round( self.financial_data['net_income_con'] / self.financial_data['total_equity_con'] * 100, 2 )

    def get_year_key(self):
        if( self.year == 2019 ):
            self.year_key = "thstrm_amount"
        elif( self.year == 2018 ):
            self.year_key = "frmtrm_amount"
        elif( self.year == 2017 ):
            self.year_key = "bfefrmtrm_amount"