import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

interface InViewTriggerProps {
  onInView: (entry?: IntersectionObserverEntry) => void;
  onOutView?: (entry?: IntersectionObserverEntry) => void;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  disabled?: boolean;
  debounce?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function InViewTrigger({
  onInView,
  onOutView,
  threshold = 0,
  rootMargin = '0px',
  root = null,
  triggerOnce = false,
  disabled = false,
  debounce = 0,
  children,
  className,
  style,
}: InViewTriggerProps) {
  const [ref, setRef] = useState<Element | null>(null);
  const hasTriggeredRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onInViewRef = useRef(onInView);
  const onOutViewRef = useRef(onOutView);

  onInViewRef.current = onInView;
  onOutViewRef.current = onOutView;

  useEffect(() => {
    if (!ref || disabled) return;

    const executeCallback = (entry: IntersectionObserverEntry) => {
      hasTriggeredRef.current = true;
      onInViewRef.current(entry);
    };

    const handleInView = (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    ) => {
      if (triggerOnce && hasTriggeredRef.current) {
        return;
      }

      if (debounce > 0) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(
          () => executeCallback(entry),
          debounce,
        );
      } else {
        executeCallback(entry);
      }

      if (triggerOnce) {
        observer.disconnect();
      }
    };

    const handleOutView = (entry: IntersectionObserverEntry) => {
      if (onOutViewRef.current) {
        onOutViewRef.current(entry);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        handleInView(entry, observer);
      } else {
        handleOutView(entry);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root,
    });

    observer.observe(ref);

    return () => {
      observer.disconnect();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [ref, threshold, rootMargin, root, triggerOnce, disabled, debounce]);

  useEffect(() => {
    if (!disabled) {
      hasTriggeredRef.current = false;
    }
  }, [disabled]);

  return (
    <div ref={setRef} className={className} style={style}>
      {children}
    </div>
  );
}
