"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Video, RotateCcw, Wifi, Edit3 } from "lucide-react";

const steps = [
	{
		icon: Video,
		title: "Adjustable Mount",
		description: "Ultra-short-throw Epson projector on mobile stand with adjustable angles",
		gradient: "from-sky-500 to-emerald-400",
	},
	{
		icon: RotateCcw,
		title: "Flexible Display",
		description: "Project interactive content on floors for gross motor skills or walls for presentations",
		gradient: "from-emerald-400 to-purple-400",
	},
	{
		icon: Wifi,
		title: "Wireless Content",
		description: "Connect wirelessly to nearby PC with no cables or monthly subscriptions required",
		gradient: "from-purple-400 to-pink-400",
	},
	{
		icon: Edit3,
		title: "Interactive Pens",
		description: "Dual-pen capability enables collaborative learning and fine motor skill development",
		gradient: "from-pink-400 to-amber-400",
	},
];

export default function HowItWorks() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="how-it-works" className="scroll-mt-20 py-20 bg-white" ref={ref}>
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full mb-6">
						<span className="text-sm font-semibold text-sky-700 tracking-wider uppercase">How It Works</span>
					</div>
					<h2 className="text-hierarchy-1 mb-6">Transform Any Space Into Interactive Learning</h2>
					<p className="section-subtitle max-w-4xl mx-auto">Our innovative four-step system makes it simple to create engaging, collaborative learning experiences that adapt to your classroom needs</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => (
						<motion.div key={index} className="text-center group" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
							<div className="mb-6">
								<motion.div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto transition-transform duration-300`} whileHover={{ scale: 1.1 }}>
									<step.icon className="w-10 h-10 text-white" />
								</motion.div>
							</div>
							<h3 className="text-hierarchy-3 mb-3">
								<span className={`bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent font-bold mr-2`}>{index + 1}.</span>
								{step.title}
							</h3>
							<p className="text-slate-600 leading-relaxed">{step.description}</p>
						</motion.div>
					))}
				</div>

				<motion.div className="mt-16 relative" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.5 }}>
					<div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl p-8 text-center">
						<img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" alt="Interactive projector setup in modern classroom environment" className="w-full max-w-4xl mx-auto rounded-xl shadow-lg" />
						<p className="text-slate-600 mt-4 text-lg">Transform any space into an interactive learning environment</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
