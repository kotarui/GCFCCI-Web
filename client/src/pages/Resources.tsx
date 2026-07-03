import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, Download } from "lucide-react";

export default function Resources() {
  const [, navigate] = useLocation();
  const resources = trpc.resources.list.useQuery({});

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Resources</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {resources.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {resources.data?.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
                  {resource.category && <p className="text-sm text-gray-600">{resource.category}</p>}
                  {resource.description && <p className="text-gray-600 text-sm mt-2">{resource.description}</p>}
                </div>
                <a href={resource.fileUrl} download className="inline-block">
                  <Download className="w-6 h-6 text-primary" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
