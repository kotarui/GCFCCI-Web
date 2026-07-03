import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Gallery() {
  const [, navigate] = useLocation();
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const albums = trpc.gallery.albums.useQuery();
  const items = trpc.gallery.items.useQuery({ albumId: selectedAlbum || 0 }, { enabled: !!selectedAlbum });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Gallery</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {albums.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {albums.data?.map((album) => (
                <div key={album.id} className="cursor-pointer" onClick={() => setSelectedAlbum(album.id)}>
                  {album.coverImageUrl && <img src={album.coverImageUrl} alt={album.name} className="w-full h-40 object-cover rounded mb-2" />}
                  <h3 className="font-bold">{album.name}</h3>
                </div>
              ))}
            </div>
            {selectedAlbum && items.data && (
              <div className="grid md:grid-cols-4 gap-4">
                {items.data.map((item) => (
                  <div key={item.id}>
                    {item.mediaType === "image" ? (
                      <img src={item.mediaUrl} alt={item.caption || ""} className="w-full h-32 object-cover rounded" />
                    ) : (
                      <video src={item.mediaUrl} className="w-full h-32 object-cover rounded" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
