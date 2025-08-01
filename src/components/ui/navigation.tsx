"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
		const handleResize = () => {
			if (window.innerWidth >= 1024 && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const sectionIds = ["home", "how-it-works", "benefits", "solutions", "testimonials", "demo", "gallery", "contact"];

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
		<>
			<nav role="navigation" aria-label="Main navigation" className={`fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? "bg-white/80 shadow-md" : "bg-white/80 shadow-sm"}`}>
				<div className="nav-container">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center gap-4">
							<button onClick={scrollToTop} aria-label="Scroll to top" className="focus:outline-none">
								<img src="/duo-flip-logo.png" alt="Duo Flip Logo" className="h-12 w-auto object-contain align-middle" style={{ display: "block" }} />
							</button>
						</div>
						<div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
							<button onClick={() => scrollToSection("home")} className={`${activeSection === "home" ? "text-sky-500" : "text-slate-600"} hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Home
							</button>
							<button onClick={() => scrollToSection("how-it-works")} className={`${activeSection === "how-it-works" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								How It Works
							</button>
							<button onClick={() => scrollToSection("benefits")} className={`${activeSection === "benefits" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Benefits
							</button>
							<button onClick={() => scrollToSection("solutions")} className={`${activeSection === "solutions" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Solutions
							</button>
							<button onClick={() => scrollToSection("testimonials")} className={`${activeSection === "testimonials" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Testimonials
							</button>
							<button onClick={() => scrollToSection("demo")} className={`${activeSection === "demo" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Demo
							</button>
							<button onClick={() => scrollToSection("gallery")} className={`${activeSection === "gallery" ? "text-sky-500" : "text-slate-600"}  hover:text-sky-500 transition-colors whitespace-nowrap text-base xl:text-md`}>
								Gallery
							</button>
							<Button
								onClick={() => {
									scrollToContact();
									setActiveSection("contact");
								}}
								className="bg-gradient-to-r from-pink-400 to-amber-400 text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap ml-4"
							>
								Request Demo
							</Button>
						</div>
						<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
							<svg width="48px" height="48px" viewBox="-5.6 -5.6 39.20 39.20" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
								<g strokeWidth="0" />
								<g strokeLinecap="round" strokeLinejoin="round" />
								<g>
									<path d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z" className="fill-sky-400" />
									<path d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z" className="fill-sky-400" />
									<path d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z" className="fill-sky-400" />
								</g>
							</svg>
						</button>
					</div>
					<AnimatePresence>
						{isMobileMenuOpen && (
							<>
								<motion.div key="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed inset-0 z-40 bg-gradient-to-br from-emerald-400/50 to-purple-400/50 backdrop-blur-md backdrop-brightness-90" onClick={() => setIsMobileMenuOpen(false)} />

								<motion.div key="mobile-menu" initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="lg:hidden fixed top-0 right-0 z-50 flex flex-col bg-white h-screen overflow-y-auto w-11/12 max-w-xs sm:max-w-sm shadow-2xl">
									<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
										<div className="flex-shrink-0">
											<img src="/duo-flip-logo.png" alt="Duo Flip Logo" className="h-10 w-auto object-contain" />
										</div>
										<div className="flex justify-end">
											<button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 p-3 inline-flex items-center justify-center focus:outline-none focus-visible:outline-none relative z-50" aria-label="Close menu">
												<svg viewBox="0 0 24 24" className="w-12 h-12 fill-white" xmlns="http://www.w3.org/2000/svg">
													<circle cx="12" cy="12" r="11.5" className="fill-sky-400" />
													<path d="M15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" className="fill-white" />
												</svg>
											</button>
										</div>
									</div>

									<div className="flex flex-col px-6 pt-6 pb-8 flex-1 gap-4">
										<button
											onClick={() => {
												window.scrollTo({ top: 0, behavior: "smooth" });
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "home" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Home
										</button>
										<button
											onClick={() => {
												scrollToSection("how-it-works");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "how-it-works" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											How It Works
										</button>
										<button
											onClick={() => {
												scrollToSection("benefits");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "benefits" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Benefits
										</button>
										<button
											onClick={() => {
												scrollToSection("solutions");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "solutions" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Solutions
										</button>
										<button
											onClick={() => {
												scrollToSection("testimonials");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "testimonials" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Testimonials
										</button>
										<button
											onClick={() => {
												scrollToSection("demo");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "demo" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Demo
										</button>
										<button
											onClick={() => {
												scrollToSection("gallery");
												setIsMobileMenuOpen(false);
											}}
											className={`${activeSection === "gallery" ? "text-sky-500" : "text-slate-600"} transition-colors text-left pb-3 border-b border-slate-100`}
										>
											Gallery
										</button>
										<Button
											onClick={() => {
												scrollToContact();
												setIsMobileMenuOpen(false);
											}}
											className="bg-gradient-to-r from-pink-400 to-amber-400 text-white w-full mt-6"
										>
											Request Demo
										</Button>
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</div>
			</nav>
		</>
	);
}
