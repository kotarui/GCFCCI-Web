import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminAnnouncements() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", imageUrl: "", publishedDate: new Date().toISOString().split('T')[0] });
  
  const announcements = trpc.announcements.list.useQuery({});
  const create = trpc.announcements.create.useMutation({ onSuccess: () => { announcements.refetch(); setShowForm(false); setFormData({ title: "", content: "", imageUrl: "", publishedDate: new Date().toISOString().split('T')[0] }); } });
  const update = trpc.announcements.update.useMutation({ onSuccess: () => { announcements.refetch(); setEditingId(null); } });
  const deleteAnnouncement = trpc.announcements.delete.useMutation({ onSuccess: () => announcements.refetch() });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, publishedDate: new Date(formData.publishedDate) };
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
          <h1 className="text-3xl font-bold">Announcements</h1>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }}><Plus className="w-4 h-4 mr-2" /> Add Announcement</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Announcement" : "Add New Announcement"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} required className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="date" value={formData.publishedDate} onChange={(e) => setFormData({...formData, publishedDate: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending || update.isPending}>{editingId ? "Update" : "Add"} Announcement</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {announcements.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {announcements.data?.map((announcement) => (
              <Card key={announcement.id} className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{announcement.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingId(announcement.id); setFormData({ title: announcement.title, content: announcement.content || "", imageUrl: announcement.imageUrl || "", publishedDate: new Date(announcement.publishedDate).toISOString().split('T')[0] }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteAnnouncement.mutate({ id: announcement.id })}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
