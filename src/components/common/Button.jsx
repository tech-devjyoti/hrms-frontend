import { FiLoader } from "react-icons/fi";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "right",
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4.5 py-2
        text-sm font-medium
        shadow-sm transition
        focus:outline-none focus:ring-2 focus:ring-offset-2
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <FiLoader size={17} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {iconPosition === "left" && icon}

          {children}

          {iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

export default Button;
