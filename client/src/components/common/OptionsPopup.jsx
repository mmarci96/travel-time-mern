import { useEffect, useRef, useState } from 'react';

const OptionsPopup = ({ options }) => {
    const popupRef = useRef(null);
    const [positionUp, setPositionUp] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (popupRef.current) {
            const { bottom } = popupRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight - 120;
            setPositionUp(bottom > windowHeight / 2);
        }
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    return (
        options?.length > 0 && (
            <div
                ref={popupRef}
                className={`absolute flex flex-col bg-white rounded-lg px-2 py-1 ring-1 ring-cyan-200 w-[200px] z-50 shadow-lg 
                transition-all duration-200 ease-out transform ${
                    isVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : positionUp
                          ? 'opacity-0 scale-95 translate-y-2'
                          : 'opacity-0 scale-95 -translate-y-2'
                }`}
                style={{
                    right: '0',
                    ...(positionUp ? { bottom: '100%' } : {}),
                }}
            >
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={option.onClick}
                        className="flex justify-between mb-1 p-1 rounded-md ring-1 ring-slate-300 hover:bg-slate-100 hover:scale-105 transform transition-all duration-200"
                    >
                        {option.text}
                        {option.icon}
                    </button>
                ))}
            </div>
        )
    );
};

export default OptionsPopup;
