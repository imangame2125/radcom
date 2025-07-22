'use client';
import { Button } from '@/components/button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../public/assets/images/radom-image.svg';

export default function Home() {
  const router = useRouter();

  function handleStart() {
    router.push('/step1');
  }

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <Image priority alt="logo" src={logo} />
      </div>
      <div className="flex items-center justify-center mt-20 h-80">
        <div className="flex flex-col">
          <Button size="lg" className="px-4 py-2" variant="link" onClick={handleStart}>
            Start
          </Button>
        </div>
      </div>
    </>
  );
}
