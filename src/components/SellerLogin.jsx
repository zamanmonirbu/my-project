import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSeller } from '../actions/sellerActions';
import { Link } from 'react-router-dom';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, sellerInfo } = useSelector((state) => state.sellerLogin);

  const handleLogin = () => {
    dispatch(loginSeller({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Login</h2>
        {loading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {sellerInfo && <p className="text-green-500 text-center">Welcome, {sellerInfo.name}</p>}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button 
          onClick={handleLogin} 
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="flex justify-between mt-4">
          <Link to="/seller/register" className="text-blue-500 hover:underline">Create an Account</Link>
          <Link to="/password-recovery" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
