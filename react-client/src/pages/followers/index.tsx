import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import { User } from '../../components/user';
import { Link } from 'react-router-dom';

export const Followers = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser?.followers.length === 0) {
    return (
      <>
        <h1>Followers</h1>
        <p>{currentUser?.name} has 0 followers</p>
      </>
    );
  }

  return (
    <>
      <h1>Followers</h1>
      <ul>
        {currentUser?.followers.map((user) => (
          <li key={user.follower.id}>
            <Link to={`/users/${user.follower.id}`}>
              <User
                name={user.follower.name || 'Unknown'}
                avatarUrl={user.follower.avatarUrl || ''}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
