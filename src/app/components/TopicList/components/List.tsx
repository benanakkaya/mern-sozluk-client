"use client";
import store from "@/redux/store";
import { fetchTopics } from "@/redux/Topic/TopicSlice";
import { TopicType } from "@/types/TopicType";
import Link from "next/link";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const { topicList, topicListStatus } = useSelector(
    (state: any) => state.topic
  );

  const handleRefresh = () => {
    dispatch(fetchTopics());
  }

  return (
    <div className="h-screen flex flex-col gap-4 border-r-[1px] p-3 border-customGray">
      <strong className="flex items-center gap-3 text-lg ">
        Güncel Başlıklar{" "}
        <BiRefresh
          onClick={() => handleRefresh()}
          className="text-primary cursor-pointer"
        />
      </strong>

      <div className="flex flex-col">
        {topicListStatus === "ready" ? (
          topicList.map((item: TopicType) => (
            <Link
              key={item._id}
              className="py-[1px] w-full flex items-center justify-between"
              href={`/topic/${item.title}`}
            >
              {item.title}
              <span className="text-primary text-right">
                {item.entries.length}
              </span>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin duration-500 text-primary text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
