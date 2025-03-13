import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../features/user/userSlice';
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi';
import { useFollowUserMutation, useUnFollowUserMutation } from '../../app/services/followApi';
import { BASE_URL } from '../../utils/constants';
import { EditProfile } from '../../components/edit-profile';

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const { data } = useGetUserByIdQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  if (!data || !id) {
    return null;
  }

  const onOpen = () => {
    setIsEditProfileOpen(true);
  };

  const onClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleFollow = async () => {
    try {
      if (data.isFollowing) {
        await unfollowUser(data.id);
      } else {
        await followUser(data.id);
      }
      await triggerGetUserById(id);
      await triggerCurrentQuery();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-lg">
        <figure>
          <img src={`${BASE_URL}${data.avatarUrl}`} alt="Profile photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data?.email}</h2>
          <p>
            NAME: {data.name} <br />
            ID: {data.id}
          </p>
          <div className="card-actions justify-end">
            {currentUser?.id !== data.id ? (
              data.isFollowing ? (
                <button className="btn btn-secondary" onClick={handleFollow}>
                  Unfollow
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleFollow}>
                  Follow
                </button>
              )
            ) : (
              <button className="btn btn-primary" onClick={() => onOpen()}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <EditProfile isOpen={isEditProfileOpen} onClose={onClose} user={data} />
    </>
  );
};
