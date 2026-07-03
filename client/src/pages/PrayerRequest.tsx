import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function PrayerRequest() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", request: "" });
  const submit = trpc.prayerRequests.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit.mutateAsync(formData);
    setFormData({ name: "", email: "", phone: "", request: "" });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Prayer Request</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border rounded" />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded" />
          <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded" />
          <textarea placeholder="Your Prayer Request" value={formData.request} onChange={(e) => setFormData({...formData, request: e.target.value})} required rows={6} className="w-full px-4 py-2 border rounded" />
          <Button type="submit" disabled={submit.isPending}>Submit Prayer Request</Button>
        </form>
      </div>
    </div>
  );
}
