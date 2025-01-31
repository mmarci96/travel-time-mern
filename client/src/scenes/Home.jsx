import { useEffect, useState } from 'react';
import ToggleForms from '../components/auth/ToggleForms.jsx';
import useAuthContext from '../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
import TermsAndConditions from '../components/auth/TermsAndConditions.jsx';

const Home = () => {
    const [showTermsAndConditions, setShowTermsAndConditions] = useState(false)
    const navigate = useNavigate()
    const { currentUserId } = useAuthContext()
    useEffect(() => {
        if (currentUserId) {
            navigate('/feed')
        }
    }, [currentUserId])
    return (
        <div className="w-screen">
            {showTermsAndConditions ?

                <TermsAndConditions onClose={setShowTermsAndConditions} />
                :
                <div className='w-[64vw] min-w-[360px] h-[80vh] min-h-[400px] flex flex-col iteams-center overflow-scroll rounded-lg shadow-lg ring-slate-200 ring-2 m-auto mt-8'>
                    <h1 className='text-xl tracking-wider mx-auto my-2 text-center'>
                        Start your journey today!
                        <br />
                        Make friends with other travelers around the world!
                    </h1>
                    <ToggleForms />
                    <p className='mx-auto mt-4'>
                        By using this site, you agree to our Terms and Conditions.

                    </p>
                    <p className='mx-auto mt-4'><span className='text-blue-400 cursor-pointer mx-auto'
                        onClick={() => setShowTermsAndConditions(true)}>
                        Click here {' '}
                    </span>
                        to read the full Terms and Conditions.</p>

                </div>}
        </div>
    );
};

export default Home;
