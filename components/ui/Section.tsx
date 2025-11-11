import * as React from "react";
type SectionProps = { children: React.ReactNode; className?: string; id?: string; as?: keyof JSX.IntrinsicElements; };
export default function Section({ children, className = "", id, as: Tag = "section" }: SectionProps) {
  return <Tag id={id} className={`max-w-7xl mx-auto px-4 ${className}`}>{children}</Tag>;
}
