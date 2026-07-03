import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function News() {
  const [, navigate] = useLocation();
  const announcements = trpc.announcements.list.useQuery({});

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">News & Announcements</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {announcements.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-6">
            {announcements.data?.map((announcement) => (
              <div key={announcement.id} className="bg-white p-6 rounded-lg shadow">
                {announcement.imageUrl && <img src={announcement.imageUrl} alt={announcement.title} className="w-full h-40 object-cover rounded mb-4" />}
                <h3 className="text-2xl font-bold mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.content}</p>
                <p className="text-sm text-gray-500">{new Date(announcement.publishedDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
