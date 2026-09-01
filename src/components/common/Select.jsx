const Select = ({
  label,
  name,
  value = "",
  onChange,
  error,
  options = [],
  required = false,
  placeholder,
  disabled = false,
  helperText,
  className = "",
  ...rest
}) => {
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full rounded-lg border bg-white
          px-3 py-2.5 text-sm text-slate-900
          outline-none transition
          cursor-pointer
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
      >
        <option value="">
          {placeholder ||
            (label ? `Select ${label.toLowerCase()}` : "Select an option")}
        </option>

        {options.map((option) => {
          const optionValue =
            typeof option === "string" ? option : option.value;

          const optionLabel =
            typeof option === "string" ? option : option.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>

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

export default Select;
