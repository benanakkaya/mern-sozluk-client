"use client";
import { RootState } from "@/redux/store";
import { Entry } from "@/types/EntryType";
import React from "react";
import { useSelector } from "react-redux";
import LastEntriesCard from "./components/LastEntriesCard";

const LastEntries = () => {

  const { lastEntries } : { lastEntries: Entry[] } = useSelector((state: RootState) => state.entry);

  return (
    <div className="flex flex-col gap-4">
      {lastEntries.map((entry : Entry) => (
        <LastEntriesCard key={entry._id} entry={entry} />
      ))}
    </div>
  );
};

export default LastEntries;
