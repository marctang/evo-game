// /hooks/useCountUp.js
import { useEffect, useState } from "react";

export function useCountUp(target, startWhenVisible, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhenVisible) return;

    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress * (2 - progress); // easeOutQuad
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [target, startWhenVisible, duration]);

  return value;
}
