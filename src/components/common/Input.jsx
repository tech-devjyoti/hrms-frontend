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
  className = "",
  ...rest
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

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
          px-3 py-2.5 text-sm text-slate-900
          outline-none transition
          placeholder:text-slate-400
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-500
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
          ${className}
        `}
        {...rest}
      />

      {error ? (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      ) : (
        helperText && (
          <p className="mt-1.5 text-xs text-slate-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

export default Input;