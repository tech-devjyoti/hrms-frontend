import { FiX } from "react-icons/fi";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value = "",
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  clearable = false,
  onClear,
  icon = null,
  className = "",
  ...rest
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }

    onChange({
      target: {
        name,
        value: "",
      },
    });
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full rounded-lg border bg-white
            py-2.5 text-sm text-slate-900
            outline-none transition
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500
            ${icon ? "pl-10" : "pl-3"}
            ${clearable && value ? "pr-10" : "pr-3"}
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
            ${className}
          `}
          {...rest}
        />

        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label={`Clear ${label || name}`}
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : (
        helperText && (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        )
      )}
    </div>
  );
};

export default Input;
