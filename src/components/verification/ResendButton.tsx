
import React from "react";
import { Button } from "@/components/ui/button";

interface ResendButtonProps {
  disabled: boolean;
  countdown: number;
  onResend: () => void;
}

const ResendButton = ({ disabled, countdown, onResend }: ResendButtonProps) => {
  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
      <Button 
        variant="link" 
        onClick={onResend}
        disabled={disabled}
        className="text-primary font-medium p-0 h-auto"
      >
        {disabled 
          ? `Resend code in ${countdown}s` 
          : "Resend verification code"}
      </Button>
    </div>
  );
};

export default ResendButton;
