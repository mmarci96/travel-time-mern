const Popup = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black w-[60vw] h-[40vh] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Popup;
