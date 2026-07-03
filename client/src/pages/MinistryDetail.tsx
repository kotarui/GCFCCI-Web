import { Button } from "@/components/ui/button";
import { useLocation, useRoute } from "wouter";

export default function MinistryDetail() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/ministry/:id");
  
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/ministries")}>← Back</Button>
          <h1 className="text-4xl font-bold">Ministry Details</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p>Ministry detail page for ID: {params?.id}</p>
      </div>
    </div>
  );
}
