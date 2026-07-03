import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Events() {
  const [, navigate] = useLocation();
  const events = trpc.events.list.useQuery({});

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Events</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {events.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {events.data?.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{new Date(event.eventDate).toLocaleDateString()}</p>
                {event.venue && <p className="text-gray-600 mb-4">{event.venue}</p>}
                {event.hasRegistration && event.registrationUrl && (
                  <Button onClick={() => window.open(event.registrationUrl!)}>Register</Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
