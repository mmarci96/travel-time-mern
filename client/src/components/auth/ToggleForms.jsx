import { useState } from 'react';
import Button from '../common/Button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm.jsx';

const ToggleForms = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const handleToggle = () => {
        setHasAccount(!hasAccount);
    };
    return (
        <div className="flex flex-col items-center my-2 mx-auto  rounded-lg min-w-[280px] max-w-[600px]">
            {hasAccount ? <LoginForm /> : <SignupForm onSuccess={setHasAccount} />}
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
