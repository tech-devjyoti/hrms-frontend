import { FiCheck } from "react-icons/fi";

const StepIndicator = ({
  step,
  title,
  active = false,
  completed = false,
}) => {
  return (
    <div className="flex min-w-0 flex-col items-center">

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
          active
            ? "bg-blue-600 text-white"
            : completed
              ? "bg-green-600 text-white"
              : "border border-slate-300 bg-white text-slate-400"
        }`}
      >
        {completed ? (
          <FiCheck size={15} />
        ) : (
          step
        )}
      </div>

      <span
        className={`mt-2 hidden text-xs font-medium sm:block ${
          active || completed
            ? "text-blue-600"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
};

export default StepIndicator;