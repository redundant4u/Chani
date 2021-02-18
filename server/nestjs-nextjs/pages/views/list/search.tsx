import { NextPage } from 'next';
import Router from 'next/router';

interface Props {
    search: {
        count: Number,
        page: Number
    },
}

const Search: NextPage<Props> = ({ search }) => {
    return (
        <>
            <div className="form-inline" role="form">
                <div className="form-group">
                     <span>From EPS </span>
                   <input id="fromEPS" className="form-control w70" type="text" />
                </div>
                <div className="form-group">
                    <span>To EPS </span>
                    <input id="toEPS" className="form-control w70" type="text" />
                </div>
            </div>
            <div className="form-inline" role="form">
                <div className="form-group">
                     <span>From ROE </span>
                   <input id="fromROE" className="form-control w70" type="text" />
                </div>
                <div className="form-group">
                    <span>To ROE </span>
                    <input id="toROE" className="form-control w70" type="text" />
                </div>
            </div>
            <button onClick={() => {
                const fromEPS = (document.getElementById('fromEPS') as HTMLInputElement).value;
                const toEPS   = (document.getElementById('toEPS')   as HTMLInputElement).value;
                const fromROE = (document.getElementById('fromROE') as HTMLInputElement).value;
                const toROE   = (document.getElementById('toROE')   as HTMLInputElement).value;

                Router.push(
                    `?page=${search.page}`+
                    `&fromEPS=${fromEPS}` +
                    `&toEPS=${toEPS}`     +
                    `&fromROE=${fromROE}` +
                    `&toROE=${toROE}`
                , '/list');
            }}>
                OK
            </button>
        </>
    );
}

export default Search;