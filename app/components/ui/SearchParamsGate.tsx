"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  children: (sp: URLSearchParams) => React.ReactNode;
};

function SearchParamsContent({ children }: Props) {
  const sp = useSearchParams();
  return <>{children(sp)}</>;
}

export default function SearchParamsGate({ children }: Props) {
  return (
    <Suspense fallback={null}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  );
}
