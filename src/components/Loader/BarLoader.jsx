import React from "react";
import { Bars } from "react-loader-spinner";

const BarLoader = ({height,width}) => {
  return (
    <Bars
      height={height || "80"}
      width={width || "80"}
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default BarLoader;
