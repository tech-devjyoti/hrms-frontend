import { FiLoader } from "react-icons/fi";

const Loader = ({ fullScreen = false, className = "" }) => {
  return (
    <div
      className={`
        flex items-center justify-center
        ${fullScreen ? "min-h-screen" : "min-h-80"}
        ${className}
      `}
    >
      <FiLoader
        className="
          h-8 w-8
          animate-spin
          text-blue-600
          sm:h-10 sm:w-10
          lg:h-12 lg:w-12
        "
      />
    </div>
  );
};

export default Loader;
