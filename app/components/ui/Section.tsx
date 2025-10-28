// app/components/ui/Section.tsx
import React from "react";

type SectionProps = {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  as: As = "section",
  className = "",
  children,
}: SectionProps) {
  const Component = As as React.ElementType;
  return (
    <Component className={`oe-section mx-auto max-w-7xl px-4 ${className}`}>
      {children}
    </Component>
  );
}
