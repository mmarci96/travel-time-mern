import { useState } from 'react';
import { useContext } from 'react';
import Button from '../common/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import FormField from '../common/FormField.jsx';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true);
        const fuck = JSON.stringify(formData);
        console.log(fuck);
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

            login(data.token, data.refresh_token);
            navigate('/feed');
        } catch (error) {
            setError('Something went wrong. Please try again.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
