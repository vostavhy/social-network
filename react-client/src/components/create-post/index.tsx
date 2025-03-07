import React, { useState } from 'react';
import { useCreatePostMutation, useLazyGetPostsQuery } from '../../app/services/postApi';
import { Button } from '../button';
import { ErrorMSG } from '../error-msg/errorMsg';
import { Input } from '../input';

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetPostsQuery();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    };

    try {
      await createPost(data).unwrap();
      await triggerAllPosts().unwrap();
    } catch (error: any) {
      console.log('Error occurred:', error);

      if (error.data.error) {
        setErrorMsg(error.data.error);
      } else {
        setErrorMsg('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input name="title" placeholder="Title" type="text" required />
      <textarea className="textarea" name="content" placeholder="Content" required />
      <ErrorMSG errorMsg={errorMsg} />
      <Button type="submit" isLoading={isLoading} className="self-start">
        Create Post
      </Button>
    </form>
  );
};
