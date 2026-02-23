import { useEffect, useEffectEvent, useState } from "react";

export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useEffectEvent(() => {
    setScrolled(window.scrollY > 20);
  });

  useEffect(() => {
    // prettier-ignore
    if (window.scrollY > 20)
        onScroll();
    const handleScroll = () => onScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}
