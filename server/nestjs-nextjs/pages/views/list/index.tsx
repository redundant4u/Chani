import { NextPage, NextPageContext } from 'next';
import { ListEntity } from '../../../src/entities/list.entity';
import dynamic from 'next/dynamic'

interface Props {
    lists: ListEntity[],
    total: Number,
    search: {
        count: Number,
        page: Number,
        EPS: Number[],
        ROE: Number[]
    },
}

// ssr: false 설정을 해야 table 속성들이 적용된다.
const Data = dynamic(() => import('./data'), { ssr: false });
const Search = dynamic(() => import('./search'));
const Pagination = dynamic(() => import('./pagination'));

const List: NextPage<Props> = ({ lists, total, search }) => {
    return (
        <div className="body">
            <Search search={search} />
            <p>total: { total } page: { search.page } count: { search.count }</p>
            <p>fromEPS: { search.EPS[0]  } toEPS: { search.EPS[1] }</p>
            <p>fromROE: { search.ROE[0]  } toROE: { search.ROE[1] }</p>
            <Data lists={lists} />
            <Pagination total={total} search={search} pass={0.1} />
        </div>
    )
}

export async function getServerSideProps({query}: NextPageContext) {
    const pass = 0.1;
    const params = {
        "count": query.count || 10,
        "page" : query.page  || 0,
        "financials": {
            "EPS": [ query.fromEPS || pass, query.toEPS || pass ],
            "ROE": [ query.fromROE || pass, query.toROE || pass ]
        }
    }

    // console.log(query.EPS[0]);
    // console.log(params);

    const result = await fetch("http://127.0.0.1:3000/list/data", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    const lists = await result.json();
    console.log(lists);

    return {
        props: {
            lists: lists['data'],
            total: lists['total'],
            search: {
                count: params.count,
                page : params.page,
                EPS  : params.financials.EPS,
                ROE  : params.financials.ROE
            }
        }
    }
}

export default List;