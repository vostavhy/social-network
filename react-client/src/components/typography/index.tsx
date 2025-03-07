import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const Typography = ({ children, size = 'md' }: TypographyProps) => {
  return <p className={`text-${size}`}>{children}</p>;
};
