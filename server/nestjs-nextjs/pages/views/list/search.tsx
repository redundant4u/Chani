import { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import $ from 'jquery';
import 'select2';

interface Props {
    search: {
        count: Number,
        page: Number
    },
}

const Search: NextPage<Props> = ({ search }) => {
    let refs: (HTMLInputElement | null)[] = [];
    const divs = [
        { name: 'From EPS', id: 'fromEPS' },
        { name: 'to EPS', id: 'toEPS' },
        { name: 'From ROE', id: 'fromROE' },
        { name: 'To ROE', id: 'toROE' }
    ];

    const _changeFocus = (e: any, index: number) => {
        if (e.key === 'Enter') refs[index + 1]?.focus();
    }

    const _test = (e: any) => {
        console.log(e.target.value);
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
            </Head>
            {
                useEffect(() => {
                        $('.select2').select2({
                        });
                })
            }
            <div>
                <span>종목 검색 </span>
                <select className="select2" name="test">
                    <option value="1">testrrfwfw</option>
                    <option value="2">test2</option>
                    <option value="3">test3</option>
                </select>
            </div>
            <div className="form-inline" role="form">
            {
                divs.map((info, index) => (
                    <div className="form-group" key={index}>
                        <span>{info.name} </span>
                        <input
                            id={info.id}
                            className="form-control w70"
                            type="text"
                            ref={(ref) => refs[index] = ref}
                            onKeyPress={(e) => _changeFocus(e, index)}
                        />
                    </div>
                ))
            }
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
            <button onClick={() => { Router.push('', '/list'); }}>
                reset
            </button>
        </>
    );
}

export default Search;