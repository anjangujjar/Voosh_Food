import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clientId = "YOUR_GOOGLE_CLIENT_ID";

const GoogleLoginComponent = () => {
    const navigate = useNavigate();

    const onSuccess = async (response) => {
        const { tokenId } = response;
        try {
            const res = await axios.post('/api/auth/google', { tokenId });
            localStorage.setItem('token', res.data.token);
            navigate('/tasks');
        } catch (error) {
            console.error(error);
        }
    };

    const onFailure = (response) => {
        console.error('Google Login Failed:', response);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginComponent;
