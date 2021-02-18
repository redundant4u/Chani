import { NextPage } from 'next';
import Router from 'next/router';

interface Props {
    total: Number,
    search: {
        count: Number,
        page: Number
        EPS: Number[],
        ROE: Number[],
    },
    pass: 0.1,
}

const Pagination: NextPage<Props> = ({ search, total, pass }) => {
    return (
        <div>
            <button onClick={() => Router.push(
                `?page=${Number(search.page) - 1}` +
                `&fromEPS=${search.EPS[0] || pass}`+
                `&toEPS=${search.EPS[1] || pass}`  +
                `&fromROE=${search.ROE[0] || pass}`+
                `&toROE=${search.ROE[1] || pass}`,
                '/list'
            )} disabled={ Number(search.page) <= 0 }>
                PREV
            </button>
            <button onClick={() => Router.push(
                `?page=${Number(search.page) + 1}` +
                `&fromEPS=${search.EPS[0] || pass}`+
                `&toEPS=${search.EPS[1] || pass}`  +
                `&fromROE=${search.ROE[0] || pass}`+
                `&toROE=${search.ROE[1] || pass}`,
                '/list'
            )} disabled={ Number(search.page) >= Number(total) / Number(search.count) }>
                NEXT
            </button> 
        </div>
    );
}

export default Pagination;