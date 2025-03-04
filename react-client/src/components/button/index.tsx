import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  icon,
  className,
  type = 'button',
  fullWidth,
  color = 'default',
  isLoading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${color} ${className} ${fullWidth ? 'btn-block' : ''} ${isLoading ? 'btn-disabled' : ''}`}
      type={type}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};
