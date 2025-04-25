import React from "react";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "md", 
  disabled = false, 
  loading = false 
}) => {
  // Base Styles
  const baseStyles = "rounded-lg font-medium transition-all duration-300 focus:outline-none flex items-center justify-center";

  // Variants (Button Colors)
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-300",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-4 focus-visible:ring-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-4 focus-visible:ring-green-300",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-4 focus-visible:ring-yellow-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-red-300",
    outline: "border border-gray-600 text-gray-600 hover:bg-gray-100 focus-visible:ring-4 focus-visible:ring-gray-300",
  };

  // Sizes (Responsive Padding & Text)
  const sizes = {
    sm: "px-3 py-1 text-sm md:px-4 md:py-2",  // Scales for md screens
    md: "px-4 py-2 text-base md:px-5 md:py-2.5",
    lg: "px-6 py-3 text-lg md:px-8 md:py-4",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}

      {children}
    </button>
  );
};

export default Button;
