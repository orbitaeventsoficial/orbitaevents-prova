'use client';
import type { PropsWithChildren, HTMLAttributes } from 'react';

export default function Section({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </section>
  );
}
