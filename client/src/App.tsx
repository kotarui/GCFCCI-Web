import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./_core/hooks/useAuth";
import { DashboardLayoutSkeleton } from "./components/DashboardLayoutSkeleton";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import LaddersOfSuccess from "./pages/LaddersOfSuccess";
import Ministries from "./pages/Ministries";
import MinistryDetail from "./pages/MinistryDetail";
import SermonLibrary from "./pages/SermonLibrary";
import Events from "./pages/Events";
import PrayerRequest from "./pages/PrayerRequest";
import FirstTimeVisitors from "./pages/FirstTimeVisitors";
import ContactUs from "./pages/ContactUs";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Resources from "./pages/Resources";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeaders from "./pages/admin/Leaders";
import AdminSermons from "./pages/admin/Sermons";
import AdminEvents from "./pages/admin/Events";
import AdminMinistries from "./pages/admin/Ministries";
import AdminSettings from "./pages/admin/Settings";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminGallery from "./pages/admin/Gallery";
import AdminResources from "./pages/admin/Resources";
import AdminPrayerRequests from "./pages/admin/PrayerRequests";
import AdminVisitors from "./pages/admin/Visitors";
import AdminLaddersOfSuccess from "./pages/admin/LaddersOfSuccess";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <Switch>
      {/* Public pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/leadership"} component={Leadership} />
      <Route path={"/ladders-of-success"} component={LaddersOfSuccess} />
      <Route path={"/ministries"} component={Ministries} />
      <Route path={"/ministry/:id"} component={MinistryDetail} />
      <Route path={"/sermons"} component={SermonLibrary} />
      <Route path={"/events"} component={Events} />
      <Route path={"/prayer-request"} component={PrayerRequest} />
      <Route path={"/first-time-visitors"} component={FirstTimeVisitors} />
      <Route path={"/contact"} component={ContactUs} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/news"} component={News} />
      <Route path={"/resources"} component={Resources} />

      {/* Admin pages - require authentication */}
      {user?.role === "admin" && (
        <>
          <Route path={"/admin"} component={AdminDashboard} />
          <Route path={"/admin/leaders"} component={AdminLeaders} />
          <Route path={"/admin/sermons"} component={AdminSermons} />
          <Route path={"/admin/events"} component={AdminEvents} />
          <Route path={"/admin/ministries"} component={AdminMinistries} />
          <Route path={"/admin/announcements"} component={AdminAnnouncements} />
          <Route path={"/admin/gallery"} component={AdminGallery} />
          <Route path={"/admin/resources"} component={AdminResources} />
          <Route path={"/admin/prayer-requests"} component={AdminPrayerRequests} />
          <Route path={"/admin/visitors"} component={AdminVisitors} />
          <Route path={"/admin/ladders-of-success"} component={AdminLaddersOfSuccess} />
          <Route path={"/admin/settings"} component={AdminSettings} />
        </>
      )}

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
