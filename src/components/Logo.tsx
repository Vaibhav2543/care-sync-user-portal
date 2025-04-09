
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} flex items-center gap-2 ${className}`}>
      <div className="caresync-3d-element bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
        <span className="text-white font-extrabold">Care</span>
        <span className="text-blue-200 font-extrabold">Sync</span>
      </div>
      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-300 to-white animate-pulse-light shadow-lg"></div>
    </div>
  );
};

export default Logo;
