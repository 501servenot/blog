"use client";

import { MousePointer2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";

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
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);


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
    };
  }, [delay]);


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
      className="mt-3 ml-3"
    >
      <MousePointer2
        ref={defaultRef}
        width={size}
        height={size}
        color={color}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
