
import React, { useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock document data
const pendingDocuments = [
  {
    id: "1",
    name: "Blood Test Results.pdf",
    patientName: "John Doe",
    uploadDate: "2 days ago",
    priority: "High",
  },
  {
    id: "2",
    name: "X-Ray Report.pdf",
    patientName: "Jane Smith",
    uploadDate: "3 days ago",
    priority: "Medium",
  },
  {
    id: "3",
    name: "Vaccination Record.pdf",
    patientName: "Robert Johnson",
    uploadDate: "1 week ago",
    priority: "Low",
  },
];

const reviewedDocuments = [
  {
    id: "4",
    name: "ECG Report.pdf",
    patientName: "Emily Clark",
    reviewDate: "Yesterday",
    status: "Approved",
  },
  {
    id: "5",
    name: "MRI Results.pdf",
    patientName: "John Doe",
    reviewDate: "3 days ago",
    status: "Rejected",
  },
];

const DocumentCard = ({ document, isPending = true }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{document.name}</h3>
            <p className="text-sm text-gray-500">
              Patient: {document.patientName} • {isPending ? `Uploaded ${document.uploadDate}` : `Reviewed ${document.reviewDate}`}
            </p>
            {isPending && (
              <div className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium
                ${document.priority === 'High' ? 'bg-red-100 text-red-800' : 
                  document.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}`}>
                {document.priority} Priority
              </div>
            )}
            {!isPending && (
              <div className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium
                ${document.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'}`}>
                {document.status}
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={`/doctor/reviews/${document.id}`}>
                <EyeIcon size={16} className="mr-1" /> View
              </Link>
            </Button>
            {isPending && (
              <>
                <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle size={16} className="mr-1" /> Approve
                </Button>
                <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700">
                  <XCircle size={16} className="mr-1" /> Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentReviews = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <DoctorLayout title="Document Reviews">
      <Tabs defaultValue="pending" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Review ({pendingDocuments.length})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingDocuments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No documents pending review.</p>
              </CardContent>
            </Card>
          ) : (
            pendingDocuments.map(doc => (
              <DocumentCard key={doc.id} document={doc} isPending={true} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="reviewed" className="space-y-4">
          {reviewedDocuments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No reviewed documents.</p>
              </CardContent>
            </Card>
          ) : (
            reviewedDocuments.map(doc => (
              <DocumentCard key={doc.id} document={doc} isPending={false} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </DoctorLayout>
  );
};

export default DocumentReviews;
