import { useState } from 'react';
import FormField from '../common/FormField.jsx';
import Button from '../common/Button.jsx';

const SignupForm = () => {
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
    if (!response.ok) {
      setError('Something went wrong');
      return;
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="username"
        label="Username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        />
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
      <Button type={'submit'}>{loading ? 'Signing up...' : 'Signup'}</Button>
    </form>
  );
}

export default SignupForm;