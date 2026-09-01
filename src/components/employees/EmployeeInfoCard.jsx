const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
};

export default InfoItem