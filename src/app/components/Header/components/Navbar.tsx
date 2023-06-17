import Link from 'next/link'
import React from 'react'

const Navbar = () => {


    return (
        <nav className='flex items-center gap-2 h-12'>
            <ul className='flex items-center justify-between text-sm w-full h-full'>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/">
                        son yazılanlar
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/rastgele">
                        rastgele başlık
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #spor
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #siyaset
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #ilişkiler
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #ekonomi
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #eğitim
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full'>
                    <Link className="flex items-center justify-center w-full h-full" href="/#">
                        #troll
                    </Link>
                </li>
                <li className='hover:border-b-2 hover:border-b-primary w-[100px] h-full group relative flex items-center justify-center cursor-pointer'>
                    ...
                    <ul className='hidden group-hover:flex flex-col absolute left-0 top-full border-[1px] bg-dark z-20 border-customGray '>
                        <li className='hover:text-primary w-[100px] h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/#">
                                #troll
                            </Link>
                        </li>
                        <li className='hover:text-primary w-[100px] h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/#">
                                #troll
                            </Link>
                        </li>
                        <li className='hover:text-primary w-[100px] h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/#">
                                #troll
                            </Link>
                        </li>
                        <li className='hover:text-primary w-[100px] h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/#">
                                #troll
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
