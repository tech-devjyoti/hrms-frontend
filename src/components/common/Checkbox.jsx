const Checkbox = ({
  name,
  checked,
  onChange,
  error,
  children,
}) => {
  return (
    <div>

      <label className="flex cursor-pointer items-start gap-3">

        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
        />

        <span className="text-sm leading-6 text-slate-600">
          {children}
        </span>

      </label>

      {error && (
        <p className="ml-7 mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Checkbox;