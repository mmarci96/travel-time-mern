import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';
import FormField from '../common/FormField.jsx';
import useAuthContext from '../../hooks/useAuthContext.js';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { saveToken } = useAuthContext();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error.message || 'Login failed');
                return;
            }

            saveToken(data.token, data.refresh_token);

            if (!data.hasUserDetails) {
                navigate('/userdetails');
            } else {
                navigate('/feed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-[280px] max-w-[480px] w-full"
        >
            <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <FormField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};

export default LoginForm;
