import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminEvents() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", eventDate: new Date().toISOString().split('T')[0], eventTime: "", venue: "", bannerImageUrl: "", hasRegistration: false, registrationUrl: "" });
  
  const events = trpc.events.list.useQuery({});
  const create = trpc.events.create.useMutation({ onSuccess: () => { events.refetch(); setShowForm(false); setFormData({ title: "", description: "", eventDate: new Date().toISOString().split('T')[0], eventTime: "", venue: "", bannerImageUrl: "", hasRegistration: false, registrationUrl: "" }); } });
  const update = trpc.events.update.useMutation({ onSuccess: () => { events.refetch(); setEditingId(null); } });
  const deleteEvent = trpc.events.delete.useMutation({ onSuccess: () => events.refetch() });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, eventDate: new Date(formData.eventDate) };
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
          <h1 className="text-3xl font-bold">Event Management</h1>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }}><Plus className="w-4 h-4 mr-2" /> Add Event</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Event" : "Add New Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded" />
              <input type="date" value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} required className="w-full px-4 py-2 border rounded" />
              <input type="time" value={formData.eventTime} onChange={(e) => setFormData({...formData, eventTime: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="url" placeholder="Banner Image URL" value={formData.bannerImageUrl} onChange={(e) => setFormData({...formData, bannerImageUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.hasRegistration} onChange={(e) => setFormData({...formData, hasRegistration: e.target.checked})} className="w-4 h-4" />
                <span>Has Registration</span>
              </label>
              {formData.hasRegistration && (
                <input type="url" placeholder="Registration URL" value={formData.registrationUrl} onChange={(e) => setFormData({...formData, registrationUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              )}
              <div className="flex gap-2">
                <Button type="submit" disabled={create.isPending || update.isPending}>{editingId ? "Update" : "Add"} Event</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {events.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {events.data?.map((event) => (
              <Card key={event.id} className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</p>
                  {event.venue && <p className="text-xs text-gray-500">{event.venue}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingId(event.id); setFormData({ title: event.title, description: event.description || "", eventDate: new Date(event.eventDate).toISOString().split('T')[0], eventTime: event.eventTime || "", venue: event.venue || "", bannerImageUrl: event.bannerImageUrl || "", hasRegistration: event.hasRegistration || false, registrationUrl: event.registrationUrl || "" }); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteEvent.mutate({ id: event.id })}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
