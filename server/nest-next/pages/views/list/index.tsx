import { GetStaticProps, NextPage, NextPageContext } from "next";
import { ListRequestDto, ListResponseDto } from "src/list/list.dto";
import Axios from 'axios';
import dynamic from "next/dynamic";

interface Props {
  lists: ListResponseDto[];
  data: ListRequestDto;
}

const Data = dynamic(() => import('./data'));

const List: NextPage<Props> = ({ lists, data }) => {
  return (
    <Data lists={lists} data={data} />
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  const url = "http://127.0.0.1:3000/list/data";

  const req: ListRequestDto = {
    count: Number(query.count) || 15,
    page: Number(query.page) || 0,
    orderBy: String(query.orderBy),
    orderKind: String(query.orderKind),
    financials: {
      EPS: [ Number(query.fromEPS), Number(query.toEPS) ],
      ROE: [ Number(query.fromROE), Number(query.toROE) ],
    }
  };

  const result = await Axios.post(
    url, req,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return {
    props: {
      lists: result['data'],
      data: req
    }
  };
}

export default List;
