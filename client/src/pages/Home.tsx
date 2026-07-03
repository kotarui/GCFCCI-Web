import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2, MapPin, Phone, Mail, Facebook } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const settings = trpc.settings.get.useQuery();
  const upcomingEvents = trpc.events.upcoming.useQuery({ limit: 3 });
  const latestSermons = trpc.sermons.list.useQuery({ limit: 3 });
  const announcements = trpc.announcements.list.useQuery({ limit: 2 });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {settings.data?.logoUrl && (
              <img src={settings.data.logoUrl} alt="Church Logo" className="h-10 w-10" />
            )}
            <h1 className="font-bold text-lg text-primary">God's Covering</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
            <Button variant="ghost" onClick={() => navigate("/leadership")}>Leadership</Button>
            <Button variant="ghost" onClick={() => navigate("/ministries")}>Ministries</Button>
            <Button variant="ghost" onClick={() => navigate("/sermons")}>Sermons</Button>
            <Button variant="ghost" onClick={() => navigate("/events")}>Events</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            {user?.role === "admin" && (
              <Button onClick={() => navigate("/admin")}>Admin</Button>
            )}
            {!user && (
              <Button onClick={() => window.location.href = getLoginUrl()}>Sign In</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to God's Covering Family Cell Church Inc.</h2>
          <p className="text-xl mb-8 opacity-90">Go and Make Disciples of All Nations</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/prayer-request")}>
              Prayer Request
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/first-time-visitors")}>
              First Time Visitor?
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/events")}>
              Join Us This Sunday
            </Button>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Purpose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-gray-600">{settings.data?.visionStatement || "Go and Make Disciples of All Nations"}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-600">{settings.data?.missionStatement || "To reach, teach, and transform lives through the Gospel of Jesus Christ"}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Our Purpose</h3>
              <p className="text-gray-600">{settings.data?.purposeStatement || "To build a community of believers committed to spiritual growth and service"}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          {upcomingEvents.isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
          ) : upcomingEvents.data?.length ? (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.data.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition">
                  {event.bannerImageUrl && (
                    <img src={event.bannerImageUrl} alt={event.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{new Date(event.eventDate).toLocaleDateString()}</p>
                    {event.eventTime && <p className="text-sm text-gray-600 mb-2">{event.eventTime}</p>}
                    {event.venue && <p className="text-sm text-gray-600 mb-4">{event.venue}</p>}
                    {event.hasRegistration && event.registrationUrl && (
                      <Button size="sm" onClick={() => window.open(event.registrationUrl!)}>Register</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming events</p>
          )}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate("/events")}>View All Events</Button>
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Sermons</h2>
          {latestSermons.isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
          ) : latestSermons.data?.length ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestSermons.data.map((sermon) => (
                <Card key={sermon.id} className="p-4 hover:shadow-lg transition">
                  {sermon.thumbnailUrl && (
                    <img src={sermon.thumbnailUrl} alt={sermon.title} className="w-full h-32 object-cover rounded mb-4" />
                  )}
                  <h3 className="font-bold mb-2">{sermon.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">By {sermon.speaker}</p>
                  <p className="text-xs text-gray-500">{new Date(sermon.sermonDate).toLocaleDateString()}</p>
                  <div className="mt-4 flex gap-2">
                    {sermon.videoUrl && <Button size="sm" variant="outline">Watch</Button>}
                    {sermon.audioUrl && <Button size="sm" variant="outline">Listen</Button>}
                    {sermon.pdfNotesUrl && <Button size="sm" variant="outline">Notes</Button>}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No sermons available</p>
          )}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate("/sermons")}>View Sermon Library</Button>
          </div>
        </div>
      </section>

      {/* Announcements */}
      {announcements.data?.length ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Latest Announcements</h2>
            <div className="space-y-4">
              {announcements.data.map((announcement) => (
                <Card key={announcement.id} className="p-4">
                  <h3 className="font-bold mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(announcement.publishedDate).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">God's Covering Church</h4>
              <p className="text-gray-400 text-sm">{settings.data?.visionStatement}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" onClick={() => navigate("/about")} className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" onClick={() => navigate("/sermons")} className="text-gray-400 hover:text-white">Sermons</a></li>
                <li><a href="#" onClick={() => navigate("/events")} className="text-gray-400 hover:text-white">Events</a></li>
                <li><a href="#" onClick={() => navigate("/contact")} className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {settings.data?.address && (
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>{settings.data.address}</p>
                  </div>
                )}
                {settings.data?.phone && (
                  <div className="flex gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <p>{settings.data.phone}</p>
                  </div>
                )}
                {settings.data?.email && (
                  <div className="flex gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <p>{settings.data.email}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              {settings.data?.facebookUrl && (
                <a href={settings.data.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Facebook className="w-6 h-6 text-gray-400 hover:text-white" />
                </a>
              )}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} God's Covering Family Cell Church Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
