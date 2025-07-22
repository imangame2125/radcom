'use client';
import { Button } from '@/components/button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../public/assets/images/radom-image.svg';
import background from '../../public/assets/images/first.jpg';

export default function Home() {
  const router = useRouter();

  function handleStart() {
    router.push('/step1');
  }

  return (
    <>
      <div className="relative w-full h-screen">
        <Image className="h-screen w-full opacity-20 " src={background} alt="background" />

        <div className="flex items-center justify-center mt-20 flex-col h-80 absolute top-40 left-0 right-[4%]">
          <div>
            <Image
              onClick={() => router.push('https://www.radcom.co/')}
              className="cursor-pointer"
              src={logo}
              alt="logo"
            />
          </div>
          <div className="flex mt-20 items-center justify-center">
            <Button
              size="lg"
              className="px-4 py-2.5 hover:bg-blue-300 hover:transition-transform duration-400 hover:scale-125"
              variant="link"
              onClick={handleStart}
            >
              شروع
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
