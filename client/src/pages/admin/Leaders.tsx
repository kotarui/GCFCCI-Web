import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminLeaders() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", position: "", ministry: "", biography: "", photoUrl: "", favoriteVerseReference: "", favoriteVerseText: "", contactEmail: "", contactPhone: "" });
  
  const leaders = trpc.leaders.list.useQuery();
  const create = trpc.leaders.create.useMutation({ onSuccess: () => { leaders.refetch(); setShowForm(false); setFormData({ name: "", position: "", ministry: "", biography: "", photoUrl: "", favoriteVerseReference: "", favoriteVerseText: "", contactEmail: "", contactPhone: "" }); } });
  const update = trpc.leaders.update.useMutation({ onSuccess: () => { leaders.refetch(); setEditingId(null); setFormData({ name: "", position: "", ministry: "", biography: "", photoUrl: "", favoriteVerseReference: "", favoriteVerseText: "", contactEmail: "", contactPhone: "" }); } });
  const deleteLeader = trpc.leaders.delete.useMutation({ onSuccess: () => leaders.refetch() });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update.mutateAsync({ id: editingId, ...formData });
    } else {
      await create.mutateAsync(formData);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Leadership Management</h1>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }}><Plus className="w-4 h-4 mr-2" /> Add Leader</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Leader" : "Add New Leader"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Ministry" value={formData.ministry} onChange={(e) => setFormData({...formData, ministry: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Biography" value={formData.biography} onChange={(e) => setFormData({...formData, biography: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Photo URL" value={formData.photoUrl} onChange={(e) => setFormData({...formData, photoUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Favorite Bible Verse Reference" value={formData.favoriteVerseReference} onChange={(e) => setFormData({...formData, favoriteVerseReference: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Favorite Bible Verse Text" value={formData.favoriteVerseText} onChange={(e) => setFormData({...formData, favoriteVerseText: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="tel" placeholder="Contact Phone" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending || update.isPending}>{editingId ? "Update" : "Add"} Leader</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {leaders.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {leaders.data?.map((leader) => (
              <Card key={leader.id} className="p-4 flex justify-between items-center">
                <div className="flex gap-4 flex-1">
                  {leader.photoUrl && <img src={leader.photoUrl} alt={leader.name} className="w-16 h-16 rounded object-cover" />}
                  <div>
                    <h3 className="font-bold">{leader.name}</h3>
                    <p className="text-sm text-gray-600">{leader.position}</p>
                    {leader.ministry && <p className="text-xs text-gray-500">{leader.ministry}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingId(leader.id); setFormData({ name: leader.name, position: leader.position, ministry: leader.ministry || "", biography: leader.biography || "", photoUrl: leader.photoUrl || "", favoriteVerseReference: leader.favoriteVerseReference || "", favoriteVerseText: leader.favoriteVerseText || "", contactEmail: leader.contactEmail || "", contactPhone: leader.contactPhone || "" }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteLeader.mutate({ id: leader.id })}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
