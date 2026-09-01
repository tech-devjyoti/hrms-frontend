const Avatar = ({ src, name = "", size = "md", className = "" }) => {
  const profilePicture = src || null;

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-blue-100
        font-semibold
        text-blue-600
        ${className}
      `}
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={name || "User"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
