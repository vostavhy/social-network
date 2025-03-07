import { useGetPostsQuery } from '../../app/services/postApi';
import { CreatePost } from '../../components/create-post';

export const Posts = () => {
  const { data, error } = useGetPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  );
};
