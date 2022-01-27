import { NextPage } from "next";
import React from "react";
import _ from "lodash";

import { ListRequestDto, ListResponseDto } from "src/list/list.dto";
import Link from "next/link";

interface Props {
  lists: ListResponseDto[];
  data: ListRequestDto;
}

const comma = function (x: String) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Data: NextPage<Props> = ({ lists, data }) => {
  const page: number = data.page;

  const ths = [
    { name: "기업명", kind: "name" },
    { name: "EPS", kind: "eps" },
    { name: "ROE", kind: "roe" },
    { name: "자산총계", kind: "total_assets" },
    { name: "당기순이익", kind: "net_income" },
  ];

  const sort = function (kind: String) {
    for (let i = 1; i < ths.length; i++) {
      const element = document.getElementsByClassName(ths[i].kind)[0].classList;

      if (kind == ths[i].kind) {
        if (data.orderBy == "asc") {
          element.remove("desc");
          element.add("asc");
        } else {
          element.remove("asc");
          element.add("desc");
        }
      } else {
        if (element.contains("asc")) {
          element.remove("asc");
        } else if (element.contains("desc")) {
          element.remove("desc");
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full dark:bg-gray-800">
                <thead className="border">
                  <tr>
                    {ths.map((th, i) => (
                      <Link
                        href={{
                          query: {
                            orderBy: data.orderBy == "asc" ? "desc" : "asc",
                            orderKind: th.kind
                          },
                        }}
                        as="/list"
                        scroll={false}
                        key={i}
                      >
                        <th
                          onClick={() => sort(th.kind)}
                          scope="col"
                          className={`${
                            th.kind
                          } text-sm font-medium text-gray-900 px-6 py-2 border-r dark:text-gray-200 dark:border-gray-500 ${
                            i == 0 ? "text-left" : "text-right"
                          }`}
                        >
                          {th.name}
                        </th>
                      </Link>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lists.map((list, i) => (
                    <tr key={i} className="border-b dark:border-gray-500">
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r dark:text-gray-300 dark:border-gray-500">
                        {list.corp.corp_name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r dark:text-gray-300 dark:border-gray-500">
                        {list.eps}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r dark:text-gray-300 dark:border-gray-500">
                        {list.roe}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r dark:text-gray-300 dark:border-gray-500">
                        {comma(list.total_assets.toString())}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right border-r dark:text-gray-300 dark:border-gray-500">
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
      <div className="flex pt-5">
        <Link href={{ query: { page: page - 1 } }} as="/list" scroll={false}>
          <a className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
        </Link>
        <Link href={{ query: { page: page + 1 } }} as="/list" scroll={false}>
          <a className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          th {
            width: 50px;
            word-break: break-all;
          }
          .asc::before {
            content: "▲";
          }
          .desc::before {
            content: "▼";
          }
        `}
      </style>
    </>
  );
};

export default Data;
