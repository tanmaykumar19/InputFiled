import React, { useState } from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-1.5 text-sm rounded-md",   // smaller height
  md: "px-3 py-2 text-base rounded-lg",   // reduced height
  lg: "px-4 py-2.5 text-lg rounded-xl",   // still compact
};

const variantClasses = {
  filled:
    "bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40 shadow-sm",
  outlined:
    "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40 shadow-sm",
  ghost:
    "bg-transparent border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col w-full mb-4"> {/* margin between inputs */}
      {/* Label */}
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input container */}
      <div
        className={clsx(
          "relative flex items-center transition focus-within:ring-2",
          sizeClasses[size],
          variantClasses[variant],
          {
            "border-red-500 focus:border-red-500 focus:ring-red-400/40":
              invalid,
            "opacity-50 cursor-not-allowed": disabled,
          },
          className
        )}
      >
        {/* Input */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 disabled:cursor-not-allowed"
        />

        {/* Clear button */}
        {!loading &&
          clearable &&
          internalValue &&
          !disabled &&
          type !== "password" && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}

        {/* Password toggle */}
        {!loading && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4" />
        )}
      </div>

      {/* Helper / Error text */}
      {invalid && errorMessage ? (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      ) : (
        helperText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">
            {helperText}
          </p>
        )
      )}
    </div>
  );
};
