import { NextPage, NextPageContext } from 'next';
import { ListEntity } from '../../../src/entities/list.entity';
import dynamic from 'next/dynamic'

interface Props {
    lists: ListEntity[],
    total: Number,
    data: {
        orderBy: boolean,
        orderByKind: string,
        EPS: Number[],
        ROE: Number[],
        columnOrder: string
    },
    search: {
        count: Number,
        page: Number,
    }
}

const Data = dynamic(() => import('./data'));//, { ssr: false });
const Search = dynamic(() => import('./search'));
const Pagination = dynamic(() => import('./pagination'));

const List: NextPage<Props> = ({ lists, total, data, search }) => {
    return (
        <div className="body">
            <Search search={search} />
            <p>total: { total } page: { search.page } count: { search.count }</p>
            <p>fromEPS: { data.EPS[0]  } toEPS: { data.EPS[1] }</p>
            <p>fromROE: { data.ROE[0]  } toROE: { data.ROE[1] }</p>
            <Data lists={lists} data={data} pass={0.1} />
            <Pagination total={total} data={data} search={search} pass={0.1} />
        </div>
    )
}

export async function getServerSideProps({query}: NextPageContext) {
    const pass = 0.1;
    const params = {
        "count": query.count || 10,
        "page" : query.page  || 0,
        "financials": {
            "orderBy": query.orderBy == 'true' ? true : false,
            "orderByKind": query.orderByKind || "total_assets",
            "EPS": [ query.fromEPS || pass, query.toEPS || pass ],
            "ROE": [ query.fromROE || pass, query.toROE || pass ],
            "columnOrder": "0123"
        }
    }

    // console.log(query.EPS[0]);
    console.log(params.financials.orderBy);

    const result = await fetch("http://127.0.0.1:3000/list/data", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    const lists = await result.json();
    // console.log(lists);

    return {
        props: {
            lists: lists['data'],
            total: lists['total'],
            data: {
                orderBy: params.financials.orderBy,
                orderByKind: params.financials.orderByKind,
                EPS: params.financials.EPS,
                ROE: params.financials.ROE,
                columnOrder: params.financials.columnOrder
            },
            search: {
                count: params.count,
                page : params.page,
            }
        }
    }
}

export default List;