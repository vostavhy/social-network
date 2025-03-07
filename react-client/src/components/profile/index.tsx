import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

export const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return null;
  }

  const { name, email, id, avatarUrl } = currentUser;

  return (
    <div className="card bg-base-100 w-96 shadow-lg">
      <figure>
        <img src={`${BASE_URL}${avatarUrl}`} alt="Profile photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{email}</h2>
        <p>
          NAME: {name} <br />
          ID: {id}
        </p>
        <div className="card-actions justify-end">
          <Link to={`users/${id}`}>
            <button className="btn btn-primary">Go to Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
