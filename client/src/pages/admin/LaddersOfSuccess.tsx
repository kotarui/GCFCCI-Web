import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit } from "lucide-react";
import { useState } from "react";

export default function AdminLaddersOfSuccess() {
  const [showForm, setShowForm] = useState(false);
  const [editingStage, setEditingStage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ stageName: "", description: "", bibleVerse: "", iconUrl: "", imageUrl: "" });
  
  const ladders = trpc.laddersOfSuccess.list.useQuery();
  const update = trpc.laddersOfSuccess.update.useMutation({ onSuccess: () => { ladders.refetch(); setEditingStage(null); setShowForm(false); } });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStage) {
      const { stageName: _, ...dataToSubmit } = formData;
      await update.mutateAsync({ stageName: editingStage, ...dataToSubmit });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ladders of Success</h1>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Stage</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Stage Name (WIN, CONSOLIDATE, DISCIPLE, SEND)" value={formData.stageName} disabled className="w-full px-4 py-2 border rounded bg-gray-100" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Bible Verse" value={formData.bibleVerse} onChange={(e) => setFormData({...formData, bibleVerse: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Icon URL" value={formData.iconUrl} onChange={(e) => setFormData({...formData, iconUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={update.isPending}>Update Stage</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingStage(null); }}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {ladders.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ladders.data?.map((stage) => (
              <Card key={stage.stageName} className="p-4">
                {stage.iconUrl && <img src={stage.iconUrl} alt={stage.stageName} className="w-12 h-12 mb-2" />}
                <h3 className="font-bold mb-2">{stage.stageName}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{stage.description}</p>
                {stage.bibleVerse && <p className="text-xs text-primary italic mb-4">{stage.bibleVerse}</p>}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingStage(stage.stageName); setFormData({ stageName: stage.stageName, description: stage.description || "", bibleVerse: stage.bibleVerse || "", iconUrl: stage.iconUrl || "", imageUrl: stage.imageUrl || "" }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
