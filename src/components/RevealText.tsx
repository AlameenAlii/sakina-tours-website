import { ElementType, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  as?: ElementType;
  text: string;
  className?: string;
  wordClassName?: string;
  delayStep?: number;
  once?: boolean;
};

const RevealText = ({
  as: Component = "span",
  text,
  className,
  wordClassName,
  delayStep = 52,
  once = true,
}: RevealTextProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setIsVisible(false);
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, text]);

  return (
    <Component ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn(
              "inline-block translate-y-4 opacity-0",
              isVisible && "animate-reveal-word",
              wordClassName,
            )}
            style={{ animationDelay: isVisible ? `${400 + index * delayStep}ms` : "0ms" }}
          >
            {word}
            {index < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </Component>
  );
};

export default RevealText;
