"use client";

import { MousePointer2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

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
    >
      <MousePointer2 width={size} height={size} color={color} />
      {/* <svg
        className="iconpark-icon"
        width={size}
        height={size}
        style={{ fill: color, color: color }}
      >
        <use href="#cursor"></use>
      </svg> */}
    </div>
  );
}
