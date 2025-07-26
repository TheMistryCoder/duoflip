import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import duoFlipLogo from "@/assets/duo-flip-logo.png";

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const sectionIds = ["home", "how-it-works", "benefits", "solutions", "demo", "gallery", "contact"];

		const handleSectionChange = () => {
			for (const id of sectionIds) {
				const section = document.getElementById(id);
				if (section) {
					const rect = section.getBoundingClientRect();
					if (rect.top <= 120 && rect.bottom >= 120) {
						setActiveSection(id);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleSectionChange);
		return () => window.removeEventListener("scroll", handleSectionChange);
	}, []);
	// Prevent background scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.classList.add("overflow-hidden");
			document.body.style.paddingRight = scrollBarWidth + "px";
		} else {
			document.body.classList.remove("overflow-hidden");
			document.body.style.paddingRight = "";
		}
	}, [isMobileMenuOpen]);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setIsMobileMenuOpen(false);
	};

	const scrollToContact = () => scrollToSection("contact");

	return (
		<nav role="navigation" aria-label="Main navigation" className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-neutral-50/90 backdrop-blur-sm shadow-md" : "bg-neutral-50/90 backdrop-blur-sm shadow-sm"}`}>
			<div className="nav-container">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center gap-4">
						<button onClick={scrollToTop} aria-label="Scroll to top" className="focus:outline-none">
							<img src={duoFlipLogo} alt="Duo Flip Logo" className="h-12 w-auto object-contain align-middle" style={{ display: "block" }} />
						</button>
					</div>
					<div className="hidden lg:flex items-center space-x-12">
						<button onClick={() => scrollToSection("home")} className={`${activeSection === "home" ? "text-sky-500" : "text-slate-600"} hover:text-sky-500 transition-colors`}>
							Home
						</button>
						<button onClick={() => scrollToSection("how-it-works")} className={`${activeSection === "how-it-works" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors`}>
							How It Works
						</button>
						<button onClick={() => scrollToSection("benefits")} className={`${activeSection === "benefits" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors`}>
							Benefits
						</button>
						<button onClick={() => scrollToSection("solutions")} className={`${activeSection === "solutions" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors`}>
							Solutions
						</button>
						<button onClick={() => scrollToSection("demo")} className={`${activeSection === "demo" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors`}>
							Demo
						</button>
						<button onClick={() => scrollToSection("gallery")} className={`${activeSection === "gallery" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors`}>
							Gallery
						</button>
						<Button
							onClick={() => {
								scrollToContact();
								setActiveSection("contact");
							}}
							className="bg-gradient-to-r from-pink-400 to-amber-400 text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
						>
							Request Demo
						</Button>
					</div>
					<button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						<Menu className="w-6 h-6" />
					</button>
				</div>
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div key="mobile-menu" initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="lg:hidden fixed top-0 right-0 z-50 flex flex-col bg-white h-screen overflow-y-auto w-11/12 max-w-xs sm:max-w-sm shadow-2xl">
							<div className="flex items-center justify-end px-6 py-4 border-b border-slate-200">
								<button className="p-2" onClick={() => setIsMobileMenuOpen(false)}>
									<X className="w-6 h-6" />
								</button>
							</div>
							<div className="flex flex-col px-6 py-6 flex-1">
								<button
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									Home
								</button>
								<button
									onClick={() => {
										scrollToSection("how-it-works");
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									How It Works
								</button>
								<button
									onClick={() => {
										scrollToSection("benefits");
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									Benefits
								</button>
								<button
									onClick={() => {
										scrollToSection("solutions");
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									Solutions
								</button>
								<button
									onClick={() => {
										scrollToSection("demo");
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									Demo
								</button>
								<button
									onClick={() => {
										scrollToSection("gallery");
										setIsMobileMenuOpen(false);
									}}
									className="text-slate-600 transition-colors text-left py-3 border-b border-slate-100"
								>
									Gallery
								</button>
								<Button
									onClick={() => {
										scrollToContact();
										setIsMobileMenuOpen(false);
									}}
									className="bg-gradient-to-r from-pink-400 to-amber-400 text-white w-full mt-8"
								>
									Request Demo
								</Button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	);
}
