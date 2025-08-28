import React from "react";
import clsx from "clsx";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  className?: string;
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  className,
  "aria-label": ariaLabel,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={clsx(
        "relative rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        {
          "opacity-50 cursor-not-allowed": isDisabled,
          "w-full": fullWidth,
          "p-2": iconOnly, // if only icon, make it square
        },
        className
      )}
    >
      {/* Loader overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4" />
        </span>
      )}

      {/* Children hidden when loading */}
      <span className={clsx({ "opacity-0": loading })}>{children}</span>
    </button>
  );
};
