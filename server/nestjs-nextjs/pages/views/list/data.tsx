import { NextPage } from 'next';
import { ListEntity } from '../../../src/entities/list.entity';
import Link from 'next/link'


interface Props {
    lists: ListEntity[],
    data: {
        orderBy: boolean,
        orderByKind: string,
        EPS: Number[],
        ROE: Number[]
    },
    pass: 0.1
}

const Data: NextPage<Props> = ({ lists, data, pass }) => {
    const ths = [
        { name: 'EPS', kind: 'eps' },
        { name: 'ROE', kind: 'roe' },
        { name: '자산총계', kind: 'total_assets' },
        { name: '당기순이익', kind: 'net_income' },
    ];

    const sort = function(kind = '') {
        for (let i = 0; i < ths.length; i++) {
            const element = document.getElementsByClassName(ths[i].kind)[0].classList;

            if( kind == ths[i].kind ) {
                if (data.orderBy) {
                    element.remove('desc');
                    element.add('asc');
                }

                else {
                    element.remove('asc');
                    element.add('desc');
                }
            }

            else {
                if (element.contains('asc'))
                    element.remove('asc');

                else if (element.contains('desc'))
                    element.remove('desc');
            }
        }
    }

    const comma = function(x = '') {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <style jsx>{`
                td {
                    width: 50px;
                    word-break: break-all;
                }
                .asc::after {
                    content: '▲';
                }
                .desc::after {
                    content: '▼';
                }
            `}
            </style>
            <div className="table-responsive"> 
               <table id="table" className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>기업명</th>
                            <th>종목코드</th>
                            {
                                ths.map((th, index) => (
                                    <Link href={{
                                        query: {
                                            orderBy: !data.orderBy,
                                            orderByKind: th.kind,
                                            fromEPS: Number(data.EPS[0]) || pass,
                                            toEPS: Number(data.EPS[1]) || pass,
                                            fromROE: Number(data.ROE[0]) || pass,
                                            toROE: Number(data.ROE[1]) || pass,
                                        }
                                    }} as='/list' scroll={false} key={index}><th className={th.kind} onClick={() => sort(th.kind)}>{th.name} </th></Link>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        lists.map((list, index) => (
                            <tr key={index}>
                                <td>{ list.corporation.corp_name }</td>
                                <td>{ list.corporation.stock_code }</td>
                                <td>{ comma(list.eps.toString()) }</td>
                                <td>{ list.roe }</td>
                                <td>{ comma(list.total_assets.toString()) }</td>
                                <td>{ comma(list.net_income.toString()) }</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>    
            </div>
        </>
    );
}

export default Data;