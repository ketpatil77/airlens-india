import { useEffect, useState } from "react";

export const useMouseParallax = (depth = 12): { x: number; y: number } => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      const x = (event.clientX / window.innerWidth - 0.5) * depth;
      const y = (event.clientY / window.innerHeight - 0.5) * depth;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [depth]);

  return position;
};
