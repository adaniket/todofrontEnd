import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Header = ({data}) => {
  return (
    <header className="header">
      <div className="flex justify-between">
        <h3 className="font-bold">
          DO<span className="text-green-300 font-bold">WORK</span>
        </h3>
        <div className="flex gap-1 justify-center items-center font-mono font-bold">
        <h5>{data?.firstName}</h5>
        <FaRegUserCircle />
        </div>
      </div>
    </header>
  );
};

export default Header;
