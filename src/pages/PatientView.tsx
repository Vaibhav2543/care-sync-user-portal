
import React from "react";
import { useParams, Link } from "react-router-dom";
import DoctorLayout from "@/components/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Calendar, FileText, User, Activity, ArrowLeft } from "lucide-react";

// Mock patient data
const patientData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "15 May 1978",
  bloodType: "O+",
  height: "5'10\"",
  weight: "165 lbs",
  allergies: ["Penicillin", "Shellfish"],
  conditions: ["Hypertension", "Type 2 Diabetes"],
  documents: [
    { id: "1", name: "Blood Test Results.pdf", date: "2 days ago", type: "Lab Report" },
    { id: "2", name: "Recent Prescription.pdf", date: "1 week ago", type: "Prescription" },
    { id: "3", name: "ECG Report.pdf", date: "2 weeks ago", type: "Diagnostic" },
    { id: "4", name: "Vaccination Record.pdf", date: "1 month ago", type: "Immunization" }
  ]
};

const PatientView = () => {
  const { id } = useParams();
  // In a real app, we would fetch the patient data based on the ID
  // For demo purposes, we're using the mock data
  const patient = patientData;

  return (
    <DoctorLayout title={`Patient: ${patient.name}`}>
      <div className="mb-4">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/doctor/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              
              <h2 className="text-xl font-bold text-center">{patient.name}</h2>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{patient.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{patient.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{patient.dateOfBirth}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Medical Information</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div>
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="font-medium">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p>{patient.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p>{patient.weight}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="documents">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Patient Records</CardTitle>
                <TabsList>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="allergies">Allergies</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Medical Documents</h3>
                  <Link to={`/doctor/patients/${id}/documents`}>
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                
                <div className="divide-y">
                  {patient.documents.map((doc) => (
                    <div key={doc.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/doctor/reviews/${doc.id}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="conditions">
                <div className="space-y-4">
                  <h3 className="font-medium">Chronic Conditions</h3>
                  <div className="space-y-2">
                    {patient.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <Activity className="h-5 w-5 text-primary" />
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="allergies">
                <div className="space-y-4">
                  <h3 className="font-medium">Known Allergies</h3>
                  <div className="space-y-2">
                    {patient.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>{allergy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </DoctorLayout>
  );
};

export default PatientView;
