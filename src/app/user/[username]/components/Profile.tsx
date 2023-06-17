"use client"
import store from '@/redux/store';
import { setShownUser } from '@/redux/User/UserSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import ProfileEntries from './ProfileEntries';

interface PropTypes {
    user: any
}


const Profile: React.FC<PropTypes> = ({user}) => {

    type AppDispatch = typeof store.dispatch;

    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(setShownUser(user));
    },[])


  const { shownUser } = useSelector((state: any) => state.user);


  return (
    <div className='flex flex-col gap-6'>
      <ProfileCard user={shownUser} />
      <ProfileEntries  user={shownUser} />
    </div>
  );
};

export default Profile;
