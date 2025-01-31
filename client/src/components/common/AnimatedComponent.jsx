import { useState, useEffect } from 'react';

const AnimatedComponent = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div
            className={`animate-fade-in m-auto ${isVisible ? 'animate-fade-in-active' : ''}`}
        >
            {children}
        </div>
    );
};

export default AnimatedComponent;
