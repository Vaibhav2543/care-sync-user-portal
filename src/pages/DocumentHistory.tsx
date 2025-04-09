
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File, Search, Calendar, Eye } from "lucide-react";

// Dummy data for document history
const documents = [
  {
    id: "1",
    name: "Blood Test Results",
    description: "Annual blood work from Dr. Smith",
    date: "2023-04-01",
    tags: ["lab-results", "annual-checkup"],
    type: "PDF",
  },
  {
    id: "2",
    name: "COVID-19 Vaccination Card",
    description: "Vaccination record with booster shots",
    date: "2023-02-15",
    tags: ["vaccination", "covid"],
    type: "PDF",
  },
  {
    id: "3",
    name: "Chest X-Ray",
    description: "Chest X-ray from City Hospital",
    date: "2022-11-22",
    tags: ["x-ray", "radiology"],
    type: "PDF",
  },
  {
    id: "4",
    name: "Insurance Card",
    description: "Health insurance documentation",
    date: "2022-09-10",
    tags: ["insurance", "administrative"],
    type: "PDF",
  },
];

const DocumentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <DashboardLayout title="Document History">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            placeholder="Search documents by name, description or tag..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <File className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{doc.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{doc.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(doc.date)}
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/document/${doc.id}`}>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No documents found</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? `No documents match "${searchQuery}". Try a different search term.` 
                  : "You haven't uploaded any documents yet."}
              </p>
              {!searchQuery && (
                <Button asChild className="mt-4">
                  <Link to="/upload">Upload your first document</Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DocumentHistory;
