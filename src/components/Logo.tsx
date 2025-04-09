
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
      <div className="caresync-3d-element">
        <span className="text-primary">Care</span>
        <span className="text-secondary">Sync</span>
      </div>
      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse-light"></div>
    </div>
  );
};

export default Logo;
