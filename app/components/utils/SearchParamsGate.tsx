"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  children: (sp: URLSearchParams) => React.ReactNode;
};

function SearchParamsGateInner({ children }: Props) {
  const sp = useSearchParams();
  return <>{children(sp)}</>;
}

export default function SearchParamsGate(props: Props) {
  return (
    <Suspense fallback={null}>
      <SearchParamsGateInner {...props} />
    </Suspense>
  );
}
