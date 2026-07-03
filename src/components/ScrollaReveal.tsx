import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

interface ScrollaRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  once?: boolean;
  offset?: number;
  delay?: number;
  duration?: number;
  variant?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  variants?: unknown;
  whileHover?: unknown;
  whileInView?: unknown;
}

const ScrollaReveal = ({
  children,
  as: Component = 'div',
  once = true,
  offset = 100,
  delay = 0,
  duration = 0.8,
  variant = 'up',
  className = '',
  style,
  ...props
}: ScrollaRevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-in-view');
            if (once) observer.unobserve(node);
          } else if (!once) {
            node.classList.remove('is-in-view');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: `0px 0px -${offset}px 0px`
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [offset, once]);

  return (
    <Component
      ref={ref}
      className={`scrolla scrolla-${variant} ${className}`.trim()}
      style={{
        ...style,
        ['--scrolla-delay' as string]: `${delay}ms`,
        ['--scrolla-duration' as string]: `${duration}s`
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollaReveal;
