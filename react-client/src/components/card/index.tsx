import React, { useState } from 'react';
import { useCreateLikeMutation, useDeleteLikeMutation } from '../../app/services/likeApo';
import {
  useDeletePostMutation,
  useLazyGetPostByIdQuery,
  useLazyGetPostsQuery,
} from '../../app/services/postApi';
import { useDeleteCommentMutation } from '../../app/services/commentApi';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../features/user/userSlice';
import { useAppSelector } from '../../app/hooks';
import { User } from '../user';
import { MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon, Trash2Icon } from 'lucide-react';
import { Typography } from '../typography';
import { MetaInfo } from '../meta-info';
import { ErrorMSG } from '../error-msg/errorMsg';

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
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id,
  cardType,
  likedByCurrentUser = false,
}: CardProps) => {
  const [likePost] = useCreateLikeMutation();
  const [unlikePost] = useDeleteLikeMutation();
  const [triggerAllPosts] = useLazyGetPostsQuery();
  const [triggerPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePossStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className="card bg-base-100 border-primary w-full border px-3 py-2 shadow-sm">
      <div className="card-header mb-4 flex items-center justify-between">
        <Link to={`/users/${authorID}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            className="text-sm leading-none font-semibold"
            date={createdAt ? new Date(createdAt).toDateString() : ''}
          />
        </Link>

        {authorID === currentUser?.id && (
          <div className="cursor-pointer">
            {deleteCommentStatus.isLoading || deletePossStatus.isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <Trash2Icon width={15} />
            )}
          </div>
        )}
      </div>
      <div className="mb-5 py-2">
        <Typography> {content}</Typography>
      </div>

      {cardType !== 'comment' && (
        <div className="card-footer gap-3">
          <div className="flex items-center gap-5">
            <div>
              <MetaInfo
                count={likesCount}
                Icon={
                  likedByCurrentUser ? (
                    <ThumbsDownIcon width={15} strokeWidth={1} />
                  ) : (
                    <ThumbsUpIcon width={15} strokeWidth={1} />
                  )
                }
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo
                count={commentsCount}
                Icon={<MessageCircleIcon width={15} strokeWidth={1} />}
              />
            </Link>
          </div>
          <ErrorMSG errorMsg={errorMsg} />
        </div>
      )}
    </div>
  );
};
