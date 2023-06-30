"use client"
import EntryCard from "@/app/topic/[topicName]/components/EntryCard";
import { Entry } from "@/types/EntryType";
import Link from "next/link";
import React from "react";

interface PropTypes {
    entry: Entry;
}

const LastEntriesCard:React.FC<PropTypes> = ({entry}) => {

  return (
    <div className="flex flex-col gap-4 border-b-[1px] border-customGray py-2">
      <Link
        href={`/topic/${entry?.topic?.title}`}
        className="text-2xl font-bold text-primary"
      >
        {entry?.topic?.title}
      </Link>
      <EntryCard page="last" topic={entry?.topic} key={entry._id} item={entry} />
    </div>
  );
};

export default LastEntriesCard;
