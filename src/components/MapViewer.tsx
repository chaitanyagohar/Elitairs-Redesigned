"use client";

import { useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

export default function MapViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        api.start({ x: dx, y: dy });
      },
      onPinch: ({ offset: [d] }) => {
        api.start({ scale: Math.min(4, Math.max(1, d / 200 + 1)) });
      },
      onWheel: ({ event, delta: [, dy] }) => {
        event.preventDefault();
        api.start({
          scale: Math.min(4, Math.max(1, scale.get() - dy / 300)),
        });
      },
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[16/9] overflow-hidden bg-black touch-none relative"
    >
      <animated.div
        style={{ x, y, scale }}
        className="w-full h-full will-change-transform"
      >
        <Image
          src={src}
          fill
          alt="Master Plan"
          className="object-contain select-none pointer-events-none"
        />
      </animated.div>

      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 text-xs uppercase tracking-wider">
        Scroll / Pinch / Drag
      </div>
    </div>
  );
}
