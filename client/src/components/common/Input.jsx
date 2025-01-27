const Input = ({ type = 'text', ...props }) => {
    return (
        <input
            className="shadow appearance-none ring-2 ring-slate-300 rounded-xl w-full py-2 px-1 bg-cyan-100 text-gray-700 focus:outline-none"
            type={type}
            {...props}
        />
    );
};

export default Input;
