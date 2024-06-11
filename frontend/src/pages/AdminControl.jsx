import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/ToastManager';

const AdminControl = () => {
  const [users, setUsers] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', { withCredentials: true });
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== userId));
      addToast('User deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete user', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md p-6 mx-auto mt-10 mb-10 bg-slate-900 rounded shadow-xl">
      <h2 className="mb-2 text-2xl text-primary font-bold">Admin Control</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Email: {user.email}</p>
            <p>User Type: {user.userType}</p>
            <button onClick={() => handleDeleteUser(user._id)} className="btn btn-error mb-4">Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminControl;
