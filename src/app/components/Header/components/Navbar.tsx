import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    const navItems = [
        {
            id: 1,
            name: "son entryler",
            path: "/"
        },
        {
            id: 2,
            name: "rastgele entry",
            path: "/rastgele"
        },
        {
            id: 3,
            name: "#empty",
            path: "/"
        },
        {
            id: 4,
            name: "#empty",
            path: "/"
        },
        {
            id: 5,
            name: "#empty",
            path: "/"
        },
        {
            id: 6,
            name: "#empty",
            path: "/"
        },
        {
            id: 7,
            name: "#empty",
            path: "/"
        },
        {
            id: 8,
            name: "#empty",
            path: "/"
        },
    ]

    return (
        <nav className='flex  items-center gap-1 lg:gap-2 md:h-[48px]'>
            <ul className='flex flex-col gap-2 md:flex-row items-center justify-between text-sm w-full h-full'>
                {navItems.map(item => (
                    <li key={item.id} className='border-b-2 border-b-transparent hover:border-b-primary w-full h-full'>
                        <Link className="flex items-center justify-center w-full h-full" href={item.path}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li className='border-b-2 border-b-transparent hover:border-b-primary w-full h-full group relative hidden md:flex items-center justify-center cursor-pointer'>
                    ...
                    <ul className='w-full hidden group-hover:flex flex-col absolute left-0 top-full border-[1px] bg-dark z-20 border-customGray '>
                        <li className='hover:text-primary w-full h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/">
                                #empty
                            </Link>
                        </li>
                        <li className='hover:text-primary w-full h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/">
                                #empty
                            </Link>
                        </li>
                        <li className='hover:text-primary w-full h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/">
                                #empty
                            </Link>
                        </li>
                        <li className='hover:text-primary w-full h-full py-2'>
                            <Link className="flex items-center justify-center w-full h-full" href="/">
                                #empty
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
