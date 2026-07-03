import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminResources() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "", description: "", fileUrl: "", fileName: "" });
  
  const resources = trpc.resources.list.useQuery({});
  const create = trpc.resources.create.useMutation({ onSuccess: () => { resources.refetch(); setShowForm(false); setFormData({ title: "", category: "", description: "", fileUrl: "", fileName: "" }); } });
  const deleteResource = trpc.resources.delete.useMutation({ onSuccess: () => resources.refetch() });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create.mutateAsync(formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resources</h1>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" /> Add Resource</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Resource</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="File URL" value={formData.fileUrl} onChange={(e) => setFormData({...formData, fileUrl: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="File Name" value={formData.fileName} onChange={(e) => setFormData({...formData, fileName: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending}>Add Resource</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {resources.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {resources.data?.map((resource) => (
              <Card key={resource.id} className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{resource.title}</h3>
                  {resource.category && <p className="text-sm text-gray-600">{resource.category}</p>}
                </div>
                <Button size="sm" variant="outline" onClick={() => deleteResource.mutate({ id: resource.id })}><Trash2 className="w-4 h-4" /></Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
