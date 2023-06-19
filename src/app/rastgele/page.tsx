"use client";
import { fetchRandomEntry } from "@/redux/Entry/EntrySlice";
import store, { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LastEntriesCard from "../components/LastEntriesList/components/LastEntriesCard";
import Loading from "../loading";

const RastgelePage = () => {
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const { randomEntryStatus }: { randomEntryStatus: string } = useSelector(
    (state: RootState) => state.entry
  );

  const fetchEntry = async () => {
    await dispatch(fetchRandomEntry());
  };

  useEffect(() => {
    fetchEntry();
  }, []);

  const handleAgainFetch = () => {
    fetchEntry();
  };

  const { randomEntry } = useSelector((state: any) => state.entry);

  return (
    <div className="flex flex-col gap-4 p-5">
      <button
        onClick={handleAgainFetch}
        className="w-full py-2 text-xs border-[1px] text-primary"
      >
        rastgele entry getir
      </button>
      {randomEntryStatus === "ready" ? (
        <LastEntriesCard entry={randomEntry} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RastgelePage;
