"use client";
import { Suspense, memo } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  children: (sp: URLSearchParams) => React.ReactNode;
};

function SearchParamsGateInner({ children }: Props) {
  const sp = useSearchParams();
  return <>{children(sp)}</>;
}

function SearchParamsGate(props: Props) {
  return (
    <Suspense fallback={null}>
      <SearchParamsGateInner {...props} />
    </Suspense>
  );
}

export default memo(SearchParamsGate);
