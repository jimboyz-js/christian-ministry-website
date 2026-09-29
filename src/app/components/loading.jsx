import React from "react";

const Spinner = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="border-4 border-solid border-[rgba(0,0,0,0.1)] border-l-blue-700 rounded-full w-[40px] h-[40px] animate-[spin_2s_linear_infinite]z animate-spin"></div>
    </div>
  );
};

export default Spinner;
