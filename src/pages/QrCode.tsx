
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode as QrCodeIcon, Download, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Dummy QR code - this would be dynamically generated in a real app
const dummyQrCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOPSURBVO3BQY4cSRLAQDLQ//8yV0c/JZCqaqbxYGb/sNZlh7UuO6x12WGtyw5rXXZY67LDWpcd1rrssNZlh7UuO6x12WGtyw5rXXZY67LDWpc9PIjkb1JMJFOKJwqmFE8kv0kxkXzTYa3LDmtddljrsocPU7xJ8gmKiWQimUimFBPJlGIieUPxCYo3Sd50WOuyw1qXHda67OGXSd5Q/CbFRPKGYiKZUkwk31C8QfKbDmtddljrssNalz38YYqJZEoxkUwUE8Wblf9Zh7UuO6x12WGtyx7+MIonFN+g+A3J/7PDWpcd1rrssNZlD79M8psUE8kTionkTxbJlOKbDmtddljrssNalz18mOJ/STGRPKGYSCaKieQJxROKieRvOqx12WGtyw5rXfbwIMlEMqWYSKYUTyieUEwkU4qJ5BsUE8kbFG8oJpIpxZsOa112WOuyw1qXPTxQTCRTionkDYqJZErxCYqJ5A3FRDKlmEg+QfETionkTYe1LjusdclhrUvh/5jiG4qJZEoxkUwpJpKJYiKZKCaSKcVEMqV402Gtyw5rXXZY67KHB8lEMqWYSL5B8QnFG4qJZCKZUnyD4gnFRDKleFLxNx3WuuzW9u9GlDyhePqA4pvWZUgHjp5QPMHRYa3LDmtddljrsocHkk9QTCRTiicUE8kTiolkSjGRTCkmkolkSvGE4psUTyh+02Gtyw5rXXZY67KHB8UTionkGxRPKCaSieQNxUQypZhSPKF4k2IieULxicNalx3Wuuyw1mUPD5JMKSaSKcVE8obik0imFBPJlOI3KSaSKcVvOqx12WGtyw5rXfbwIZJPUDyhmEimFE8oJpIpxScUE8kbFJ9QTCRTionkDYe1LjusdclhrcseHkTyNykmkonkCcWUYiKZUryhmEimFE8k36CYSKYUbzqsddlhrcsOa1328GGKN0k+QfEJiolkSjGRTCkmkt+keJPiEw5rXXZY67LDWpc9/DLJGxRvUEwkE8mU4gnFRDKleIPiDYpPOKx12WGtyw5rXfbwl1N8QvGEYiKZKCaSE8UTioliIplSTCRvOqx12WGtyw5rXfbwl1NMJFOKiWRKMZFMKSaSKcV/STKleNNhrcsOa112WOuyhx/9h+QbiolkSjGRTCmmFFOKiWQimVI8oXjTYa3LDmtddljrsodfJvmbFBPJJyieUHxCMaWYSCaSb1C86bDWZYe1LjusdZn9w1qXHda67LDWZYe1LjusdclhrcuGtS77B7svF8XJ2S+nAAAAAElFTkSuQmCC";

const QrCodePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleGenerateQR = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate QR code
    setTimeout(() => {
      setIsGenerating(false);
      setQrCode(dummyQrCode);
      
      toast({
        title: "QR code generated",
        description: "Your emergency QR code is ready to use",
      });
    }, 1500);
  };

  const handleDownload = () => {
    // In a real app, this would download the actual QR code image
    const link = document.createElement("a");
    link.href = dummyQrCode;
    link.download = "caresync-emergency-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR code downloaded",
      description: "Your emergency QR code has been saved",
    });
  };

  const handleCopy = () => {
    // In a real app, this would copy the actual QR code to clipboard
    // For now, just show a toast
    toast({
      title: "QR code copied",
      description: "Your emergency QR code has been copied to clipboard",
    });
  };

  return (
    <DashboardLayout title="Emergency QR Code">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency Medical Access</CardTitle>
            <CardDescription>
              Generate a QR code that emergency responders can scan to access your critical medical information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="caresync-3d-element">
                {qrCode ? (
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 animate-pulse-light"></div>
                    <img
                      src={qrCode}
                      alt="Emergency QR Code"
                      className="w-64 h-64 mx-auto border-4 border-white shadow-lg rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
                    <QrCodeIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {qrCode ? (
                <div className="flex justify-center space-x-4">
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleGenerateQR} 
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Fast Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Emergency responders can quickly access your critical medical information.
              </p>
            </CardContent>
          </Card>
          
          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Privacy Controlled</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                You control exactly what information is visible during emergencies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Always Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Print it, save it to your phone, or share it with family members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QrCodePage;
