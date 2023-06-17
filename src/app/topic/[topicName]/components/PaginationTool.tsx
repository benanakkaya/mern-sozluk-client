"use client";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import { useSelector } from "react-redux";

interface PropTypes {
  currentPage: number;
  setCurrentPage:React.Dispatch<any>;
}

const PaginationTool: React.FC<PropTypes> = ({ currentPage,setCurrentPage }) => {


    const {currentTopic: topic} = useSelector((state:any) => state.topic);

    const router = useRouter();


  const totalPages = topic?.totalPages;

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePage = (value:string) => {
    setCurrentPage(Number(value));
    router.push(`${topic?.title}?page=${value}`)
  }


  return (
    <>
      {totalPages > 1 && (
        <div className="w-full flex items-center justify-end">
          <div className="flex items-center gap-1">
            <select onChange={(e:any) => handlePage(e.target.value)} className="bg-dark border-[1px] border-white p-1 rounded-md text-xs h-max">
              {pages.map((page) => (
                <option  selected={currentPage == page ? true : false} value={page}>{page}</option>
              ))}
            </select>
            <span>/</span>
            <button className="bg-dark border-[1px] border-white px-2 py-1 rounded-md text-xs h-max">
              {totalPages}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationTool;
