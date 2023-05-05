import { useEffect, useState } from "react";

const BackToTop = () => {
  const [toTopStyles, setToTopStyles] = useState(
    "back-to-top d-flex align-items-center justify-content-center"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // => scroll position
      if (scrollPosition > 50) {
        setToTopStyles(
          "back-to-top d-flex align-items-center justify-content-center active"
        );
      } else {
        setToTopStyles(
          "back-to-top d-flex align-items-center justify-content-center"
        );
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toTopStyles]);

  return (
    <a href="#" className={toTopStyles}>
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
};

export default BackToTop;
