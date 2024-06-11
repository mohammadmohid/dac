import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import GoogleLogo from '../../assets/Google.svg';
import { useToast } from '../../components/ToastManager';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
      addToast('Signed in successfully', 'success');
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        addToast('An unexpected error occurred', 'error');
      }
    }
  };


  return (
    <div className="flex flex-col items-center max-w-md p-6 mx-auto mt-10 mb-10 bg-slate-900 rounded shadow-xl">
      <Link to="/"><img src={Logo} alt="DAC Logo" className="mb-4"/></Link>
      <h2 className="mb-2 text-2xl text-primary font-bold">Good to have you back!</h2>
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
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
        <button type="submit" className="btn btn-primary w-full mb-4">
          Sign in
        </button>
      </form>
      <div className="flex items-center w-full mb-4">
        <div className="mx-auto">or continue with</div>
      </div>
      <button className="btn btn-outline w-full mb-4">
        <img src={GoogleLogo} alt="Google Logo" className="mr-2" />
        Google
      </button>
      <div className="flex gap-3 mt-4">
        <Link to="/register" className="link link-primary">Create account</Link>
        <Link to="#" className="link link-primary">Forgot password?</Link>
      </div>
    </div>
  );
};

export default Login;
