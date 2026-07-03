import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function About() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white mb-4" onClick={() => navigate("/")}>← Back</Button>
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <p>About Us page content coming soon</p>
      </div>
    </div>
  );
}
