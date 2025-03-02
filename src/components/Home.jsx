import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SplitText from "./splittext";

const cards = [" ", " ", " ", " ", " ", " ", " "];

export default function home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasMovedUp, setHasMovedUp] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false); 

  const centerIndex = Math.floor(cards.length / 2);
  const gap = 120;

  const rotateValues = [-15, -6, -5, 0, 6, 6, 6];
  const translateYValues = [0, -40, -30, -30, -33, -25, -40];

  useEffect(() => {
    setStartAnimation(true); 
  }, []);

  useEffect(() => {
    if (hasMovedUp) {
      setTimeout(() => setIsRevealed(true), 200);
    }
  }, [hasMovedUp]);

  return (
    <div className="section">
      <SplitText
        text="A Place To Display Your MasterPiece"
        className="heading"
        delay={50}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      />
      <div className="container">
        <motion.div
          initial={{ y: "100vh" }} 
          animate={startAnimation ? { y: "50vh" } : {}} 
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => {
            setTimeout(() => setHasMovedUp(true), 100); 
          }}
          className="first"
          style={{ position: "relative" }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, rotate: 0, y: 0 }}
              animate={
                isRevealed
                  ? {
                      x: (index - centerIndex) * gap,
                      y: translateYValues[index],
                      rotate: rotateValues[index],
                      opacity: 1,
                    }
                  : { x: 0, opacity: 1, rotate: 0, y: 0 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="second"
            >
              {card}
            </motion.div>
          ))}
        </motion.div>

        <SplitText
          text="Artists can display their masterpieces, and buyers can discover"
          className="sub"
          delay={30}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />

        <motion.div
          initial={{ y: "10vh" }}
          animate={{ y: "0vh" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="btn-container">
            <button className="btn">Join for $9.99/m</button>
            <button className="btn tran">Read More</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
