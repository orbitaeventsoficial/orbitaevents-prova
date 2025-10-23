"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeroPortalLogo({
  endColor = "#0a0a0a",
  enabled = true
}:{ endColor?: string; enabled?: boolean }){
  const [svg,setSvg]=useState<string|null>(null);
  useEffect(()=>{
    if(!enabled) return;
    let alive=true;
    fetch("/img/brand/orbita-glyph.anim.svg",{cache:"force-cache"})
      .then(r=>r.text()).then(t=>{ if(alive) setSvg(t) })
      .catch(()=>setSvg(null));
    return ()=>{alive=false};
  },[enabled]);

  if(!enabled || !svg) return null;

  return (
    <motion.div className="fixed inset-0 z-[9999]"
      initial={{opacity:1,backgroundColor:"#000"}}
      animate={{backgroundColor:endColor}}
      transition={{duration:0.8}}>
      <div className="absolute inset-0 grid place-items-center"
           dangerouslySetInnerHTML={{__html:svg||""}} />
    </motion.div>
  );
}