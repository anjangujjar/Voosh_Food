import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginComponent from '../components/Auth/GoogleLogin';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Task Manager</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <GoogleLoginComponent />
        </div>
    );
};

export default HomePage;
