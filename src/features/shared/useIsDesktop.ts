"use client";
 
import { useState, useEffect } from "react";
 
const BREAKPOINT = 1024;
 
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    // SSR-safe: na serwerze nie ma window
    if (typeof window === "undefined") return true;
    return window.innerWidth >= BREAKPOINT;
  });
 
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsDesktop(entry.contentRect.width >= BREAKPOINT);
      }
    });
 
    observer.observe(document.documentElement);
 
    return () => observer.disconnect();
  }, []);
 
  return isDesktop;
}
 