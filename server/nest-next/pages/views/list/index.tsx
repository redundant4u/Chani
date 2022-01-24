import { GetStaticProps, NextPage, NextPageContext } from "next";
import { ListRequestDto, ListResponseDto } from "src/list/list.dto";
import Axios from 'axios';
import dynamic from "next/dynamic";

interface Props {
  lists: ListResponseDto[];
  page: number;
}

const Data = dynamic(() => import('./data'));

const List: NextPage<Props> = ({ lists, page }) => {
  return (
    <Data lists={lists} page={page} />
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  const url = "http://127.0.0.1:3000/list/data";

  const req: ListRequestDto = {
    count: Number(query.count) || 15,
    page: Number(query.page) || 0,
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

  console.log(result['data']);

  return {
    props: {
      lists: result['data'],
      page: req.page
    }
  };
}

export default List;
