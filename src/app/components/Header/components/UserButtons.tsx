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

    
    //çıkış yapmak için kullandığım fonksiyon
    const handleLogout = async () => {
        //logginned stateini false olarak güncelliyorum ve cookies içerisinden tokenı siliyorum
        dispatch(setLoginned(false));
        Cookies.remove("token");
    }


    return (
        <>
            {loginned === false ?
            //  Giriş yapılmamış ise Giriş Yap  ve Kayıt Ol gösteriliyor
                <div className='text-sm flex items-center justify-between gap-2 w-full md:w-auto'>
                    <Link className='text-primary px-2 py-1' href="/login">Giriş Yap</Link>
                    <Link className='text-white px-2 py-1' href="/register">Kayıt Ol</Link>
                </div>
                :
                //Eğer giriş yapılmış ise kullanıcının profilini görebildiği ben, henüz projeye dahil etmediğim mesaj ve çıkış buttonu gösteriliyor
                <div className='flex items-center justify-between gap-2 w-full md:w-auto'>
                    <Link className='px-2 py-1' href={`/user/${loggedUser.username}`}>ben</Link>
                    <Link className='px-2 py-1' href="/#">mesaj(?)</Link>
                    <button onClick={handleLogout} className='bg-primary text-white rounded-md px-2 py-1'>çıkış</button>
                </div>
            }
        </>
    )
}

export default UserButtons;