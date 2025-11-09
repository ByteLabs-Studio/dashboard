import React, { CSSProperties } from 'react';

interface FluidGlassProps {
  opacity?: number;
  blur?: number;
  style?: CSSProperties;
  className?: string;
}

export default function FluidGlass({
  opacity = 0.1,
  blur = 10,
  style = {},
  className = ''
}: FluidGlassProps) {
  return (
    <div 
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderRadius: 'inherit',
        zIndex: -1,
        ...style
      }} 
    />
  );
}
