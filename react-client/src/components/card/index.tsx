import React from 'react';

type CardProps = {
  avatarUrl: string;
  name: string;
  authorID: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardType?: 'post' | 'comment' | 'current-user-post';
  likedByCurrentUser?: boolean;
};

export const Card = ({
  avatarUrl,
  name,
  authorID,
  content,
  commentId,
  likesCount,
  commentsCount,
  createdAt,
  id,
  cardType,
  likedByCurrentUser,
}: CardProps) => {
  return <div>Card</div>;
};
