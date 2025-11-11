"use client";
import { useSearchParams } from "next/navigation";

export default function SearchParamsGate({
  children,
}: {
  children: (sp: URLSearchParams) => React.ReactNode;
}) {
  const sp = useSearchParams();
  return <>{children(sp)}</>;
}
