
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const SplashScreen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="text-center max-w-xl">
        <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Logo size="lg" className="text-white inline-block mb-8" />
          
          <div className="caresync-3d-element mb-12">
            <div className="relative mx-auto w-48 h-48">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse-light"></div>
              <div className="absolute inset-0 rounded-full bg-white/5 animate-rotate-3d"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-lg animate-float"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Health Records, Simplified
          </h1>
          
          <p className="text-xl text-white/90 mb-10 max-w-lg mx-auto">
            Store, access, and share your medical documents securely. Be prepared for any emergency.
          </p>
          
          <Link 
            to="/login" 
            className="inline-block caresync-btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
