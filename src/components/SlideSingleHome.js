"use client";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function SlideHomes({ homeImages }) {
  return (
    <Slide>
      <div className="each-slide-effect">
        {homeImages.map((imageUrl, index) => (
          <div
            key={"HomeImage" + index}
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <span>Slide{index}</span>
          </div>
        ))}
      </div>
    </Slide>
  );
}
