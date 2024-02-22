"use client";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "@/components/slydehomes.css";

export default function SlideHomes({ homeImages }) {
  console.log("image4", homeImages);
  return (
    <Slide>
      {homeImages.map((imageUrl, index) => (
        <div className="each-slide-effect" key={"HomeImage" + index}>
          <div style={{ backgroundImage: `url(${imageUrl})` }}>
            <span>Slide{index + 1}</span>
          </div>
        </div>
      ))}
    </Slide>
  );
}
