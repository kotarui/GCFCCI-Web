import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SermonLibrary() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const sermons = trpc.sermons.search.useQuery({ searchTerm: searchTerm || "" });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Sermon Library</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <input type="text" placeholder="Search sermons..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border rounded" />
        </div>
        {sermons.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {sermons.data?.map((sermon) => (
              <div key={sermon.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                <p className="text-gray-600 mb-2">By {sermon.speaker}</p>
                <p className="text-sm text-gray-500 mb-4">{new Date(sermon.sermonDate).toLocaleDateString()}</p>
                <div className="flex gap-2">
                  {sermon.videoUrl && <Button size="sm" variant="outline">Watch</Button>}
                  {sermon.audioUrl && <Button size="sm" variant="outline">Listen</Button>}
                  {sermon.pdfNotesUrl && <Button size="sm" variant="outline">Notes</Button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
