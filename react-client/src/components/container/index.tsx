import React from 'react';

type ContainerProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto mt-10 flex max-w-7xl">{children}</div>;
};
