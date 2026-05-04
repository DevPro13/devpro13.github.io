import { useEffect } from "react";
import "./CustomCursor.css";
export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);

    // Hover effect on links
    const links = document.querySelectorAll("a, button");

    links.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-grow");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-grow");
      });
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <div className="cursor"></div>;
}