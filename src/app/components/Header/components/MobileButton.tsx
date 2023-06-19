import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface PropTypes {
  setMobileMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileButton: React.FC<PropTypes> = ({ setMobileMenuVisibility }) => {
  return (
    <button
      onClick={() => setMobileMenuVisibility((prev: boolean) => !prev)}
      className="text-2xl block md:hidden"
    >
      <AiOutlineMenu />
    </button>
  );
};

export default MobileButton;
