import React from 'react';
type MetaInfoProps = {
  count: number;
  Icon: React.ReactElement;
};

export const MetaInfo = ({ count, Icon }: MetaInfoProps) => {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      {count > 0 && <p className="text-default-400 text-l font-semibold">{count}</p>}
      <p className="text-default-400 hover:text:2xl text-xl duration-100 ease-in">{Icon}</p>
    </div>
  );
};
