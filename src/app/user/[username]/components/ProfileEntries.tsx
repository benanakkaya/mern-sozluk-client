"use client"
import { User } from '@/types/UserType';
import React, { useState } from 'react';
import ProfileEntryCard from './ProfileEntryCard';
// ParamsType tipini tanımladığınız tür dosyasını içe aktarın

interface ProfileEntriesProps {
  user: User;
}

const ProfileEntries: React.FC<ProfileEntriesProps> = ({user}) => {

    const [showFavorites,setShowFavorites] = useState<boolean>(false);
    const [entryLimit,setEntryLimit] = useState<number>(2);

    const handleFavorites = (value:boolean) => {
      setShowFavorites(value);
      setEntryLimit(2);
    }

    const handleLimit = () => {
      setEntryLimit((prev:number) => prev+2)
    }


  return (
    <div className='flex flex-col py-2 px-4 gap-8'>
      <div className='flex items-center gap-2 text-xs'>
        <button onClick={() => handleFavorites(false)}>
          <div  className={`${showFavorites === false ? 'border-primary text-primary' : 'text-white border-customWhite '} border-[1px] px-2 py-1 rounded-md`}>Tüm Entryler ({user?.entries?.length})</div>
        </button>
        <button onClick={() => handleFavorites(true)} >
          <div className={`${showFavorites === true ? 'border-primary text-primary' : 'text-white border-customWhite '} border-[1px] px-2 py-1 rounded-md`}>Favoriler ({user?.favorites?.length})</div>
        </button>
      </div>
      {showFavorites === true
        ? user?.favorites?.slice().reverse().slice(0,entryLimit).map((entry:any) => <ProfileEntryCard key={entry._id} entry={entry} />)
        : user?.entries?.slice().reverse().slice(0,entryLimit).map((entry:any) => <ProfileEntryCard  key={entry._id} entry={entry} />)}
        {((showFavorites === true && user?.favorites?.length > entryLimit) || (showFavorites === false && user?.entries?.length > entryLimit)) &&
        <button onClick={handleLimit} className='w-full border-[1px] border-primary py-2 text-xs text-primary '>daha fazla göster</button>
      }
    </div>
  );
};

export default ProfileEntries;
