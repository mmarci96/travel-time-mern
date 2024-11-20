import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Popup = ({ status, message, onClose }) => {
  const isSuccess = status === 'success';
  const iconClass = isSuccess ? 'text-green-500' : 'text-red-500';
  const Icon = isSuccess ? FaCheckCircle : FaTimesCircle;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black w-[60vw] h-[40vh] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <Icon className={`${iconClass} text-6xl mb-4`} />
        <h2 className="text-xl font-bold">{isSuccess ? 'Success' : 'Error'}</h2>
        <p className="mt-4 text-center">{message}</p>
        <button
          className={`mt-6 px-4 py-2 rounded ${
            isSuccess
              ? 'bg-green-500 hover:bg-green-700'
              : 'bg-red-500 hover:bg-red-700'
          } text-white`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
