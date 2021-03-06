import { NextPage } from 'next';
import Link from 'next/link'

interface Props {
    total: Number,
    data: {
        orderBy: boolean,
        orderByKind: string,
        EPS: Number[],
        ROE: Number[],
    }
    search: {
        count: Number,
        page: Number
    },
    pass: 0.1,
}

const Pagination: NextPage<Props> = ({ total, data, search, pass }) => {
    return (
        <div>
            <Link href={{
                query: {
                    page: Number(search.page) - 1,
                    orderBy: data.orderBy,
                    orderByKind: data.orderByKind,
                    fromEPS: Number(data.EPS[0]) || pass,
                    toEPS: Number(data.EPS[1]) || pass,
                    fromROE: Number(data.ROE[0]) || pass,
                    toROE: Number(data.ROE[1]) || pass,
                }
            }} as='/list' scroll={false}><a className={ `${Number(search.page)} >= ${Number(total)} / ${Number(search.count)} ? 1 : 0`}>Prev </a></Link>
            <Link href={{
                query: {
                    page: Number(search.page) + 1,
                    orderBy: data.orderBy,
                    orderByKind: data.orderByKind,
                    fromEPS: Number(data.EPS[0]) || pass,
                    toEPS: Number(data.EPS[1]) || pass,
                    fromROE: Number(data.ROE[0]) || pass,
                    toROE: Number(data.ROE[1]) || pass,
                }
            }} as='/list' scroll={false}>Next</Link>
        </div>
    );
}

export default Pagination;