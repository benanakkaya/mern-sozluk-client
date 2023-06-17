"use client"
import store from "@/redux/store";
import { fetchRandomTopic } from "@/redux/Topic/TopicSlice";
import {useEffect} from "react"
import { useDispatch } from "react-redux";
import EntryList from "./topic/[topicName]/components/EntryList";

export default function Home() {
  
 
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const fetchTopic = async() => {
      await dispatch(fetchRandomTopic());
  }

  useEffect(() => {
      fetchTopic();
  },[])



  return (
    <div className='flex flex-col gap-4 p-5'>
    <EntryList />
  </div>
  )
}
