// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo(0, 0); // Instant scroll
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
