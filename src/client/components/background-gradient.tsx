import { cn } from "../lib/utils.ts";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "#ffffff",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const location = useLocation();
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return location.pathname !== "/" ? null : (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen w-full overflow-hidden",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg absolute left-0 bottom-1/5 -z-10 transform-gpu opacity-50",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {/*<div*/}
        {/*  className={cn(*/}
        {/*    `absolute [background:radial-gradient(circle_at_center,_var(--second-color)_0,_transparent_50%)_no-repeat]`,*/}
        {/*    `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,*/}
        {/*    `[transform-origin:calc(50%-400px)]`,*/}
        {/*    `animate-second`,*/}
        {/*    `opacity-100`*/}
        {/*  )}*/}
        {/*></div>*/}
        {/*<div*/}
        {/*  className={cn(*/}
        {/*    `absolute [background:radial-gradient(circle_at_center,_var(--third-color)_0,_transparent_50%)_no-repeat]`,*/}
        {/*    `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,*/}
        {/*    `[transform-origin:calc(50%+400px)]`,*/}
        {/*    `animate-third`,*/}
        {/*    `opacity-100`*/}
        {/*  )}*/}
        {/*></div>*/}
        {/*<div*/}
        {/*  className={cn(*/}
        {/*    `absolute [background:radial-gradient(circle_at_center,_var(--fifth-color)_0,_transparent_50%)_no-repeat]`,*/}
        {/*    `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,*/}
        {/*    `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,*/}
        {/*    `animate-fifth`,*/}
        {/*    `opacity-100`*/}
        {/*  )}*/}
        {/*></div>*/}
        <div
          className={cn(
            `fixed [background:radial-gradient(circle_at_center,_var(--second-color)_0,_transparent_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[70%] h-[70%] top-[calc(50%-var(--size)/2 - 10%)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `fixed [background:radial-gradient(circle_at_center,_var(--third-color)_0,_transparent_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[70%] h-[70%] top-[calc(50%-var(--size)/2 - 10%)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `fixed [background:radial-gradient(circle_at_center,_var(--fifth-color)_0,_transparent_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[70%] h-[70%] top-[calc(50%-var(--size)/2 - 10%)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        ></div>
      </div>
    </div>
  );
};
