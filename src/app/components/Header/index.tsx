import Link from 'next/link'
import React from 'react'
import Navbar from './components/Navbar';
import Search from './components/Search';
import UserButtons from './components/UserButtons';

const Header = () => {
    return (
        <header className='bg-dark text-white border-t-4 border-t-primary px-16 pt-4 border-b-[1px]  border-b-customGray flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-32'>
                    <Link className='text-primary font-bold text-3xl' href="/#">mern<span className='text-white'>sozluk</span></Link>
                    <Search />
                </div>
                <UserButtons />
            </div>
            <Navbar />
        </header>
    )
}
export default Header
