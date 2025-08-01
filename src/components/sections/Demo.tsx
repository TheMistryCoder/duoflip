"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { duoFlipVideoUrl } from "@/config/videoUrls";

const demoFeatures = ["Transforms traditional learning into active, engaging experiences", "Encourages collaboration and social interaction among students", "Supports different learning styles and abilities inclusively", "Integrates seamlessly into existing classroom workflows"];

export default function Demo() {
	const ref = useRef<HTMLElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [showModalVideo, setShowModalVideo] = useState(false);

	const scrollToContact = () => {
		const element = document.getElementById("contact");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="demo" className="scroll-mt-20 py-20 bg-white" ref={ref}>
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="flex justify-center mb-6">
						<div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full">
							<span className="text-sm font-semibold text-amber-700 tracking-wider uppercase">Live Demo</span>
						</div>
					</div>
					<h2 className="section-heading mb-4">Demo Video</h2>
					<p className="section-subtitle max-w-4xl mx-auto text-center">
						See how <span className="font-semibold">Duo Flip</span> transforms classrooms with hands-on, collaborative activities and real-time feedback. Watch the demo to experience the future of learning.
					</p>
				</motion.div>

				<motion.div className="grid lg:grid-cols-2 gap-12 items-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.2 }}>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex items-center justify-center aspect-video min-h-[200px]"
						style={{
							backgroundImage: showModalVideo ? "none" : "url(https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600)",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						{!showModalVideo && (
							<button onClick={() => setShowModalVideo(true)} className="absolute inset-0 flex items-center justify-center focus:outline-none" aria-label="Play Demo Video">
								<span className="bg-white rounded-full p-6 shadow-lg flex items-center justify-center">
									<Play className="w-16 h-16 text-pink-400" />
								</span>
							</button>
						)}
					</motion.div>

					<div className="space-y-6">
						<h3 className="text-3xl font-semibold text-slate-800">Experience Interactive Learning</h3>
						<p className="text-lg text-slate-600 leading-relaxed">Our demonstration video showcases real children using the Duo Flip in various educational settings. See firsthand how this innovative technology:</p>
						<ul className="space-y-4">
							{demoFeatures.map((feature, index) => (
								<motion.li key={index} className="flex items-start space-x-3" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
									<div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
										<Check className="w-3 h-3 text-white" strokeWidth={3} />
									</div>
									<span className="text-slate-600">{feature}</span>
								</motion.li>
							))}
						</ul>

						<div className="pt-4">
							<Button onClick={scrollToContact} className="bg-gradient-to-r from-pink-400 to-amber-400 text-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" size="lg">
								Schedule Your Demo Today
							</Button>
						</div>
					</div>
				</motion.div>

				{/* Video Modal */}
				{showModalVideo && (
					<motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModalVideo(false)}>
						<div className="bg-white rounded-lg p-4 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Duo Flip Demo Video</h3>
								<button onClick={() => setShowModalVideo(false)} className="text-slate-400 hover:text-slate-600">
									✕
								</button>
							</div>
							<div className="aspect-video bg-slate-200 rounded flex items-center justify-center">
								<video src={duoFlipVideoUrl} controls autoPlay playsInline className="w-full h-auto aspect-video bg-black" style={{ maxHeight: 400 }} />
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</section>
	);
}
