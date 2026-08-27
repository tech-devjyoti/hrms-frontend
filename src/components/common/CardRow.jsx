const CardRow = ({
  label,
  value,
}) => {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="break-words text-sm font-medium text-slate-900 sm:col-span-2">
        {value}
      </span>

    </div>
  );
};

export default CardRow;