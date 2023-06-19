
import EntryActions from '@/app/topic/[topicName]/components/EntryActions';
import { Entry } from '@/types/EntryType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface EntryCardProps {
  entry: Entry
}

const ProfileEntryCard: React.FC<EntryCardProps> = ({ entry}) => {
  return (
    <div className='flex flex-col gap-3'>
      <Link href={`/topic/${entry?.topic?.title}`} passHref>
        <div className='text-primary'>{entry?.topic?.title}</div>
      </Link>
      <div className='flex flex-col w-full gap-5'>
        <p dangerouslySetInnerHTML={{ __html: entry?.text }}></p>
        <EntryActions  page={"user"} topic={entry?.topic} item={entry} />
        <div className='flex items-center justify-end text-sm gap-3'>
          <div className='flex flex-col items-end'>
            <Link href={`/user/${entry?.owner?.username}`} passHref>
              <div className='text-primary'>{entry?.owner?.username}</div>
            </Link>
            <small className='text-customGray'>
              {new Date(entry?.createdAt).toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
          <Image
            className='w-8 h-8 rounded-full'
            alt='avatar'
            src={
              entry?.owner?.avatar
                ? entry?.owner?.avatar
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232"
            }
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEntryCard;
