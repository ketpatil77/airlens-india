import { useEffect, useState } from "react";

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = (): void => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? window.scrollY / height : 0;
      setProgress(Math.min(Math.max(ratio, 0), 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return progress;
};
