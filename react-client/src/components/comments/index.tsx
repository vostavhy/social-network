import { useParams } from 'react-router-dom';
import { Card } from '../../components/card';
import { Comment } from '../../utils/types';
import { CreateComment } from '../create-comment';

type CommentsProps = {
  comments: Comment[];
};

export const Comments = ({ comments }: CommentsProps) => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const postId = id ?? '';

  return (
    <>
      <div className="my-10 w-full">
        <CreateComment />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl">Comments</h1>
        {comments && comments.length > 0 ? (
          comments.map(({ content, user, id, userId, createdAt }) => (
            <Card
              key={id}
              avatarUrl={user.avatarUrl || ''}
              name={user.name || ''}
              authorID={userId}
              content={content}
              commentsCount={comments.length}
              createdAt={createdAt}
              cardType="comment"
              commentId={id}
              id={postId}
            />
          ))
        ) : (
          <div className="flex h-96 items-center justify-center">
            <h1 className="text-3xl">No Comments yet</h1>
          </div>
        )}
      </div>
    </>
  );
};
