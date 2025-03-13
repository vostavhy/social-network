import React, { useContext, useState } from 'react';
import { User } from '../../utils/types';
import { ThemeContext } from '../theme';
import {
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import { Input } from '../input';

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

export const EditProfile = ({ isOpen, onClose, user }: EditProfileProps) => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useContext(ThemeContext);
  const [updatedUser, { isLoading }] = useUpdateUserMutation();
  const [triggerGetUser] = useLazyGetUserByIdQuery();
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  console.log('selectedFile', selectedFile);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('id', user.id);
    selectedFile && formData.append('profileImage', selectedFile);

    try {
      await updatedUser({ id: user.id, userData: formData }).unwrap();
      triggerGetUser(id ?? '').unwrap();
      onClose();
    } catch (error: any) {
      setError(error.data.error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black`}
    >
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} w-96 rounded-lg p-4`}>
        <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Username"
            defaultValue={user?.name}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={user?.email}
            required
          />
          <textarea name="bio" placeholder="Bio" defaultValue={user?.bio} className="textarea" />
          <input className="input" type="file" accept="image/*" onChange={handleFileChange} />
          <p className="text-sm text-red-500">{error}</p>
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
