"use client"
import store from '@/redux/store';
import { fetchTopicData } from '@/redux/Topic/TopicSlice';
import { fetchUserProfile } from '@/redux/User/UserSlice';
import axios from 'axios';
import React from 'react';
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { MdReport, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'

interface PropTypes {
    item:any,
    topic:any,
    page:string
}

const EntryActions:React.FC<PropTypes>= ({ item, topic,page }) => {

    const { loggedUser, loginned } = useSelector((state:any) => state.user);

    const params = useSearchParams();

   const currentPage = params.get("page") ?? "1";



    type AppDispatch = typeof store.dispatch;

    const dispatch = useDispatch<AppDispatch>();


    const handleLike = async () => {
        if (loginned) {
            const res = await axios.post("http://localhost:5000/entry/like-control", { entryId: item._id, userId: loggedUser.id }).then((res) => {
                toast.success(res.data.message);
                if(page === "topic" ){
                    dispatch(fetchTopicData({title:topic.title,page:currentPage}));
                }else{
                    dispatch(fetchUserProfile(loggedUser.username));
                }
                
            })
        }
        else {
            toast.error("Giriş yapmalısın!")
        }
    }

    const handleDislike = async () => {
        if (loginned) {
            const res = await axios.post("http://localhost:5000/entry/dislike-control", { entryId: item._id, userId: loggedUser.id }).then((res) => {
                toast.success(res.data.message);
                if(page === "topic" ){
                    dispatch(fetchTopicData({title:topic.title,page:currentPage}));
                }else{
                    dispatch(fetchUserProfile(loggedUser.username));
                }
            })
        }
        else {
            toast.error("Giriş yapmalısın!")
        }
    }

    const handleFavorite = async () => {
        if (loginned) {
            const res = await axios.post("http://localhost:5000/entry/favorite-control", { entryId: item._id, userId: loggedUser.id }).then((res) => {
                toast.success(res.data.message);
                if(page === "topic" ){
                    dispatch(fetchTopicData({title:topic.title,page:currentPage}));
                }else{
                    dispatch(fetchUserProfile(loggedUser.username));
                }
            })
        }
        else {
            toast.error("Giriş yapmalısın!")
        }
    }

    const handleDelete = async () => {
        if (confirm("silmek istediğine emin misin?")) {
            const res = await axios.post("http://localhost:5000/entry/delete-entry", { topicId: topic._id, entryId: item._id, ownerId: loggedUser.id })
                .then((res:any) => {
                    toast.success(res.data.message);
                    if(page === "topic" ){
                        dispatch(fetchTopicData({title:topic.title,page:currentPage}));
                    }else{
                        dispatch(fetchUserProfile(loggedUser.username));
                    }
                }).catch((err:any) => {
                    toast.error(err.response.data.message);
                })
        }
    }


    return (
        <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-3'>
                <div onClick={handleLike} className='flex items-center gap-2'>
                    <AiFillLike className={`cursor-pointer hover:text-primary ${item.likes.includes(loggedUser.id) && loginned && "text-primary"} `} />
                    {item.likes.length}
                </div>
                <div onClick={handleDislike} className='flex items-center gap-2'>
                    <AiFillDislike  className={`cursor-pointer hover:text-primary ${item.dislikes.includes(loggedUser.id) && loginned && "text-primary"} `} />
                    {item.dislikes.length}
                </div>
                <div onClick={handleFavorite} className='flex items-center gap-2'>
                    <AiFillStar className={`cursor-pointer hover:text-primary ${item.favorites.includes(loggedUser.id) && loginned && "text-primary"} `} />
                    {item.favorites.length}
                </div>
            </div>
            <div className='flex items-center gap-2'>
                {loginned && (loggedUser.userType === "Admin" || loggedUser.username === item.owner.username) &&
                    <MdDelete onClick={handleDelete} className="text-red-500 cursor-pointer" />}
                <MdReport className='cursor-pointer hover:text-primary' />
            </div>
        </div>
    )
}

export default EntryActions