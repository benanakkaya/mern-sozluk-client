"use client"
import store from '@/redux/store';
import { fetchUserProfile } from '@/redux/User/UserSlice';
import React from 'react'
import Profile from './components/Profile';

interface PropTypes {
    params: {username:string}
}

/* @ts-expect-error Async Server Component */
const UserPage:React.FC<PropTypes> = async ({params}) => {

    await store.dispatch(fetchUserProfile(params.username));


    const {shownUser} = store.getState().user;


  return (
    <div className='flex flex-col gap-4 p-5'>
        <Profile user={shownUser} />
    </div>
  )
}

export default UserPage