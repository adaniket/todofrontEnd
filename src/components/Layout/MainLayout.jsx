import React, { useEffect, useState } from "react";
import FooterBar from "../FooterBar/FooterBar";
import Header from "../Header/Header";
import { Toaster } from "../ui/toaster";
import { AnimatePresence } from "framer-motion";
import AnimationWrapper from "../Animation/AnimationWrapper";
import { useLocation } from "react-router-dom";
import userData from "@/store/user";

const MainLayout = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);
  const {data,setUserData} = userData()
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const location = useLocation();
  useEffect(()=>{
  const data =  localStorage.getItem("userData")
  setUserData(JSON.parse(data))
  },[])

  return (
    <div className="main-layout theme-changer">
      <Header data={data} />
      <AnimatePresence>
        <AnimationWrapper key={location.pathname}>
          <div className="content-wrapper py-5 px-5">{children}</div>
          <Toaster />
        </AnimationWrapper>
      </AnimatePresence>
      <FooterBar />
    </div>
  );
};

export default MainLayout;
