import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/ToastManager';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('https://dac-server.vercel.app/api/auth/check-auth', { withCredentials: true });
        setCurrentUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dac-server.vercel.app/api/auth/user-activity-logs', { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchCurrentUser();
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://dac-server.vercel.app/api/admin/delete-user/${userId}`, { withCredentials: true });
      addToast('User deleted successfully', 'success');
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error(err);
      addToast('Failed to delete user', 'error');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (currentUser.userType !== 'Admin') {
    return (
      <div className='mx-5 mt-5'>
        <h1 className='text-2xl text-secondary font-bold mb-4'>Hello {currentUser.email}!</h1>
        <h1 className='text-4xl mt-3 text-primary font-bold mb-4'>Feed</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-md p-6 mx-auto mt-10 mb-10 bg-slate-900 rounded shadow-xl">
      <h1 className="text-2xl text-primary font-bold mb-4">Admin Dashboard</h1>
      {users.map(user => (
        <div key={user._id}>
          <h2 className="text-xl font-bold mb-4">User:<br /> {user.email}</h2>
          <h3 className="text-lg font-semibold mb-2">User Type:<br />  {user.userType}</h3>
          {user._id !== currentUser._id && (
            <button onClick={() => handleDeleteUser(user._id)} className="btn w-full btn-error mb-2">Delete User</button>
          )}
          <h3 className="text-lg font-semibold mb-2">Activity Log:</h3>
          <ul className="mb-6">
            {user.activityLog.map((log, index) => (
              <li key={index} className="border p-2 mb-2">
                {log.activity} at {new Date(log.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
