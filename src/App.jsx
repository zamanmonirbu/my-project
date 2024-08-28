import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UserProfile from './components/UserProfile';
import ViewFilterProducts from './components/Filter/ViewFilterProducts';
import ProductView from './components/Product/ProductView';
import CategoryInput from './components/CategoryInput';
import CategoryView from './components/CategoryView';
import ProductInput from './components/ProductInput';
import BannerManager from './components/BannerManager';
import ManageGallery from './components/ManageGallery';

 
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/filter/product" element={<ViewFilterProducts/>} />
                <Route path="/user/profile" element={<UserProfile/>} />
                <Route path="/product/view" element={<ProductView/>} />
                <Route path="/input/category" element={<CategoryInput/>} />
                <Route path="/input/product" element={<ProductInput/>} />
                <Route path="/view/category" element={<CategoryView/>} />
                <Route path="/view/banner" element={<BannerManager/>} />
                <Route path="/view/gallery" element={<ManageGallery/>} />


                {/* Private Routes for Users */}
                <Route element={<PrivateRoute />}>
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Route>

                {/* Private Routes for Admins */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                {/* Redirect to Home if no route matches */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
