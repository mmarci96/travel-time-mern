import { FaCheckCircle } from 'react-icons/fa';

const Accepted = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h2 className="text-xl font-bold">Accepted</h2>
      <div className="mt-4 text-center">{children}</div>
    </div>
  );
};

export default Accepted;
