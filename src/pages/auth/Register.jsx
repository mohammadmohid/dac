import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import GoogleLogo from '../../assets/Google.svg';
import { useToast } from '../../components/ToastManager';

const Register = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Teacher');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password, userType }, { withCredentials: true });
      addToast('User created successfully', 'success');
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
        addToast(err.response.data.error, 'error');
      } else {
        setError('An unexpected error occurred');
        addToast('An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md p-6 mx-auto mt-10 mb-10 bg-slate-900 rounded shadow-xl">
      <Link to="/"><img src={Logo} alt="DAC Logo" className="mb-4"/></Link>
      <h2 className="mb-2 text-2xl text-primary font-bold">Create an account</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label" htmlFor="userType">
            <span className="label-text">User Type</span>
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="btn btn-primary w-full mb-4">
          Sign up with email
        </button>
      </form>
      <div className="flex items-center w-full mb-4">
        <div className="divider">or continue with</div>
      </div>
      <button className="btn btn-outline w-full mb-4">
        <img src={GoogleLogo} alt="Google Logo" className="mr-2" />
        Google
      </button>
      <p className="text-base-content/70 text-center">
        By clicking continue, you agree to our{' '}
        <Link to="#" className="link link-primary">Terms of Service</Link> and{' '}
        <Link to="#" className="link link-primary">Privacy Policy</Link>
      </p>
      <p className="mt-4 text-base-content/70">
        Already have an account? <Link to="/login" className="link link-primary">Sign in.</Link>
      </p>
    </div>
  );
};

export default Register;
