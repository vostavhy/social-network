import { NotepadText, NotepadTextIcon, UserCheckIcon, UsersIcon } from 'lucide-react';
import { NavButton } from '../nav-button';

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<NotepadTextIcon />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton href="/following" icon={<UserCheckIcon />}>
            Following
          </NavButton>
        </li>
        <li>
          <NavButton href="/followers" icon={<UsersIcon />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};
