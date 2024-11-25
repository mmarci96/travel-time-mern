import { useState } from 'react';

export const useAuthRequest = (endpoint, method, formData = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

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
      if (!res.ok) {
       setError(data.error.message);
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, sendRequest };
};
export default useAuthRequest;