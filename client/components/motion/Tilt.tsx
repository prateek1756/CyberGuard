import * as React from "react";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number; // max tilt in degrees
  scale?: number; // scale on hover
}

export default function Tilt({
  max = 12,
  scale = 1.02,
  className,
  style,
  children,
  ...rest
}: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string>(
    `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * (max * 2); // invert so up is negative
    const ry = (px - 0.5) * (max * 2);
    setTransform(
      `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`,
    );
  };

  const handleLeave = () => {
    setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform,
        transition: "transform 200ms ease",
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
