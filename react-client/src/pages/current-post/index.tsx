import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import { Comments } from '../../components/comments';

export const CurrentPost = () => {
  const params = useParams<{ id: string }>();

  const { data } = useGetPostByIdQuery(params?.id ?? '');
  const currentUser = useSelector(selectCurrentUser);

  const likesCount = data?.likes.length;
  const commentsCount = data?.comments.length;

  if (!data) {
    return <h2>No post found</h2>;
  }

  const { author, authorId, comments, content, createdAt, id, likes } = data;

  return (
    <>
      <Card
        cardType="current-user-post"
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        createdAt={createdAt}
        likesCount={likesCount}
        commentsCount={commentsCount}
        id={id}
        authorID={authorId}
        likedByCurrentUser={likes.some((like) => like.userId === currentUser?.id)}
      />

      <Comments comments={comments} />
    </>
  );
};
