import { useState } from 'react';
import UniversalForm from '../common/UniversalForm';

const SignupForm = ({ onSuccess }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/auth/signup', {
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
        onSuccess(true);

        setLoading(false);
    };
    return (
        <UniversalForm
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            loading={loading}
            error={error}
            submitText="Sign up!"
        />
    );
};

export default SignupForm;
