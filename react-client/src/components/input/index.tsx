import React from 'react';

type InputProps = {
  name: string;
  placeholder?: string;
  value?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  className?: string;
  title?: string;
  svgComponent?: React.ReactElement;
};

export const Input = ({
  name,
  placeholder,
  value,
  type,
  className,
  required,
  minLength,
  pattern,
  title,
  svgComponent,
}: InputProps) => {
  return (
    <label className="input">
      {svgComponent}
      <input
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        required={required === true}
        minLength={minLength}
        pattern={pattern}
        title={title}
      />
    </label>
  );
};
