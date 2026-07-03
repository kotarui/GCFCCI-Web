import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminSermons() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", speaker: "", sermonDate: new Date().toISOString().split('T')[0], bibleReferences: "", category: "", videoUrl: "", audioUrl: "", pdfNotesUrl: "", thumbnailUrl: "", description: "" });
  
  const sermons = trpc.sermons.list.useQuery({});
  const create = trpc.sermons.create.useMutation({ onSuccess: () => { sermons.refetch(); setShowForm(false); setFormData({ title: "", speaker: "", sermonDate: new Date().toISOString().split('T')[0], bibleReferences: "", category: "", videoUrl: "", audioUrl: "", pdfNotesUrl: "", thumbnailUrl: "", description: "" }); } });
  const update = trpc.sermons.update.useMutation({ onSuccess: () => { sermons.refetch(); setEditingId(null); } });
  const deleteSermon = trpc.sermons.delete.useMutation({ onSuccess: () => sermons.refetch() });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, sermonDate: new Date(formData.sermonDate) };
    if (editingId) {
      await update.mutateAsync({ id: editingId, ...dataToSubmit });
    } else {
      await create.mutateAsync(dataToSubmit);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sermon Management</h1>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }}><Plus className="w-4 h-4 mr-2" /> Add Sermon</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Sermon" : "Add New Sermon"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Speaker" value={formData.speaker} onChange={(e) => setFormData({...formData, speaker: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="date" value={formData.sermonDate} onChange={(e) => setFormData({...formData, sermonDate: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Bible References" value={formData.bibleReferences} onChange={(e) => setFormData({...formData, bibleReferences: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Video URL" value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Audio URL" value={formData.audioUrl} onChange={(e) => setFormData({...formData, audioUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="PDF Notes URL" value={formData.pdfNotesUrl} onChange={(e) => setFormData({...formData, pdfNotesUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Thumbnail URL" value={formData.thumbnailUrl} onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending || update.isPending}>{editingId ? "Update" : "Add"} Sermon</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {sermons.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {sermons.data?.map((sermon) => (
              <Card key={sermon.id} className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold">{sermon.title}</h3>
                  <p className="text-sm text-gray-600">By {sermon.speaker}</p>
                  <p className="text-xs text-gray-500">{new Date(sermon.sermonDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingId(sermon.id); setFormData({ title: sermon.title, speaker: sermon.speaker, sermonDate: new Date(sermon.sermonDate).toISOString().split('T')[0], bibleReferences: sermon.bibleReferences || "", category: sermon.category || "", videoUrl: sermon.videoUrl || "", audioUrl: sermon.audioUrl || "", pdfNotesUrl: sermon.pdfNotesUrl || "", thumbnailUrl: sermon.thumbnailUrl || "", description: sermon.description || "" }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteSermon.mutate({ id: sermon.id })}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
