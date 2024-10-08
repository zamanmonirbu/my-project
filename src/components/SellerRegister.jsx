import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSeller } from '../actions/sellerActions'; // Assume you have this action
import { Link } from 'react-router-dom';

const SellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');   // New state for address
  const [mobile, setMobile] = useState('');     // New state for mobile number
  const [imgUrl, setImgUrl] = useState('');     // New state for image URL

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.sellerRegister);

  const handleRegister = () => {
    dispatch(registerSeller({ name, email, password, businessName, address, mobile, imgUrl }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Registration</h2>
        {loading && <p className="text-blue-500 text-center">Registering...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Registration successful!</p>}
        
        {/* Name Input */}
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Email Input */}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Password Input */}
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Business Name Input */}
        <input 
          type="text" 
          value={businessName} 
          onChange={(e) => setBusinessName(e.target.value)} 
          placeholder="Business Name" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Address Input */}
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Mobile Input */}
        <input 
          type="text" 
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
          placeholder="Mobile Number" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Image URL Input */}
        <input 
          type="text" 
          value={imgUrl} 
          onChange={(e) => setImgUrl(e.target.value)} 
          placeholder="Image URL" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Register Button */}
        <button 
          onClick={handleRegister} 
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
        
        {/* Login Link */}
        <div className="flex justify-between mt-4">
          <Link to="/seller/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
