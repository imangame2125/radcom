"use client";

import { useEffect, useState } from "react";

type Data = (number | string)[][];

const ascendingSort = (a: number | string, b: number | string) => {
  return Number(a) - Number(b);
};

const descendingSort = (a: number | string, b: number | string) => {
  return Number(b) - Number(a);
};

const Result = () => {
  const [data, setData] = useState<Data>([[]]);

  const columns = Array.from({ length: data[0]?.length || 0 });
  const rows = Array.from({ length: data.length });

  useEffect(() => {
    const storedData = sessionStorage.getItem("data");
    let finalData = [[]];
    if (storedData) {
      finalData = JSON.parse(storedData);
    }

    const sortedData = finalData.map((row, index) => {
      if (index % 2 === 0) {
        return row.sort(ascendingSort);
      } else {
        return row.sort(descendingSort);
      }
    });

    setData(sortedData);
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            {columns.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {data[rowIndex].map((value, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
