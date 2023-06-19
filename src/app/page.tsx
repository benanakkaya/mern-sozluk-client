"use client";
import { fetchLastEntries } from "@/redux/Entry/EntrySlice";
import store, { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LastEntries from "./components/LastEntriesList";
import Loading from "./loading";

export default function Home() {
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const fetchEntries = async () => {
    await dispatch(fetchLastEntries());
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleRefresh = async () => {
    fetchEntries();
  }

  const {lastEntriesStatus} : {lastEntriesStatus:string} = useSelector((state:RootState) => state.entry);

  return (
    <div className="flex flex-col gap-4 p-5">
      <button
        onClick={handleRefresh}
        className="w-full py-2 text-xs border-[1px] text-primary"
      >
        son entryleri yenile
      </button>
      {lastEntriesStatus === "ready" ? 
      <LastEntries />
      : 
      <Loading />
    }
    </div>
  );
}
