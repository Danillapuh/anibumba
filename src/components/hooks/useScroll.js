import React, { useEffect, useState } from "react";

export function useScroll() {
  const [offset, setOffset] = useState(0);

  function handleScroll() {
    setOffset(window.pageYOffset);
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(offset);
  }, [offset]);

  return offset;
}
