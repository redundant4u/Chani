import { NextPage } from "next";
import React from "react";
import _ from "lodash";

import { ListResponseDto } from "src/list/list.dto";

interface Props {
  lists: ListResponseDto[];
  page: number;
}

function comma(x = "") {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Data: NextPage<Props> = ({ lists, page }) => {
  const ths = [
    { name: "기업명", kind: "name" },
    { name: "EPS", kind: "eps" },
    { name: "ROE", kind: "roe" },
    { name: "자산총계", kind: "total_assets" },
    { name: "당기순이익", kind: "net_income" },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border">
                  <tr>
                    {ths.map((th, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`text-sm font-medium text-gray-900 px-6 py-2 border-r ${
                          i == 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {th.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lists.map((list, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                        {list.corp.corp_name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r">
                        {list.eps}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r">
                        {list.roe}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r">
                        {comma(list.total_assets.toString())}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r">
                        {comma(list.net_income.toString())}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">

            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>0
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Data;
