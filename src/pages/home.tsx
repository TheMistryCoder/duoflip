import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Benefits from "@/components/sections/benefits";
import Solutions from "@/components/sections/solutions";
import Testimonials from "@/components/sections/testimonials";
import Demo from "@/components/sections/demo";
import Gallery from "@/components/sections/gallery";
import Contact from "@/components/sections/contact";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Solutions />
      <Testimonials />
      <Demo />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
