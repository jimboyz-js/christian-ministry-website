/**
 * @update 05-05-2026 12:49 PM Wed.
 * @author jimboyz-js
 * @param { width_dim } is a width dimension
 * @returns isMobile
 */

import React, { useEffect, useState } from "react";

const screenDev = (width_dim = "(max-width: 768px)") => {
  const [screenDim, setScreenDim] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(width_dim);

    const handleChange = () => {
      setScreenDim(!mediaQuery.matches);
    };

    handleChange(); // initial check
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return screenDim;
};

export default screenDev;
