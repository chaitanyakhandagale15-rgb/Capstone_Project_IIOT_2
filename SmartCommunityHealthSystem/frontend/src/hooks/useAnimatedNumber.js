import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function useAnimatedNumber(value, format = (v) => Math.round(v)) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });
    return controls.stop;
  }, [value]);

  return format(displayValue);
}
