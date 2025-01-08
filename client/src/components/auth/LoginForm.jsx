import { useState } from 'react';
import FormField from '../common/FormField.jsx';
import Button from '../common/Button.jsx';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.error.message);
            return;
        }
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token);
        setLoading(false);
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button type={'submit'}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};

export default LoginForm;
