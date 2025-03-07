import React from 'react';
import { BASE_URL } from '../../utils/constants';

type UserProps = {
  name: string;
  email?: string;
  avatarUrl: string;
  className?: string;
  date?: string;
};

export const User = ({
  name = '',
  email = '',
  avatarUrl = '',
  className = '',
  date = '',
}: UserProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <figure>
        <img
          src={`${BASE_URL}${avatarUrl}`}
          alt="Profile photo"
          width={30}
          className="rounded-full"
        />
      </figure>
      <div className="">
        <h2 className="">{email}</h2>
        <p>
          {name} <br />
          <span className="text-accent text-xs">{date}</span>
        </p>
      </div>
    </div>
  );
};
