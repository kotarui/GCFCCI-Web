import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, Mail, Phone } from "lucide-react";

export default function Leadership() {
  const [, navigate] = useLocation();
  const leaders = trpc.leaders.list.useQuery();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Leadership Team</h1>
          <p className="text-lg opacity-90 mt-2">Meet the leaders guiding our church</p>
        </div>
      </div>

      {/* Leaders Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {leaders.isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
          ) : leaders.data?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.data.map((leader) => (
                <Card key={leader.id} className="overflow-hidden hover:shadow-lg transition">
                  {leader.photoUrl && (
                    <img src={leader.photoUrl} alt={leader.name} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                    <p className="text-primary font-semibold mb-2">{leader.position}</p>
                    {leader.ministry && <p className="text-sm text-gray-600 mb-3">{leader.ministry}</p>}
                    {leader.biography && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{leader.biography}</p>}
                    {leader.favoriteVerseReference && (
                      <div className="bg-blue-50 p-3 rounded mb-4">
                        <p className="text-xs font-semibold text-primary mb-1">{leader.favoriteVerseReference}</p>
                        {leader.favoriteVerseText && <p className="text-xs text-gray-600 italic">{leader.favoriteVerseText}</p>}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {leader.contactEmail && (
                        <a href={`mailto:${leader.contactEmail}`} className="inline-block">
                          <Mail className="w-5 h-5 text-gray-400 hover:text-primary" />
                        </a>
                      )}
                      {leader.contactPhone && (
                        <a href={`tel:${leader.contactPhone}`} className="inline-block">
                          <Phone className="w-5 h-5 text-gray-400 hover:text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No leaders available</p>
          )}
        </div>
      </section>
    </div>
  );
}
