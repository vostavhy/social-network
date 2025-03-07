import { useGetPostsQuery } from '../../app/services/postApi';
import { Card } from '../../components/card';
import { CreatePost } from '../../components/create-post';

export const Posts = () => {
  const { data, error } = useGetPostsQuery();

  console.log(data, error);

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl">Posts</h1>
        {data && data.length > 0 ? (
          data.map(({ content, author, id, authorId, comments, likes, createdAt }) => (
            <Card
              key={id}
              avatarUrl={author.avatarUrl || ''}
              name={author.name || ''}
              authorID={authorId}
              content={content}
              commentsCount={comments.length}
              likesCount={likes.length}
              createdAt={createdAt}
              cardType="post"
              id={id}
            />
          ))
        ) : (
          <div className="flex h-96 items-center justify-center">
            <h1 className="text-3xl">No posts yet</h1>
          </div>
        )}
      </div>
    </>
  );
};
