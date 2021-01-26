# -*- coding: utf-8 -*-

import json
import requests

def get_dart_api_data():
    api_key = '79404bcda66e31077df6afe9a70bdaa208262f78'
    api_key_decode = requests.utils.unquote(api_key)
    url = 'https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json'

    api_parameter = 'crtfc_key'
    corp_parameter = 'corp_code'
    year_parameter = 'bsns_year'
    report_paramter = 'reprt_code'
    fs_parameter = 'fs_div'

    corp_info = []

    with open("./corp_info/data_20191230.json", "r", encoding="utf-8") as input_file:
        corp_info = json.load(input_file)

    for i in range( 0, len(corp_info) ):
        data = {}
        data['financial_info'] = []

        parameters = {
            api_parameter: api_key_decode,
            year_parameter: '2019',
            report_paramter: '11011',
            fs_parameter: 'CFS',
            corp_parameter: corp_info[i]['corp_code']
        }

        get_api_data = requests.get( url, params=parameters )
        api_json = get_api_data.json()

        # 연결 재무제표가 없을 경우 그냥 재무제표로 찾기
        if( api_json['status'] == '013' ):
            print( str(i) + ' ' + corp_info[i]['corp_name'] + ' OFS' )

            parameters = {
                api_parameter: api_key_decode,
                year_parameter: '2019',
                report_paramter: '11011',
                fs_parameter: 'OFS',
                corp_parameter: corp_info[i]['corp_code']
            }

            get_api_data = requests.get( url, params=parameters )
            api_json = get_api_data.json()

            if( api_json['status'] == '013' ): continue

            with open('./api_json/' + corp_info[i]['corp_name'] + '.json', 'w', encoding='utf-8' ) as output_file:
                json.dump( api_json['list'], output_file, ensure_ascii=False, indent='\t' )

        else:
            print( str(i) + ' ' + corp_info[i]['corp_name'] )
            with open('./api_json/' + corp_info[i]['corp_name'] + '.json', 'w', encoding='utf-8' ) as output_file:
                json.dump( api_json['list'], output_file, ensure_ascii=False, indent='\t' )

if __name__ == "__main__":
    get_dart_api_data()