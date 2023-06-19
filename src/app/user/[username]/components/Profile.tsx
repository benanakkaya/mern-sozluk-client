"use client"
import store, { RootState } from '@/redux/store';
import { setShownUser } from '@/redux/User/UserSlice';
import { User } from '@/types/UserType';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import ProfileEntries from './ProfileEntries';

interface PropTypes {
    user: User
}


const Profile: React.FC<PropTypes> = ({user}) => {

    type AppDispatch = typeof store.dispatch;


  const { shownUser } : {shownUser: User} = useSelector((state: RootState) => state.user);


  return (
    <div className='flex flex-col gap-6'>
      <ProfileCard user={shownUser} />
      <ProfileEntries  user={shownUser} />
    </div>
  );
};

export default Profile;
