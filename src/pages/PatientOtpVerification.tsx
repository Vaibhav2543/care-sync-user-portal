
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stethoscope, Shield, CheckCircle2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const PatientOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  
  const email = location.state?.email || "user@example.com";
  const isNewUser = location.state?.isNewUser || false;
  
  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleVerify = () => {
    if (value.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Get stored OTP
    const storedOTP = sessionStorage.getItem('patientOTP');
    
    setTimeout(() => {
      if (value === storedOTP) {
        toast({
          title: "Verification Successful",
          description: isNewUser 
            ? "Your account has been created successfully" 
            : "Welcome back to CareSync",
        });
        // Clear stored OTP
        sessionStorage.removeItem('patientOTP');
        navigate("/dashboard");
      } else {
        toast({
          title: "Verification Failed",
          description: "The OTP you entered is incorrect",
          variant: "destructive",
        });
        setIsVerifying(false);
      }
    }, 1500);
  };
  
  const handleResendOTP = () => {
    setResendDisabled(true);
    setCountdown(30);
    setValue("");
    
    const newOTP = generateOTP();
    sessionStorage.setItem('patientOTP', newOTP);
    
    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent to ${email}`,
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
          <div className="mb-4 relative inline-block">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <div className="relative z-10 p-4">
              <Shield className="h-12 w-12 mx-auto mb-2 opacity-90" />
              <Stethoscope className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Verify Your Account</h1>
          <p className="opacity-90 mt-2">
            {isNewUser 
              ? "We've sent a verification code to your email" 
              : "Confirm your identity to access your account"}
          </p>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-1">Enter the 6-digit code sent to</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
          
          <div className="mb-8">
            <InputOTP 
              maxLength={6}
              value={value} 
              onChange={(val) => setValue(val)}
              containerClassName="justify-center gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <Button 
            onClick={handleVerify} 
            className="w-full mb-4 font-medium"
            disabled={isVerifying || value.length !== 6}
          >
            {isVerifying ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verify & Continue
              </>
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
            <Button 
              variant="link" 
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="text-primary font-medium p-0 h-auto"
            >
              {resendDisabled 
                ? `Resend code in ${countdown}s` 
                : "Resend verification code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOtpVerification;
