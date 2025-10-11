"use client";

import { MousePointer2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
// import gsap from "gsap";

interface CursorProps {
  size: number;
  delay: number;
  color?: string;
}

export default function Cursor({
  size,
  delay,
  color = "#f2f2f2ff",
}: CursorProps) {
  const cursorref = useRef<HTMLDivElement>(null);
  const defaultRef = useRef<SVGSVGElement>(null);
  // const hoverRef = useRef<SVGSVGElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  // const [isClickable, setClickable] = useState(false);
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);
    // const handleOver = (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   const clickable =
    //     target.tagName === "BUTTON" ||
    //     target.tagName === "A" ||
    //     target.getAttribute("role") === "button" ||
    //     target.onclick != null ||
    //     window.getComputedStyle(target).cursor === "pointer";
    //   setClickable(clickable);
    // };
    // const checkClickable = () => {
    //   const el = document.elementFromPoint(
    //     mouseX.current,
    //     mouseY.current
    //   ) as HTMLElement | null;
    //   if (!el) return false;
    //   const clickable =
    //     el.tagName === "BUTTON" ||
    //     el.tagName === "A" ||
    //     el.getAttribute("role") === "button" ||
    //     el.onclick != null ||
    //     window.getComputedStyle(el).cursor === "pointer";
    //   return clickable;
    // };
    // const handleOut = () => setClickable(false);


    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    // window.addEventListener("mouseover", checkClickable);
    // window.addEventListener("mouseout", handleOut);

    const animate = () => {
      setPos((prev) => {
        const dx = mouseX.current - prev.x;
        const dy = mouseY.current - prev.y;
        return {
          x: prev.x + dx * delay,
          y: prev.y + dy * delay,
        };
      });
      
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      // window.removeEventListener("mouseover", checkClickable);
      // window.removeEventListener("mouseout", handleOut);
    };
  }, [delay]);


  // useEffect(() => {
  //   if (!defaultRef.current || !hoverRef.current) return;
  //   if (isClickable) {
  //     gsap.to(defaultRef.current, {
  //       scale: 0.6,
  //       opacity: 0,
  //       duration: 0.2,
  //       ease: "power2.out",
  //     });
  //     gsap.to(hoverRef.current, {
  //       scale: 1,
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: "back.out(1.7)",
  //     });
  //   } else {
  //     gsap.to(defaultRef.current, {
  //       scale: 1,
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: "back.out(1.7)",
  //     });
  //     gsap.to(hoverRef.current, {
  //       scale: 0.6,
  //       opacity: 0,
  //       duration: 0.2,
  //       ease: "power2.out",
  //     });
  //   }
  // }, [isClickable])

  if (isMobile) return null;
  
  return (
    <div
      ref={cursorref}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      className="border border-white"
    >
      <MousePointer2
        ref={defaultRef}
        width={size}
        height={size}
        color={color}
        style={{ pointerEvents: "none" }}
      />
      {/* <MousePointerClick
        ref={hoverRef}
        width={size}
        height={size}
        color={color}
        style={{ pointerEvents: "none" }}
      /> */}
    </div>
  );
}
