import { NextPage } from 'next';
import Head from 'next/head';
import { ListEntity } from '../../../src/entities/list.entity';

interface Props {
    lists: ListEntity[]
}

const Data: NextPage<Props> = ({ lists }) => {
    return (
        <>
            <Head>
                   <link href="https://unpkg.com/bootstrap-table@1.18.2/dist/bootstrap-table.min.css" rel="stylesheet" />
                   <script src="https://unpkg.com/bootstrap-table@1.18.2/dist/bootstrap-table.min.js" />
                   {/* <script type="text/javascript" src="/static/list.js" /> */}
            </Head>
            <style jsx>{`
                td {
                    width: 50px;
                    word-break: break-all;
                }
            `}
            </style>
            <div className="table-responsive"> 
               <table id="table" className="table table-hover table-striped" data-toggle="table" data-toobar=".toolbar"
                   data-pagination="true" data-page-size="20" data-page-list="[30, 50, all]" data-search="true"
               >
                    <thead>
                       <tr>
                           <th data-field="corpname" data-sort-order="desc" data-sortable="true">기업명</th>
                           <th data-field="stock_code" data-sort-order="desc" data-sortable="true">종목코드</th>
                           <th data-field="eps" data-sort-order="desc" data-sortable="true">EPS</th>
                           <th data-field="roe" data-sort-order="desc" data-sortable="true">ROE</th>
                           <th data-field="total_equity" data-sort-order="desc" data-sortable="true">자본총계</th>
                           <th data-field="net_income" data-sort-order="desc" data-sortable="true">당기순이익</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
                       lists.map((list, index) =>(
                           <tr key={index}>
                               <td>test</td>
                               <td>{ list.stock_code }</td>
                               <td>{ list.eps }</td>
                               <td>{ list.roe }</td>
                               <td>{ list.total_assets }</td>
                               <td>{ list.net_income }</td>
                           </tr>
                       ))
                   }
                   </tbody>
               </table>
               
            </div>
        </>
    );
}

export default Data;