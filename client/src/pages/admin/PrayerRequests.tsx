import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function AdminPrayerRequests() {
  const prayerRequests = trpc.prayerRequests.list.useQuery();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Prayer Requests</h1>

        {prayerRequests.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {prayerRequests.data?.map((request) => (
              <Card key={request.id} className="p-4">
                <h3 className="font-bold">{request.name}</h3>
                {request.email && <p className="text-sm text-gray-600">{request.email}</p>}
                {request.phone && <p className="text-sm text-gray-600">{request.phone}</p>}
                <p className="text-gray-600 mt-2">{request.request}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(request.createdAt).toLocaleString()}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
