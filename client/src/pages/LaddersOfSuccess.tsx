import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function LaddersOfSuccess() {
  const [, navigate] = useLocation();
  const ladders = trpc.laddersOfSuccess.list.useQuery();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Ladders of Success</h1>
          <p className="text-lg opacity-90 mt-2">Our Discipleship Process</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {ladders.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {ladders.data?.map((ladder) => (
              <div key={ladder.id} className="bg-white p-6 rounded-lg shadow">
                {ladder.iconUrl && <img src={ladder.iconUrl} alt={ladder.stageName} className="w-16 h-16 mb-4" />}
                <h3 className="text-xl font-bold mb-2">{ladder.stageName}</h3>
                <p className="text-gray-600 mb-4">{ladder.description}</p>
                {ladder.bibleVerse && <p className="text-sm text-primary italic">{ladder.bibleVerse}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
