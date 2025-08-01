"use client";
import * as React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Hand, Zap, Sun, Users, DollarSign, Search, ArrowRight } from "lucide-react";

interface Benefit {
	icon: React.ElementType;
	title: string;
	description: string;
	gradient: string;
	color: string;
}

const benefits: Benefit[] = [
	{
		icon: Hand,
		title: "Hands-On Learning",
		description: "Encourages immersive, active exploration that increases group collaboration and is inclusive for all learners.",
		gradient: "from-sky-500 to-emerald-400",
		color: "text-emerald-500",
	},
	{
		icon: Zap,
		title: "Motor Skill Development",
		description: "Dual pens develop fine motor skills while floor interactivity builds gross motor skills and core strength.",
		gradient: "from-emerald-400 to-purple-400",
		color: "text-purple-400",
	},
	{
		icon: Sun,
		title: "Eye-Safe Learning",
		description: "Works perfectly in bright environments with no blue light exposure, ensuring safe learning for young eyes.",
		gradient: "from-purple-400 to-pink-400",
		color: "text-pink-400",
	},
	{
		icon: Users,
		title: "Perfect for Groups",
		description: "Ideal for group play, SEN environments, and EYFS activities that promote social learning and collaboration.",
		gradient: "from-pink-400 to-amber-400",
		color: "text-amber-400",
	},
	{
		icon: DollarSign,
		title: "One-Time Purchase",
		description: "No ongoing monthly subscriptions required. Single purchase with wireless PC connection for maximum value.",
		gradient: "from-amber-400 to-sky-500",
		color: "text-sky-500",
	},
	{
		icon: Search,
		title: "Discovery & Exploration",
		description: "Children can independently explore through play, using critical thinking skills to problem solve and understand concepts.",
		gradient: "from-sky-500 to-purple-400",
		color: "text-sky-500",
	},
];

export default function Benefits() {
	const ref = useRef<HTMLElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="benefits" className="scroll-mt-20 py-20 bg-gradient-to-br from-blue-50 to-purple-50" ref={ref}>
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="flex justify-center mb-6">
						<div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
							<span className="text-sm font-semibold text-emerald-700 tracking-wider uppercase">Key Benefits</span>
						</div>
					</div>
					<h2 className="text-slate-800 mb-6">Why 500+ Schools Choose Duo Flip</h2>
					<p className="section-subtitle max-w-4xl mx-auto">Proven results in Early Years, Primary classrooms, and SEN environments with measurable improvements in engagement and learning outcomes</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit, index) => (
						<motion.div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }}>
							<motion.div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-full flex items-center justify-center mb-6`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
								<benefit.icon className="w-8 h-8 text-white" />
							</motion.div>
							<h3 className="text-2xl font-semibold mb-4 text-slate-800">{benefit.title}</h3>
							<p className="text-slate-600 mb-4">{benefit.description}</p>
							<div className={`flex items-center ${benefit.color} font-semibold text-sm group-hover:translate-x-1 transition-transform`}>
								<span>Learn more</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
