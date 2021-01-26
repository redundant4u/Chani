# -*- coding: utf-8 -*-

import json
import csv

from xml.etree.ElementTree import parse

def getCorpCode():
    year_list = [ 'data_20191230', 'data_20181228', 'data_20171228' ]

    for i in year_list:
        corp_info = []
        stock_code = getStockCode(i)

        tree = parse('./corp_info/CORPCODE.xml')
        root = tree.getroot()
        stock_list = root.findall('list')

        for x in stock_list:
            for y in range(0, len(stock_code)):
                if( x.findtext('stock_code') == stock_code[y]['stock_code'] ):
                    corp_info.append({
                        'corp_code': x.findtext('corp_code'),
                        'corp_name': x.findtext('corp_name'),
                        'stock_code': x.findtext('stock_code'),
                        'issued_stock': stock_code[y]['issued_stock']
                    })

                    break

        with open( './corp_info/' + i + ".json", "w", encoding="utf-8") as output_file:
            output_file.write( json.dumps(corp_info, indent=4, ensure_ascii=False) )


def getStockCode(i):
    result = []

    with open( '../krx/last_market_condition/' + i + '.csv', "r", encoding="utf-8") as input_file:
        reader = csv.DictReader(input_file)

        for rows in reader:
            result.append({
                "stock_code": rows["종목코드"].zfill(6),
                "issued_stock": rows["상장주식수"]
            })

    return result

if __name__ == "__main__":
    getCorpCode()