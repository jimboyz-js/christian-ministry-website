import React from "react";

const Section = ({ id, className, children, ...props }) => {
  return (
    <section
      id={id}
      className={`max-w-7xl mx-auto px-4 py-4 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
