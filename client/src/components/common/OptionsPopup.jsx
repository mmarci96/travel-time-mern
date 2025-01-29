const OptionsPopup = ({ options }) => {
    return (
        options?.length > 0 && (
            <div
                className="absolute flex flex-col bg-white rounded-lg px-[6px] py-1 ring-1 ring-cyan-200 w-[200px] z-10"
                style={{
                    bottom: '100%', // Move the popup above the parent
                    right: '0', // Align the popup to the right edge of the parent
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
