import React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const Loading = () => {
  return (
    <div className="h-[450px] w-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-4xl text-primary animate-spin duration-500" />
    </div>
  );
};

export default Loading;
