import Link from 'next/link';
import React from 'react'

interface PropTypes {
    searchParams: any
}

const UserActivate = async (token:string) => {
    const res = await fetch(`https://mern-sozluk-backend.onrender.com/user/activate/${token}`, {cache: 'no-store'});
    const data = await res.json();
    return data;
}

const ActivatePage:React.FC<PropTypes> = async ({searchParams}) => {


    const {message,activated} = await UserActivate(searchParams.key);

  return (
    <div className='w-full items-center justify-center p-5'>
        <div className='w-full py-5 items-center justify-center text-xl border-[1px] border-primary flex flex-col gap-4'>
    {message}
    {activated && <Link href="/login" className='text-lg text-primary'>Giriş Yap</Link>}
    </div>
    
    </div>
  )
}

export default ActivatePage
