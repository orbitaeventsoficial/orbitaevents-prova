// app/components/ui/Button.tsx
import React from "react";
import Link from "next/link";
type Props = React.PropsWithChildren<{ href?:string; onClick?:()=>void; variant?:'primary'|'secondary'; className?:string; target?:string; rel?:string }>
export default function Button({ href, onClick, variant='secondary', className='', children, target, rel }:Props){
  const cls = `oe-btn ${variant==='primary'?'oe-btn-gold':''} ${className}`.trim();
  if (href) return <Link href={href} className={cls} target={target} rel={rel}>{children}</Link>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}
