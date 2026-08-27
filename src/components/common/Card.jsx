const Card = ({
  icon,
  title,
  children,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">

      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="text-blue-600">
          {icon}
        </span>

        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {children}
      </div>

    </div>
  );
};

export default Card;