import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../actions/adminActions'; // Assume you have this action
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.adminRegister);

  const handleRegister = () => {
    dispatch(registerAdmin({ name, email, password }));
  };

  // Use useEffect to show notifications
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }

    if (success) {
      toast.success('Registration successful!', {
        position: "bottom-right",
        autoClose: 5000,
      });
      navigate('/admin/login'); // Redirect to login page on success
    }
  }, [error, success, navigate]);

  return (
    <>
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>
          {loading && <p className="text-blue-500 text-center">Registering...</p>}
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
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
            onClick={handleRegister} 
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
          <div className="flex justify-between mt-4">
            <Link to="/admin/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
