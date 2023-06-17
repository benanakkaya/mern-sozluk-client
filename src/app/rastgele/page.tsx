"use client";
import store from "@/redux/store";
import { fetchRandomTopic } from "@/redux/Topic/TopicSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EntryList from "../topic/[topicName]/components/EntryList";

const RastgelePage = () => {

    type AppDispatch = typeof store.dispatch;

    const dispatch = useDispatch<AppDispatch>();

    const fetchTopic = async() => {
        const bok = await dispatch(fetchRandomTopic());
        console.log(bok)
    }

    useEffect(() => {
        fetchTopic();
    },[])

    const handleAgainFetch = () => {
        fetchTopic();
    }



  return (
    <div className="flex flex-col gap-4 p-5">
      <button onClick={handleAgainFetch} className="w-full py-2 text-xs border-[1px] text-primary">
        yeniden getir
      </button>
      <EntryList />
    </div>
  );
};

export default RastgelePage;
