const Button = ({
    children,
    onClick = () => {},
    color = 'cyan',
    type = 'button',
}) => {
    const colorClasses = {
        cyan: 'bg-cyan-500 hover:bg-cyan-700',
        red: 'bg-red-500 hover:bg-red-700',
        green: 'bg-green-500 hover:bg-green-700',
    };

    return (
        <button
            className={`${colorClasses[color]} max-h-[36px] font-bold text-white my-2 mx-auto pt-2 py-1 px-2 rounded-lg hover:opacity-80 transition duration-300 ease-in-out`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
