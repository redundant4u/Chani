import * as React from 'react';
import { NextPage } from 'next';

const Table : NextPage = () => {
    return (
        <div style={{ height: "100vh" }}>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>기업명</th>
                            <th>EPS</th>
                            <th>ROE</th>
                            <th>자본총계</th>
                            <th>당기순이익</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;