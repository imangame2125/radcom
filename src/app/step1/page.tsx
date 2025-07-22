'use client';
import { Button } from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/images/radom-image.svg';
import backround from '../../../public/assets/images/back-radcom.jpg';
const Step1 = () => {
  const [dimensions, setDimensions] = useState({
    row: 3,
    column: 3,
  });

  const [dimensionsError, setDimensionsError] = useState({
    row: false,
    column: false,
  });

  const router = useRouter();

  function handleNext() {
    if (dimensionsError.row || dimensionsError.column) {
      return;
    }
    router.push('/step2?row=' + dimensions.row + '&column=' + dimensions.column);
  }

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 3 || value % 2 === 0) {
      setDimensionsError((prev) => ({ ...prev, [name]: true }));
    } else {
      setDimensionsError((prev) => ({ ...prev, [name]: false }));
    }
    setDimensions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-full justify-center items-center h-screen overflow-hidden">
      <div className="flex items-center w-1/2 ">
        <Image className="h-screen w-full" height={900} priority alt="backround" src={backround} />
      </div>
      <div className="flex items-center w-1/2 flex-col h-screen mt-20 ">
        <Image
          className="cursor-pointer"
          onClick={() => router.push('https://www.radcom.co/')}
          priority
          alt="logo"
          src={logo}
        />

        <main
          dir="rtl"
          className="flex flex-col w-[800px] mt-20 gap-[32px] py-4 row-start-2 items-center sm:items-start shadow-md bg-blue-50 px-4 rounded-2xl"
        >
          <label className="text-lg font-bold text-center ">سطر</label>
          <input
            value={dimensions.row}
            onChange={handleChange('row')}
            type="number"
            className="w-full  outline-none h-12 px-4 text text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="عدد مورد نظر رو وارد نمایید"
          />
          <p className="text-red-500">{dimensionsError.row && 'عدد باید فرد و بزرگتر از ۳ باشد'}</p>

          <label className="text-lg font-bold text-center">ستون</label>
          <input
            type="number"
            value={dimensions.column}
            onChange={handleChange('column')}
            className="w-full  outline-none h-12 px-4 text text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="عدد مورد نظر رو وارد نمایید"
          />
          <p className="text-red-500">
            {dimensionsError.column && 'عدد باید فرد و بزرگتر از ۳ باشد'}
          </p>

          <div className="flex items-center w-full justify-center">
            <Button
              variant="link"
              onClick={handleNext}
              disabled={dimensionsError.row || dimensionsError.column}
              className={`mt-4 px-4 py-2 cursor-pointer hover:bg-blue-300 hover:transition-transform duration-400 hover:scale-125  ${
                dimensionsError.row || dimensionsError.column
                  ? 'disabled:opacity-50 disabled:cursor-not-allowed'
                  : ''
              }`}
            >
              بعدی
            </Button>
          </div>
        </main>
        <p className="mt-50 text-sm font-norma ">
          کلیه حقوق این وب سایت متعلق به رادکام می‌باشد.©
        </p>
      </div>
    </div>
  );
};

export default Step1;
