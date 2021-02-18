import { NextPage } from 'next';
import { ListEntity } from '../../../src/entities/list.entity';

interface Props {
    lists: ListEntity[]
}

const Data: NextPage<Props> = ({ lists }) => {
    return (
        <>
            <style jsx>{`
                td {
                    width: 50px;
                    word-break: break-all;
                }
            `}
            </style>
            <div className="table-responsive"> 
               <table id="table" className="table table-hover table-striped">
                    <thead>
                       <tr>
                           <th>기업명</th>
                           <th>종목코드</th>
                           <th>EPS</th>
                           <th>ROE</th>
                           <th>자본총계</th>
                           <th>당기순이익</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
                       lists.map((list, index) =>(
                           <tr key={index}>
                               {/* <td>{ list.corporation[0]. }</td>
                               <td>{ list.corporation.stock_code }</td> */}
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