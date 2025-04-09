
import React from "react";
import DoctorLayout from "@/components/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

// Mock patient data
const patients = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john.doe@example.com", 
    age: 45, 
    documentsCount: 4,
    lastUpload: "2 days ago"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    age: 32, 
    documentsCount: 2,
    lastUpload: "1 week ago"
  },
  { 
    id: "3", 
    name: "Robert Johnson", 
    email: "robert.j@example.com", 
    age: 58, 
    documentsCount: 6,
    lastUpload: "3 days ago"
  },
  { 
    id: "4", 
    name: "Emily Clark", 
    email: "emily.c@example.com", 
    age: 29, 
    documentsCount: 1,
    lastUpload: "2 weeks ago"
  },
];

const PatientList = () => {
  return (
    <DoctorLayout title="Patient Records">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-gray-700 mb-4 md:mb-0">
              Showing <span className="font-bold">{patients.length}</span> patients
            </p>
            <div className="flex gap-2">
              <Button variant="outline">
                Export List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Last Upload</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.documentsCount}</TableCell>
                  <TableCell>{patient.lastUpload}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/doctor/patients/${patient.id}`}>
                          <Eye size={16} className="mr-1" /> View
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/doctor/patients/${patient.id}/documents`}>
                          <FileText size={16} className="mr-1" /> Documents
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DoctorLayout>
  );
};

export default PatientList;
