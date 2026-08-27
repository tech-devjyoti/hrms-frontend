const ProgressLine = ({ active = false }) => {
  return (
    <div
      className={`mx-1 h-px flex-1 sm:mx-3 ${
        active ? "bg-blue-700" : "bg-slate-300"
      }`}
    />
  );
};

export default ProgressLine;