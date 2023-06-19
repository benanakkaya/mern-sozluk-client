"use client"
import EntryTool from "@/app/components/EntryTool";
import store, { RootState } from "@/redux/store";
import { fetchTopicData } from "@/redux/Topic/TopicSlice";
import { Topic } from "@/types/TopicType";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EntryList from "./components/EntryList";
import PaginationTool from "./components/PaginationTool";



/* @ts-expect-error Async Server Component */
const TopicPage: React.FC<props> = (props) => {

  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const [currentPage,setCurrentPage] = useState(props?.searchParams?.page);

  const {currentTopic} : {currentTopic: Topic} = useSelector((state:RootState) => state.topic)

  const fetchTopic = async () => {
      await dispatch(fetchTopicData({title: props?.params?.topicName, page: props?.searchParams?.page}));
  }

  useEffect(() => {
    fetchTopic();
    setCurrentPage(props?.searchParams?.page ?? 1)
  },[props])

  useEffect(() => {
    setCurrentPage(props?.searchParams?.page ?? 1)
  },[currentTopic])




  return (
    <div className="flex flex-col gap-6 p-4 lg:p-5">
      <PaginationTool setCurrentPage={setCurrentPage} currentPage={currentPage}  />
      <EntryList />
      <PaginationTool setCurrentPage={setCurrentPage} currentPage={currentPage}  />
      <EntryTool />
    </div>
  );
};

export default TopicPage;
