"use client";
 
import React, { useRef } from "react";
import ScrollFlip from "./Categories";
import RevolvingText from "@/components/shared/animations/RevolvingText";
 
function BlogHero() {
  return (
    <div
      style={{
        width:"50%",
        height:"40vw",
        backgroundImage: "var(--color-fourth)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <div
        style={{
          width:"100%",
          height:"100%",
          fontWeight: '900',
          fontSize: 'clamp(60px,10vh,300px)',
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          zIndex:"2"
        }}
      >
        <h1 style={{ width: 'clamp(0,100%,2000px)',textAlign:"center" }}>
          THIS IS WHERE I STASH MY <RevolvingText
  text={['THOUGHTS', 'DOCUMENTS', 'VISION']}
  interval={2000}   // ms między zmianami
  speed={2000}       // ms trwania animacji
/>
        </h1>
      </div>
    </div>
  );
}
 
export default BlogHero;
 