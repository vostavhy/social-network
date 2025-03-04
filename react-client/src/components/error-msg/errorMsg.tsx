import React from 'react';

type Props = {
  errorMsg: string;
};

export const ErrorMSG = ({ errorMsg }: Props) => {
  return <p className="text-sm text-red-500">{errorMsg}</p>;
};
