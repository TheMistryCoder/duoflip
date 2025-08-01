import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Solutions from "@/components/sections/Solutions";
import Testimonials from "@/components/sections/Testimonials";
import Demo from "@/components/sections/Demo";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTopButton";

export default function Home() {
	return (
		<>
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
			<ScrollToTop />
		</>
	);
}
