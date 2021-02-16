import { NextPage, NextPageContext } from 'next';
import { ListEntity } from '../../../src/entities/list.entity';
import dynamic from 'next/dynamic'
import Router from 'next/router'

interface Props {
    lists: ListEntity[],
    total: Number,
    search: {
        count: Number,
        page: Number
        fromEPS: Number,
        toEPS: Number,
    }
}

// ssr: false 설정을 해야 table 속성들이 적용된다.
const Data = dynamic(() => import('./data'), { ssr: false });

const List: NextPage<Props> = ({ lists, total, search }) => {
    return (
        <div className="body">
            <div className="form-inline" role="form">
                <div className="form-group">
                     <span>From EPS </span>
                   <input id="fromeps" className="form-control w70" type="text" />
                </div>
                <div className="form-group">
                    <span>To EPS </span>
                    <input id="toeps" className="form-control w70" type="text" />
                </div>
                <button onClick={() => {
                    const fromEPS = (document.getElementById('fromeps') as HTMLInputElement).value;
                    const toEPS   = (document.getElementById('toeps')   as HTMLInputElement).value;
                    Router.push(`?page=${search.page}&fromEPS=${fromEPS}&toEPS=${toEPS}`, '/list');
                }}>
                    OK
                </button>
            </div>
            <p>total: { total } page: { search.page } count: { search.count }</p>
            <p>fromEPS: { search.fromEPS  } toEPS: { search.toEPS }</p>
            <Data lists={lists} />
            <button onClick={() => Router.push(
                `?page=${Number(search.page) - 1}&fromEPS=${search.fromEPS || 0.1}&toEPS=${search.toEPS || 0.1}`,
                '/list'
            )} disabled={ Number(search.page) <= 0 }>
                PREV
            </button>
            <button onClick={() => Router.push(
                `?page=${Number(search.page) + 1}&fromEPS=${search.fromEPS || 0.1}&toEPS=${search.toEPS || 0.1}`,
                '/list'
            )} disabled={ Number(search.page) >= Number(total) / Number(search.count) }>
                NEXT
            </button> 
        </div>
    )
}

export async function getServerSideProps({query}: NextPageContext) {
    const noEPS = 0.1;
    const params = {
        "count"  : query.count   || 10,
        "page"   : query.page    || 0,
        "fromEPS": query.fromEPS || noEPS,
        "toEPS"  : query.toEPS   || noEPS
    }

    console.log(query.fromEPS);
    console.log(params);

    const result = await fetch("http://127.0.0.1:3000/list/data", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    const lists = await result.json();

    return {
        props: {
            lists: lists['data'],
            total: lists['total'],
            search: {
                count  : params.count,
                page   : params.page,
                fromEPS: params.fromEPS,
                toEPS  : params.toEPS,
            }
        }
    }
}

export default List;