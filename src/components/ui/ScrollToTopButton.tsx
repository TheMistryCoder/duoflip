"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// if (!isVisible) return null;

	return (
		<motion.button onClick={scrollToTop} className={`fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-br from-emerald-400 to-purple-400 rounded-full flex items-center justify-center shadow-md transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-label="Scroll to top" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
			<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
			</svg>
		</motion.button>
	);
}
