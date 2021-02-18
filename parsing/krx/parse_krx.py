# -*- coding: utf-8 -*-

import csv
import json

csvFileName = [ "./kospi.csv", "./kosdaq.csv" ]
# jsonFileName = [ "./corporation_kospi.json", "./corporation_kodaq.json" ]

def openCSV():
    industry_tmp = []
    corporation_tmp = []

    for i in range(0, 2):
        # corporation_tmp = []

        with open(csvFileName[i], "r", encoding="utf-8") as input_file:
            reader = csv.DictReader(input_file)

            for rows in reader:
                industry_tmp.append({
                    "industry_code": int(rows["업종코드"]),
                    "industry_name": rows["업종"]
                })

                corporation_tmp.append({
                    "corp_name": rows["기업명"],
                    "corp_code": rows["종목코드"].zfill(6),
                    "industry_code": int(rows["업종코드"]),
                    "issued_stock": int(rows["상장주식수(주)"].replace(",", "").strip()),
                    "kind": i
                    # "captial_stock": int(rows["자본금(원)"].replace(",", "").strip()),
                })

    saveCorporation(corporation_tmp)
    # saveIndustry(industry_tmp)

def saveIndustry(industry_tmp):
    industry = {}
    industry["industry"] = []
    industry["industry"].append( list({tmps["industry_code"]: tmps for tmps in industry_tmp}.values()) )

    with open("industry.json", "w", encoding="utf-8") as output_file:
        output_file.write( json.dumps(industry, indent=4, ensure_ascii=False) )

def saveCorporation(corporation_tmp):
    corporation = {}
    corporation["corporation"] = []
    corporation["corporation"].append(corporation_tmp)
    # print(corporation)

    with open("corporation.json", "w", encoding="utf-8") as output_file:
        output_file.write( json.dumps(corporation, indent=4, ensure_ascii=False) )

if __name__ == "__main__":
    openCSV()