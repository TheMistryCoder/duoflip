import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
	{
		src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		alt: "Children engaging with interactive mathematics projection on classroom floor",
		caption: "Interactive Mathematics",
	},
	{
		src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		alt: "Student with special educational needs using interactive floor projection",
		caption: "SEN Learning Environment",
	},
	{
		src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
		alt: "Early years students during story time with interactive wall projection",
		caption: "EYFS Story Time",
	},
];

export default function Gallery() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="gallery" className="scroll-mt-20 py-20 bg-gradient-to-br from-slate-50 to-blue-50" ref={ref}>
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="flex justify-center mb-6">
						<div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
							<span className="text-sm font-semibold text-emerald-700 tracking-wider uppercase">Gallery</span>
						</div>
					</div>
					<h2 className="text-hierarchy-1 mb-6">See Duo Flip in Action Across UK Schools</h2>
					<p className="section-subtitle max-w-4xl mx-auto">Explore real classroom environments where Duo Flip is making learning more interactive, engaging, and accessible for students of all abilities</p>
				</motion.div>

				<motion.div className="grid md:grid-cols-3 gap-8" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.2 }}>
					{galleryImages.map((image, index) => (
						<motion.div key={index} className="group cursor-pointer" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }} whileHover={{ y: -8 }}>
							<div className="bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
								<div className="overflow-hidden">
									<img src={image.src} alt={image.alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
								</div>
								<div className="p-6">
									<h3 className="text-lg font-semibold text-slate-800 text-center">{image.caption}</h3>
									<div className="mt-3 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400 rounded-full mx-auto w-16"></div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.6 }}>
					<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg">
						<p className="text-lg text-slate-700 max-w-3xl mx-auto">Join hundreds of schools across the UK who have transformed their learning environments with Duo Flip interactive technology</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
