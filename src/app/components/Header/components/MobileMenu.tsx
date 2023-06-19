import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import UserButtons from "./UserButtons";


const MobileMenu = () => {
  return (
    <div
      className={`md:hidden flex flex-col justify-between gap-4 px-4 py-2 bg-[#262626] transition-all duration-1000 overflow-hidden`}
    >
      <UserButtons />
      <Search />
      <Navbar />
    </div>
  );
};

export default MobileMenu;
