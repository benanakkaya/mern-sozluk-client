"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Search = () => {

    const [searchIndex, setSearchIndex] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    const SearchTopic = async () => {
        const res = await axios.post("https://mern-sozluk-backend.onrender.com/topic/search-topic", { searchIndex: searchIndex.toLocaleLowerCase() });
        setSuggestions(res.data);
    }

    useEffect(() => {
        //inputa yazılan değer 2 karakterden fazla ise aramayı yapıyor, 2 karakterden az ise önerileri temizliyor
        if (searchIndex.length > 2) {
            SearchTopic();
        }
        else{
            setSuggestions([]);
        }
    }, [searchIndex])

    const handleClick = () => {
        //herhangi bir sonuca tıklandığında, input value ve öneri listesi temizleniyor
        setSuggestions([]);
        setSearchIndex("");
    }


    const itemControl = () => {
        //eğer sonuçlarda aradılan input value var mı yok mu onun kontrolünü yapıyor, yok ise bunu
        //oluşturma önerisi sunmak içim kullanacağız
        const titleControl = !suggestions.some((item:any) => item.title === searchIndex);
        return titleControl;
    }



    return (
        <div className='items-center text-sm relative flex w-full'>
            <input value={searchIndex} onChange={(e) => setSearchIndex(e.target.value)} className='px-2 py-1 md:rounded-tl-md rounded-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md w-full md:w-64 outline-none text-black' type="text" placeholder="Bir şeyler ara..." />
            <button className='bg-primary text-white px-2 py-1 rounded-tr-md rounded-br-md hidden md:block'>ARA</button>
            <ul className='absolute top-full left-0 bg-customGray w-full'>
                {/* //input value aramada bulunamadı ise öneri olarak oluşturmak ister misiniz gibi bir öneri sunuyor */}
                {searchIndex.length > 2 && itemControl() &&
                    <li key={1} onClick={handleClick} className='p-2'><Link href={`/topic/${searchIndex}`}>({searchIndex} adında bir başlık yok {false && <span>, tıkla oluştur</span>})</Link></li>
                }
                {/* //bulunan sonuçlar listeleniyor */}
                {suggestions.map((topic:any) => (
                    <li key={topic._id} onClick={handleClick} className='p-2'><Link href={`/topic/${topic.title}`}>{topic.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Search