'use client';

import { Button } from '@/components/button/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

type Data = (number | string)[][];

const Step2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const row = searchParams.get('row');
  const column = searchParams.get('column');

  function initialArray() {
    if (!row || !column) {
      return [];
    }
    if (isNaN(Number(row)) || isNaN(Number(column))) {
      return [];
    }
    const numRows = Number(row);
    const numColumns = Number(column);

    const rows = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
      rows[i] = new Array(numColumns).fill('');
    }

    return rows;
  }

  const [data, setData] = useState<Data>(initialArray);
  const [errors, setErrors] = useState<boolean[][]>(initialArray);

  const columns = Array.from({ length: Number(column) });
  const rows = Array.from({ length: Number(row) });

  function handleInputChange(rowIndex: number, colIndex: number, value: string) {
    if (isNaN(Number(value))) {
      const newErrors = [...errors];
      newErrors[rowIndex][colIndex] = true;
      setErrors(newErrors);
    } else {
      const newErrors = [...errors];
      newErrors[rowIndex][colIndex] = false;
      setErrors(newErrors);
    }

    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  }

  function handleSeeResults() {
    sessionStorage.setItem('data', JSON.stringify(data));
    router.push('/result');
  }

  let disableButton = false;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '' || errors[i][j]) {
        disableButton = true;
        break;
      }
    }
  }

  return (
    <div className=" flex items-center justify-center flex-col h-[700px]">
      <table className=" mt-20 border border-gray-300">
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr className="border border-gray-200" key={rowIndex}>
              {columns.map((_, colIndex) => {
                const isError = errors[rowIndex]?.[colIndex];

                return (
                  <td className="px-4 py-4 border border-gray-200" key={colIndex}>
                    <input
                      type="text"
                      className={`text-gray-900 py-2 text-center outline-none border-none bg-white w-3ك rounded-lg shadow-sm ${
                        isError ? 'border-red-400' : ''
                      } focus:outline-none`}
                      placeholder="عدد وارد فرمایید"
                      value={data[rowIndex]?.[colIndex] || ''}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        disabled={disableButton}
        onClick={handleSeeResults}
        className="mt-12 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        دیدن نتیجه
      </Button>
    </div>
  );
};

function Step2Page() {
  return (
    <Suspense>
      <Step2 />
    </Suspense>
  );
}

export default Step2Page;
