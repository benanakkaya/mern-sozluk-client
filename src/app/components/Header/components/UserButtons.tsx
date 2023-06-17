"use client"
import { useAuth } from '@/hooks/auth';
import { setLoginned } from '@/redux/User/UserSlice';
import Cookies from 'js-cookie';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';


const UserButtons = () => {

    const { loginned,loggedUser } = useSelector((state: any) => state.user);


    const dispatch = useDispatch();

    useEffect(() => {
        const authControl = async () => {
            const logged = await useAuth();
            dispatch(setLoginned(logged));
          };
          authControl();
    },[]);

    
    const handleLogout = async () => {
        dispatch(setLoginned(false));
        Cookies.remove("token");
    }


    return (
        <>
            {loginned === false ?
                <div className='text-sm flex items-center gap-2'>
                    <Link className='text-primary px-2 py-1' href="/login">Giriş Yap</Link>
                    <Link className='text-white px-2 py-1' href="/register">Kayıt Ol</Link>
                </div>
                :
                <div className='flex items-center gap-2'>
                    <Link className='px-2 py-1' href={`/user/${loggedUser.username}`}>ben</Link>
                    <Link className='px-2 py-1' href="/#">mesaj</Link>
                    <button onClick={handleLogout} className='bg-primary text-white rounded-md px-2 py-1'>çıkış</button>
                </div>
            }
        </>
    )
}

export default UserButtons;