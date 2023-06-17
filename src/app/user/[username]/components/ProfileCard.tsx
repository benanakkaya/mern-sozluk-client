import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiUserFollowFill } from 'react-icons/ri';
import AvatarSelector from './AvatarSelector';

interface ProfileCardProps {
  user: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className='flex gap-4 border-b-2 border-primary p-4'>
      <AvatarSelector user={user} />
      <div className='flex flex-col gap-2'>
        <Link href={`/user/${user?.username}`} passHref>
          <div className='text-primary'>{user?.username}</div>
        </Link>
        <div className='flex items-center gap-1 text-xs'>
          Toplam Entry: <span className='text-primary'>{user?.entries?.length}</span>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          Üyelik Tarihi:{' '}
          <span className='text-primary'>
            {new Date(user?.createdAt).toLocaleDateString('tr-TR')}
          </span>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <button className='flex items-center gap-1 rounded-md text-white p-1 bg-primary'>
            <RiUserFollowFill /> Takip Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
