import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminMinistries() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", imageUrl: "", contactEmail: "", contactPhone: "" });
  
  const ministries = trpc.ministries.list.useQuery();
  const create = trpc.ministries.create.useMutation({ onSuccess: () => { ministries.refetch(); setShowForm(false); setFormData({ name: "", description: "", imageUrl: "", contactEmail: "", contactPhone: "" }); } });
  const update = trpc.ministries.update.useMutation({ onSuccess: () => { ministries.refetch(); setEditingId(null); } });
  const deleteMinistry = trpc.ministries.delete.useMutation({ onSuccess: () => ministries.refetch() });

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
          <h1 className="text-3xl font-bold">Ministry Management</h1>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }}><Plus className="w-4 h-4 mr-2" /> Add Ministry</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Ministry" : "Add New Ministry"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Ministry Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="tel" placeholder="Contact Phone" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending || update.isPending}>{editingId ? "Update" : "Add"} Ministry</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {ministries.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {ministries.data?.map((ministry) => (
              <Card key={ministry.id} className="p-4 flex justify-between items-center">
                <div className="flex gap-4 flex-1">
                  {ministry.imageUrl && <img src={ministry.imageUrl} alt={ministry.name} className="w-16 h-16 rounded object-cover" />}
                  <div>
                    <h3 className="font-bold">{ministry.name}</h3>
                    {ministry.contactEmail && <p className="text-sm text-gray-600">{ministry.contactEmail}</p>}
                    {ministry.contactPhone && <p className="text-xs text-gray-500">{ministry.contactPhone}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingId(ministry.id); setFormData({ name: ministry.name, description: ministry.description || "", imageUrl: ministry.imageUrl || "", contactEmail: ministry.contactEmail || "", contactPhone: ministry.contactPhone || "" }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMinistry.mutate({ id: ministry.id })}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
