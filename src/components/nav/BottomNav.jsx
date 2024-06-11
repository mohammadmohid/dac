import { NavLink } from 'react-router-dom';
import HomeIcon from '../../assets/Home.svg';
import SearchIcon from '../../assets/search.svg';
import AddIcon from '../../assets/create.svg';
import ChatIcon from '../../assets/message.svg';
import ProfileIcon from '../../assets/profile.svg';

const BottomNav = () => {
  return (
    <nav className="btm-nav bg-slate-50 shadow-md rounded-t-3xl">
      <NavLink to="/home" className="flex-grow text-center">
        <img src={HomeIcon} alt="Home" className="w-6 mx-auto" />
      </NavLink>
      <NavLink to="/search" className="flex-grow text-center">
        <img src={SearchIcon} alt="Search" className="w-6 mx-auto" />
      </NavLink>
      <NavLink to="/create" className="flex-grow text-center">
        <img src={AddIcon} alt="Add" className="w-6 mx-auto" />
      </NavLink>
      <NavLink to="/message" className="flex-grow text-center">
        <img src={ChatIcon} alt="Chat" className="w-6 mx-auto" />
      </NavLink>
      <NavLink to="/profile" className="flex-grow text-center">
        <img src={ProfileIcon} alt="Profile" className="w-6 mx-auto" />
      </NavLink>
    </nav>
  );
};

export default BottomNav;
