"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, BookOpen, Calculator } from "lucide-react";

const solutions = [
	{
		icon: Lightbulb,
		title: "SEN Environments",
		description: "Create calming, interactive sensory experiences for children with special educational needs. The floor projection encourages movement and exploration in a controlled, safe environment.",
		features: ["Sensory stimulation through interactive visuals", "Encourages social interaction and communication", "Adaptable content for different needs and abilities"],
		image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		gradient: "from-emerald-400 to-sky-500",
		dotColor: "bg-emerald-400",
	},
	{
		icon: BookOpen,
		title: "EYFS Story Time",
		description: "Transform traditional story time into an immersive experience where children can interact with characters and scenes, bringing stories to life through movement and touch.",
		features: ["Interactive storytelling with visual elements", "Encourages imagination and creativity", "Develops listening and comprehension skills"],
		image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		gradient: "from-purple-400 to-pink-400",
		dotColor: "bg-purple-400",
	},
	{
		icon: Calculator,
		title: "Movement-Based Learning",
		description: "Make maths and phonics come alive with physical movement. Children can step on numbers, trace letters, and solve problems using their whole body as they learn.",
		features: ["Kinesthetic learning for better retention", "Makes abstract concepts tangible", "Combines physical activity with learning"],
		image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		gradient: "from-pink-400 to-amber-400",
		dotColor: "bg-pink-400",
	},
];

export default function Solutions() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="solutions" className="scroll-mt-20 py-20 bg-white" ref={ref}>
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="flex justify-center mb-6">
						<div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
							<span className="text-sm font-semibold text-purple-700 tracking-wider uppercase">Real Solutions</span>
						</div>
					</div>
					<h2 className="section-heading mb-6">Proven Applications Across Educational Settings</h2>
					<p className="section-subtitle max-w-4xl mx-auto">Discover how leading schools implement Duo Flip to create engaging, inclusive learning environments that support diverse educational needs</p>
				</motion.div>

				{solutions.map((solution, index) => (
					<motion.div key={index} className={`grid md:grid-cols-2 gap-12 items-center mb-16 ${index === 1 ? "md:direction-reverse" : ""}`} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: index * 0.2 }}>
						<div className={`space-y-6 ${index === 1 ? "md:order-2" : ""}`}>
							<div className="flex items-center space-x-4">
								<motion.div className={`w-12 h-12 bg-gradient-to-br ${solution.gradient} rounded-full flex items-center justify-center`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
									<solution.icon className="w-6 h-6 text-white" />
								</motion.div>
								<h3 className="text-2xl font-semibold text-slate-800">{solution.title}</h3>
							</div>
							<p className="text-slate-600 text-lg leading-relaxed">{solution.description}</p>
							<ul className="space-y-2 text-slate-600">
								{solution.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-start space-x-3">
										<div className={`w-2 h-2 ${solution.dotColor} rounded-full mt-2 flex-shrink-0`}></div>
										<span className="leading-relaxed">{feature}</span>
									</li>
								))}
							</ul>
						</div>
						<motion.div className={`relative ${index === 1 ? "md:order-1" : ""}`} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
							<img src={solution.image} alt={`${solution.title} classroom environment`} className="rounded-2xl shadow-xl w-full" />
						</motion.div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
