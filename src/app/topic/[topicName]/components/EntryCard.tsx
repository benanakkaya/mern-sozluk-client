"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import EntryActions from './EntryActions';
import { useParams } from 'next/navigation'
import { Entry } from '@/types/EntryType';
import { Topic } from '@/types/TopicType';

interface PropTypes {
    item: Entry,
    topic: any,
    page: string
}

const EntryCard: React.FC<PropTypes> = ({ item, topic, page }) => {

    const params = useParams();

    const [entry, setEntry] = useState<string>("");

    const linkControl = (text: string) => {
        const linkRegex = /\[(.+?)\s+([\w\s:\/\.]+?)\]/g;
        const linkTemplate = '<a class="text-primary" href="$1">$2</a>';
        return text.replace(linkRegex, linkTemplate);
    }

    const bkzControl = (text: string) => {
        const linkRegex = /\(bkz:\s+([^\)]+[\w])\)/g;
        const linkTemplate = '(bkz: <a class="text-primary" href="https://mern-sozluk.vercel.app/topic/$1">$1</a>)';
        return text.replace(linkRegex, linkTemplate);
    }


    useEffect(() => {
        let entryText = linkControl(item.text);
        entryText = bkzControl(entryText);
        setEntry(entryText);;
    }, [])



    return (
        <div className='flex flex-col w-full gap-5'>
            <p dangerouslySetInnerHTML={{ __html: entry }}></p>
            {(params.topicName || params.username) &&
                <EntryActions page={page} topic={topic} item={item} />
            }
            <div className='flex items-center justify-end text-sm gap-3'>
                <div className='flex flex-col items-end'>
                    <Link href={`/user/${item.owner?.username}`} className="text-primary">{item?.owner?.username}</Link>
                    <small className='text-customGray'>{new Date(item?.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                <Image className='w-8 h-8 rounded-full' alt="avatar" src={
                    item?.owner?.avatar
                        ? item?.owner?.avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232"
                } width={200} height={200} />
            </div>
        </div>
    )
}

export default EntryCard
