"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Play, Zap } from "lucide-react";

export default function Hero() {
	const scrollToContact = (): void => {
		const element = document.getElementById("contact");
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	const scrollToDemo = (): void => {
		const element = document.getElementById("demo");
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section id="home" className="scroll-mt-20 pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
			<div className="site-container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
					<motion.div className="space-y-6 md:space-y-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
						<div className="space-y-4 md:space-y-6">
							<motion.h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight md:leading-tight lg:leading-[1.1]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
								Interactive Learning That <span className="bg-gradient-to-r from-sky-500 via-emerald-400 to-purple-400 bg-clip-text text-transparent">Moves With You</span>
							</motion.h1>

							<motion.p className="mt-0 mb-10 text-lg md:text-2xl text-slate-600 max-w-2xl leading-relaxed md:leading-relaxed lg:leading-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
								The Duo Flip brings hands-on discovery to life with pen-based projection on any floor or wall. Perfect for Early Years, Primary classrooms, and SEN environments.
							</motion.p>
						</div>

						<motion.div className="flex flex-row gap-3 sm:gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
							<Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-sky-500 to-emerald-400 text-white hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 px-4 sm:px-8 py-3 sm:py-4 flex-1 sm:flex-none text-sm sm:text-base">
								<span>Request Demo</span>
								<Zap className="w-4 h-4 ml-1 sm:ml-2" />
							</Button>
							<Button onClick={scrollToDemo} variant="outline" size="lg" className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white transition-all duration-300 px-4 sm:px-8 py-3 sm:py-4 flex-1 sm:flex-none text-sm sm:text-base">
								<span>View in Action</span>
								<Play className="w-4 h-4 ml-1 sm:ml-2" />
							</Button>
						</motion.div>

						<motion.div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-4 sm:gap-x-8 sm:gap-y-3 text-sm text-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
							{[
								{ text: "No monthly subscriptions", color: "bg-emerald-400" },
								{ text: "Wireless connectivity", color: "bg-purple-400" },
								{ text: "No blue light", color: "bg-pink-400" },
							].map((item, i) => (
								<div key={i} className="flex items-center space-x-2">
									<div className={`w-2 h-2 ${item.color} rounded-full`}></div>
									<span>{item.text}</span>
								</div>
							))}
						</motion.div>
					</motion.div>

					<motion.div className="relative w-full max-w-2xl mx-auto lg:max-w-none" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
						<motion.div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[5/4] lg:aspect-[4/3]" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
							<img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" alt="Children using interactive floor projector in classroom" className="w-full h-full object-cover object-center" />
							<div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent"></div>
						</motion.div>

						{/* Floating feature badges */}
						<motion.div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white rounded-full p-2 md:p-4 shadow-lg" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
							<div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-full flex items-center justify-center">
								<svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
							</div>
						</motion.div>

						<motion.div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white rounded-full p-2 md:p-4 shadow-lg" animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
							<div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center">
								<svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
