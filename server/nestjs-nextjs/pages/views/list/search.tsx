import { NextPage } from 'next';
import Router from 'next/router';

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

    return (
        <>
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
        </>
    );
}

export default Search;