import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastManager';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', { withCredentials: true });
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auth/delete-account', { withCredentials: true });
      addToast('Account deleted successfully', 'success');
      navigate('/register');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete account', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      addToast('Logged out successfully', { appearance: 'success' });
      navigate('/login'); // Redirect to Login page
    } catch (error) {
      console.error(error);
      addToast('Logout failed', { appearance: 'error' });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-md p-6 mx-auto mt-10 mb-10 bg-slate-900 rounded-xl shadow-xl">
      <h2 className="mb-2 text-2xl text-primary font-bold">Profile</h2>
      <p>Email: {user.email}</p>
      <p>User Type: {user.userType}</p>
      <div className='flex gap-3 justify-center items-center mt-3'>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      <button onClick={handleDeleteAccount} className="btn btn-danger">Delete Account</button>
      </div>
      
    </div>
  );
};

export default Profile;
