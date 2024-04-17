"use client";
import Loading from "@/app/loading";
import store, { RootState } from "@/redux/store";
import { fetchTopics } from "@/redux/Topic/TopicSlice";
import { Topic } from "@/types/TopicType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";


const List = () => {
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const { topicList, topicListStatus } = useSelector(
    (state: RootState) => state.topic
  );

  const handleRefresh = () => {
    dispatch(fetchTopics());
  };

  useEffect(() => {
    dispatch(fetchTopics());
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 border-r-[1px] p-4 md:p-3 border-customGray">
      <strong className="flex items-center gap-3 text-lg ">
        Güncel Başlıklar{" "}
        <BiRefresh
          onClick={() => handleRefresh()}
          className="text-primary cursor-pointer"
        />
      </strong>
      <div className="flex flex-col ">
        {topicListStatus === "ready" ? (
          topicList.map((topic: Topic) => (
            <Link
              key={topic._id}
              className="py-[1.5px] w-full flex items-center justify-between border-b-[1px] border-customGray"
              href={`/topic/${topic.title}`}
            >
              {topic.title}
              <span className="text-primary text-right">
                {topic.entries.length}
              </span>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default List;
