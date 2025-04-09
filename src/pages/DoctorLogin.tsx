
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

const DoctorLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials check
      if (data.email === "doctor@example.com" && data.password === "password") {
        toast({
          title: "Logged in successfully",
          description: "Welcome back, Dr. Sarah Johnson",
        });
        
        navigate("/auth-success");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try doctor@example.com / password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Doctor Login" 
      subtitle="Access your doctor portal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="doctor@example.com"
              className="pl-10"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login to Doctor Portal"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have a doctor account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Contact administrator
          </Link>
        </p>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <p className="text-xs text-center text-gray-500">
          By logging in, you agree to CareSync's Terms of Service and Privacy Policy.
        </p>
      </div>
    </AuthLayout>
  );
};

export default DoctorLogin;
