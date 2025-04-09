
import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-secondary p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto py-12 px-4">
          <Link to="/">
            <Logo size="lg" className="text-white mb-8" />
          </Link>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Your health documents, always accessible.
            </h1>
            <p className="text-lg opacity-90">
              Securely manage your medical records and get instant access during emergencies.
            </p>
          </div>
          
          <div className="caresync-3d-element">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-white/10 rounded-2xl rotate-6 animate-float"></div>
              <div className="absolute inset-0 bg-white/20 rounded-2xl -rotate-6 animate-float" style={{ animationDelay: "1s" }}></div>
              <div className="absolute inset-0 bg-white/30 rounded-2xl rotate-3 animate-float" style={{ animationDelay: "2s" }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
