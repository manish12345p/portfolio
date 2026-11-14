import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
  style,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1160px] mx-auto px-[var(--container-pad)] ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Container };

