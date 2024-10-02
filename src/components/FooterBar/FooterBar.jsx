import React from "react";
import { GoHome } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FooterBar = () => {
  const navigate = useNavigate()
  const handleLogOut =()=>{
    localStorage.setItem("logIn","")
    navigate("/login")
  }
  return (
    <footer className="footer-bar-wrapper">
      <div className="flex justify-between flex-row">
        <div className="p-1">
          <Link to={"/dashboard"}>
            <GoHome />
          </Link>
        </div>
        <div className="p-1">
          <Link to={"/list-page"}>
            <CiViewList />
          </Link>
        </div>
        <div className="p-1">
          <IoIosLogOut onClick={handleLogOut}/>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
