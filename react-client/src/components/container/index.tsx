import React from 'react';

type ContainerProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto mt-10 flex">{children}</div>;
};
