import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Users, BookOpen, Calendar, Church, MessageSquare, Image, FileText, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const leaders = trpc.leaders.list.useQuery();
  const sermons = trpc.sermons.list.useQuery({});
  const events = trpc.events.list.useQuery({});
  const ministries = trpc.ministries.list.useQuery();
  const prayerRequests = trpc.prayerRequests.list.useQuery();
  const announcements = trpc.announcements.list.useQuery({});

  const stats = [
    { label: "Leaders", value: leaders.data?.length || 0, icon: Users, color: "bg-blue-100", onClick: () => navigate("/admin/leaders") },
    { label: "Sermons", value: sermons.data?.length || 0, icon: BookOpen, color: "bg-green-100", onClick: () => navigate("/admin/sermons") },
    { label: "Events", value: events.data?.length || 0, icon: Calendar, color: "bg-purple-100", onClick: () => navigate("/admin/events") },
    { label: "Ministries", value: ministries.data?.length || 0, icon: Church, color: "bg-orange-100", onClick: () => navigate("/admin/ministries") },
    { label: "Prayer Requests", value: prayerRequests.data?.length || 0, icon: MessageSquare, color: "bg-pink-100", onClick: () => navigate("/admin/prayer-requests") },
    { label: "Announcements", value: announcements.data?.length || 0, icon: FileText, color: "bg-yellow-100", onClick: () => navigate("/admin/announcements") },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all church content and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 cursor-pointer hover:shadow-lg transition" onClick={stat.onClick}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button onClick={() => navigate("/admin/leaders")} variant="outline" className="w-full">Add Leader</Button>
            <Button onClick={() => navigate("/admin/sermons")} variant="outline" className="w-full">Add Sermon</Button>
            <Button onClick={() => navigate("/admin/events")} variant="outline" className="w-full">Add Event</Button>
            <Button onClick={() => navigate("/admin/settings")} variant="outline" className="w-full">Settings</Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Leadership Management
            </h3>
            <p className="text-gray-600 text-sm mb-4">Add, edit, and manage church leaders and their profiles.</p>
            <Button onClick={() => navigate("/admin/leaders")} className="w-full">Manage Leaders</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Sermon Library
            </h3>
            <p className="text-gray-600 text-sm mb-4">Upload and manage sermons with video, audio, and PDF notes.</p>
            <Button onClick={() => navigate("/admin/sermons")} className="w-full">Manage Sermons</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Events
            </h3>
            <p className="text-gray-600 text-sm mb-4">Create and manage church events with registration options.</p>
            <Button onClick={() => navigate("/admin/events")} className="w-full">Manage Events</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Church className="w-5 h-5" /> Ministries
            </h3>
            <p className="text-gray-600 text-sm mb-4">Create and organize unlimited ministry programs.</p>
            <Button onClick={() => navigate("/admin/ministries")} className="w-full">Manage Ministries</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Image className="w-5 h-5" /> Gallery
            </h3>
            <p className="text-gray-600 text-sm mb-4">Upload and organize photos and videos into albums.</p>
            <Button onClick={() => navigate("/admin/gallery")} className="w-full">Manage Gallery</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Settings
            </h3>
            <p className="text-gray-600 text-sm mb-4">Configure church information, colors, and branding.</p>
            <Button onClick={() => navigate("/admin/settings")} className="w-full">Church Settings</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
