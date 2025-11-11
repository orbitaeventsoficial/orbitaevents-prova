// app/components/ui/SearchParamsGate.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

function SearchParamsGate({
  children,
}: {
  children: (sp: URLSearchParams) => React.ReactNode;
}) {
  const sp = useSearchParams();
  return <>{children(sp)}</>;
}

export default memo(SearchParamsGate);
