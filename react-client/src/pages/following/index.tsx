import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import { User } from '../../components/user';
import { Link } from 'react-router-dom';

export const Following = () => {
  const currentUser = useSelector(selectCurrentUser);

  console.log('Current user:', currentUser);

  if (currentUser?.following.length === 0) {
    return (
      <>
        <h1>Followers</h1>
        <p>{currentUser?.name} follow 0 users</p>
      </>
    );
  }

  return (
    <>
      <h1>Followers</h1>
      <ul>
        {currentUser?.following.map((user) => (
          <li key={user.following.id}>
            <Link to={`/users/${user.following.id}`}>
              <User
                name={user.following.name || 'Unknown'}
                avatarUrl={user.following.avatarUrl || ''}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
