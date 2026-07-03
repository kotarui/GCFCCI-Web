import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactUs() {
  const [, navigate] = useLocation();
  const settings = trpc.settings.get.useQuery();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            {settings.data?.address && (
              <div className="flex gap-4 mb-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <p>{settings.data.address}</p>
              </div>
            )}
            {settings.data?.phone && (
              <div className="flex gap-4 mb-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <p>{settings.data.phone}</p>
              </div>
            )}
            {settings.data?.email && (
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <p>{settings.data.email}</p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded" />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border rounded" />
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
