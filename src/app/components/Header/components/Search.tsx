"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Search = () => {

    const [searchIndex, setSearchIndex] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    const SearchTopic = async () => {
        const res = await axios.post("http://localhost:5000/topic/search-topic", { searchIndex: searchIndex.toLocaleLowerCase() });
        setSuggestions(res.data);
    }

    useEffect(() => {
        if (searchIndex.length > 2) {
            SearchTopic();
        }
        else{
            setSuggestions([]);
        }
    }, [searchIndex])

    const handleClick = () => {
        setSuggestions([]);
        setSearchIndex("");
    }


    const itemControl = () => {
        const titleControl = !suggestions.some((item:any) => item.title === searchIndex);
        return titleControl;
    }



    return (
        <div className='flex items-center text-sm relative'>
            <input value={searchIndex} onChange={(e) => setSearchIndex(e.target.value)} className='px-2 py-1 rounded-tl-md rounded-bl-md w-64 outline-none text-black' type="text" placeholder="Bir şeyler ara..." />
            <button className='bg-primary text-white px-2 py-1 rounded-tr-md rounded-br-md'>ARA</button>
            <ul className='absolute top-full left-0 bg-customGray w-full'>
                {searchIndex.length > 2 && itemControl() &&
                    <li key={1} onClick={handleClick} className='p-2'><Link href={`/topic/${searchIndex}`}>({searchIndex} adında bir başlık yok {false && <span>, tıkla oluştur</span>})</Link></li>
                }
                {suggestions.map((topic:any) => (
                    <li key={topic._id} onClick={handleClick} className='p-2'><Link href={`/topic/${topic.title}`}>{topic.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Search