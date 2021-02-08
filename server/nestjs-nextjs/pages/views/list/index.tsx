import { NextPage } from 'next';
import dynamic from 'next/dynamic'
import { ListEntity } from '../../../src/entities/list.entity';

interface Props {
    lists: ListEntity[],
}

// ssr: false 설정을 해야 table 속성들이 적용된다.
const Data = dynamic(() => import('./data'), { ssr: false } )

const List: NextPage<Props> = ({ lists }) => {
    return (
        <div className="body">
            <div className="form-inline" role="form">
                <div className="form-group">
                     <span>From Date </span>
                   <input name="test1" className="form-control w70" type="text" />
                </div>
                <div className="form-group">
                    <span>To Date </span>
                    <input name="test2" className="form-control w70" type="text" />
                </div>
                <button id="ok" type="submit" className="btn btn-primary">OK</button>
            </div>
            <Data lists={lists} />
            <script>{`


                $('#ok').click(function() 
                { 
                    const table = $('#table')
                    const from = $("input[type=text][name=test1]").val();
                    const to = $("input[type=text][name=test2]").val();
                    console.log(from);
                    console.log(to);
                    alert('1');
                    // $table.bootstrapTable('filterBy',{ eps: getEPS(from, to)}) 
                })
           `}</script>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://127.0.0.1:3000/list/data`);
    const lists: Props[] = await res.json();
    return { props: { lists: lists } };
}

const test = function() {
    return { props: { lists: [{
        'stock_code': '00100',
        'issued_stock': 0,
        'total_equity_con': 0,
        'total_equity': 0,
        'total_assets': 0,
        'revenue': 0,
        'operating_profit': 0,
        'net_income': 0,
        'net_income_non': 0,
        'net_income_con': 0,
        'operating_cashflow': 0,
        'total_liabilities': 0,
        'eps': 0,
        'roe': 0
    }]}};
}

export default List;