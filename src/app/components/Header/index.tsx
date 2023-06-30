"use client";
import Link from "next/link";
import React, { useState } from "react";
import MobileButton from "./components/MobileButton";
import MobileMenu from "./components/MobileMenu";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import UserButtons from "./components/UserButtons";

const Header = () => {
  const [mobileMenuVisibility, setMobileMenuVisibility] =
    useState<boolean>(false);

  return (
    <header className=" bg-dark text-white border-t-4 border-t-primary px-4 lg:px-10 xl:px-16 pb-4 md:pb-0 pt-4 border-b-[1px]  border-b-customGray flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link className="text-primary font-bold text-3xl" href="/">
            mern<span className="text-white">sozluk</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <div className="hidden md:block">
          <UserButtons />
        </div>
        <MobileButton setMobileMenuVisibility={setMobileMenuVisibility} />
      </div>
      {mobileMenuVisibility && <MobileMenu />}
      <div className="hidden md:block">
        <Navbar />
      </div>
    </header>
  );
};
export default Header;
