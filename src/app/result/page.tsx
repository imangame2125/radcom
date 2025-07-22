'use client';

import { useEffect, useState } from 'react';

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
    const storedData = sessionStorage.getItem('data');
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
    <div className=" flex items-center justify-center flex-col h-[700px]">
      <table className=" mt-20 border border-gray-300">
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr className="px-4 py-4 border border-gray-200 text-center" key={rowIndex}>
              {data[rowIndex].map((value, colIndex) => (
                <td key={colIndex} className="px-4 py-4 border border-gray-200">
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
