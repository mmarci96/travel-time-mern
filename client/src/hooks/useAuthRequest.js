import { useState } from 'react';

export const useAuthRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRefreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        const res = await fetch('/api/auth/refresh_token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        })
        const data = await res.json();
        if(res.ok && data){
            localStorage.setItem("token", data.token)
            return data.token 
        }

        return null;
    }

    const sendRequest = async (endpoint, method, formData = null) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) setError('Token not set');

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (method !== 'GET') {
                headers['Content-Type'] = 'application/json';
            }

            const options = {
                method,
                headers,
            };

            if (formData && method !== 'GET') {
                options.body = JSON.stringify(formData);
            }

            const res = await fetch(endpoint, options);
            const data = await res.json();
            if(data.error === 'Unauthorized'){
                const newToken = await handleRefreshToken();
                if(newToken){
                    window.location.reload()
                }
            }
            if (!res.ok) {
                setError(data.error.message);
                return;
            }

            return data;
        } catch (err) {
            setError(err.message);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, sendRequest };
};
export default useAuthRequest;
