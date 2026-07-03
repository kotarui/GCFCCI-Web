import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSettings() {
  const settings = trpc.settings.get.useQuery();
  const updateSettings = trpc.settings.update.useMutation({ onSuccess: () => settings.refetch() });
  
  const [formData, setFormData] = useState({ churchName: "", address: "", phone: "", email: "", visionStatement: "", missionStatement: "", purposeStatement: "", logoUrl: "", bannerImageUrl: "", facebookUrl: "" });

  useEffect(() => {
    if (settings.data) {
      setFormData({
        churchName: settings.data.churchName || "",
        address: settings.data.address || "",
        phone: settings.data.phone || "",
        email: settings.data.email || "",
        visionStatement: settings.data.visionStatement || "",
        missionStatement: settings.data.missionStatement || "",
        purposeStatement: settings.data.purposeStatement || "",
        logoUrl: settings.data.logoUrl || "",
        bannerImageUrl: settings.data.bannerImageUrl || "",
        facebookUrl: settings.data.facebookUrl || ""
      });
    }
  }, [settings.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings.mutateAsync(formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Church Settings</h1>

        {settings.isLoading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Church Name" value={formData.churchName} onChange={(e) => setFormData({...formData, churchName: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded" />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded" />
              
              <div className="border-t pt-4">
                <h3 className="font-bold mb-4">Vision, Mission & Purpose</h3>
                <textarea placeholder="Vision Statement" value={formData.visionStatement} onChange={(e) => setFormData({...formData, visionStatement: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded mb-4" />
                <textarea placeholder="Mission Statement" value={formData.missionStatement} onChange={(e) => setFormData({...formData, missionStatement: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded mb-4" />
                <textarea placeholder="Purpose Statement" value={formData.purposeStatement} onChange={(e) => setFormData({...formData, purposeStatement: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded" />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-4">Branding</h3>
                <input type="url" placeholder="Logo URL" value={formData.logoUrl} onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} className="w-full px-4 py-2 border rounded mb-4" />
                <input type="url" placeholder="Banner URL" value={formData.bannerImageUrl} onChange={(e) => setFormData({...formData, bannerImageUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-4">Social Media</h3>
                <input type="url" placeholder="Facebook URL" value={formData.facebookUrl} onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})} className="w-full px-4 py-2 border rounded" />
              </div>

              <Button type="submit" disabled={updateSettings.isPending} className="w-full">Save Settings</Button>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
