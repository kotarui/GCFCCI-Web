import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function AdminVisitors() {
  const visitors = trpc.visitorRegistrations.list.useQuery();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">First-Time Visitors</h1>

        {visitors.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {visitors.data?.map((visitor: any) => (
              <Card key={visitor.id} className="p-4">
                <h3 className="font-bold">{visitor.name}</h3>
                <p className="text-sm text-gray-600">{visitor.email}</p>
                {visitor.phone && <p className="text-sm text-gray-600">{visitor.phone}</p>}
                {visitor.address && <p className="text-sm text-gray-600">{visitor.address}</p>}
                <p className="text-xs text-gray-500 mt-2">{new Date(visitor.createdAt).toLocaleString()}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
