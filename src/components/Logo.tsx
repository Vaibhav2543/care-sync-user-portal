
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "sidebar";
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md", 
  variant = "default" 
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  // Different background styles based on variant
  const bgStyles = {
    default: "bg-white/20 backdrop-blur-md",
    sidebar: "bg-primary/20 backdrop-blur-md"
  };

  // Different text styles based on variant
  const textStyles = {
    default: {
      first: "text-white",
      second: "text-blue-200"
    },
    sidebar: {
      first: "text-primary-foreground",
      second: "text-secondary"
    }
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} flex items-center gap-2 ${className}`}>
      <div className={`caresync-3d-element ${bgStyles[variant]} px-3 py-1 rounded-lg`}>
        <span className={`${textStyles[variant].first} font-extrabold`}>Care</span>
        <span className={`${textStyles[variant].second} font-extrabold`}>Sync</span>
      </div>
      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-300 to-white animate-pulse-light shadow-lg"></div>
    </div>
  );
};

export default Logo;
