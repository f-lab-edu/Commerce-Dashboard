import { useEffect, useRef, useState } from 'react';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  skip?: boolean;
  initialInView?: boolean;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

export default function useInView({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  skip = false,
  initialInView = false,
  onChange,
}: IntersectionOptions = {}) {
  const [ref, setRef] = useState<Element | null>(null);
  const callbackRef = useRef<IntersectionOptions['onChange']>(onChange);
  const [state, setState] = useState<State>({
    inView: !!initialInView,
    entry: undefined,
  });

  callbackRef.current = onChange;

  useEffect(() => {
    if (!ref || skip) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const newState = {
          inView: entry.isIntersecting,
          entry,
        };

        setState(newState);

        if (callbackRef.current) {
          callbackRef.current(newState.inView, entry);
        }
      },
      { threshold, rootMargin, root },
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, root, skip]);

  return {
    ref: setRef,
    inView: state.inView,
    entry: state.entry,
  };
}
