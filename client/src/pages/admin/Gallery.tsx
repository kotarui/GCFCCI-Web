import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus } from "lucide-react";

export default function AdminGallery() {
  const albums = trpc.gallery.albums.useQuery();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <Button><Plus className="w-4 h-4 mr-2" /> Create Album</Button>
        </div>

        {albums.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.data?.map((album) => (
              <Card key={album.id} className="p-4">
                {album.coverImageUrl && <img src={album.coverImageUrl} alt={album.name} className="w-full h-40 object-cover rounded mb-4" />}
                <h3 className="font-bold mb-2">{album.name}</h3>
                <Button size="sm" className="w-full">Manage Photos</Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
