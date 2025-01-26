import { useState } from 'react';
import Button from '../common/Button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm.jsx';

const ToggleForms = () => {
    const [hasAccount, setHasAccount] = useState(false);
    const handleToggle = () => {
        setHasAccount(!hasAccount);
    };
    return (
        <div className="flex flex-col items-center my-4 mx-auto  shadow-md border-2 border-slate-200 rounded-lg min-w-[400px] max-w-[600px]">
            {hasAccount ? <LoginForm /> : <SignupForm />}
            <p>
                {hasAccount
                    ? "Don't have an account yet?"
                    : 'Already have an account?'}
            </p>
            <Button
                children={hasAccount ? 'Register' : 'Log in'}
                onClick={handleToggle}
                color={'green'}
            />
        </div>
    );
};

export default ToggleForms;
