"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import EntryCard from "./EntryCard";


const EntryList: React.FC = () => {


  const { currentTopic } = useSelector(
    (state: RootState) => state.topic
  );


  return (
    <div className="flex flex-col gap-4">
          <Link href={`/topic/${currentTopic?.title}`} className="text-2xl font-bold text-primary">
            {currentTopic?.title}
          </Link>
          {currentTopic?.entries?.length > 0 ? (
            currentTopic?.entries?.map((item: any) => (
              <EntryCard topic={currentTopic} key={item._id} item={item} />
            ))
          ) : (
            <div className="italic">Bu başlığa henüz bir entry girilmemiş.</div>
          )}
    </div>
  );
};

export default EntryList;
