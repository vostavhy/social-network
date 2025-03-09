import React, { useState } from 'react';
import { useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { Button } from '../button';
import { ErrorMSG } from '../error-msg/errorMsg';
import { useCreateCommentMutation } from '../../app/services/commentApi';
import { useParams } from 'react-router-dom';

export const CreateComment = () => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [triggerGetPost] = useLazyGetPostByIdQuery();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      postId: id as string,
      content: formData.get('content') as string,
    };

    console.log('Data:', data);

    try {
      await createComment(data).unwrap();
      if (id) {
        await triggerGetPost(id).unwrap();
      }
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
      <textarea className="textarea" name="content" placeholder="Write a comment" required />
      <ErrorMSG errorMsg={errorMsg} />
      <Button type="submit" isLoading={isLoading} className="self-start">
        Create comment
      </Button>
    </form>
  );
};
