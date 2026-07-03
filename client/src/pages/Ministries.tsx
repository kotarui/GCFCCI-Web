import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Ministries() {
  const [, navigate] = useLocation();
  const ministries = trpc.ministries.list.useQuery();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Our Ministries</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {ministries.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.data?.map((ministry) => (
              <div key={ministry.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer" onClick={() => navigate(`/ministry/${ministry.id}`)}>
                {ministry.imageUrl && <img src={ministry.imageUrl} alt={ministry.name} className="w-full h-40 object-cover rounded mb-4" />}
                <h3 className="text-xl font-bold mb-2">{ministry.name}</h3>
                <p className="text-gray-600 line-clamp-2">{ministry.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
