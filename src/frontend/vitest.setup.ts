import '@testing-library/jest-dom';
import React from 'react';

// ─── Framer Motion mock ───────────────────────────────────────────────
// Strip all animation-specific props so React DOM elements don't warn
const ANIM_PROPS = new Set([
  'initial', 'animate', 'exit', 'variants', 'transition',
  'whileInView', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag',
  'viewport', 'layoutId', 'layout', 'custom', 'dragConstraints',
  'onAnimationStart', 'onAnimationComplete', 'onUpdate',
]);

function makeMotionEl(tag: string) {
  const Comp = React.forwardRef<Element, Record<string, unknown>>(
    ({ children, ...props }, ref) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!ANIM_PROPS.has(k)) safe[k] = v;
      }
      return React.createElement(tag, { ...safe, ref }, children as React.ReactNode);
    }
  );
  Comp.displayName = `motion.${tag}`;
  return Comp;
}

vi.mock('framer-motion', async () => {
  return {
    motion: {
      div: makeMotionEl('div'),
      h1: makeMotionEl('h1'),
      h2: makeMotionEl('h2'),
      p: makeMotionEl('p'),
      span: makeMotionEl('span'),
      button: makeMotionEl('button'),
      header: makeMotionEl('header'),
      section: makeMotionEl('section'),
      article: makeMotionEl('article'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useInView: () => true,
    useMotionValue: (v: number) => ({ get: () => v, set: () => {} }),
    useTransform: (_: unknown, fn: (v: number) => unknown, ..._rest: unknown[]) =>
      typeof fn === 'function' ? fn(0) : 0,
    animate: vi.fn(),
  };
});

// ─── Next.js font mock ───────────────────────────────────────────────
vi.mock('next/font/google', () => ({
  Barlow_Condensed: () => ({ variable: '--font-barlow', className: 'barlow' }),
  DM_Sans: () => ({ variable: '--font-dm-sans', className: 'dm-sans' }),
}));

// ─── Next.js navigation mock ─────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

// ─── Next.js Link mock — renders as plain <a> ─────────────────────────
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: {
    children: React.ReactNode;
    href: string;
    [k: string]: unknown;
  }) => React.createElement('a', { href, ...props }, children),
}));
