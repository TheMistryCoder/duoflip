"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/Carousel";

const testimonials = [
	{
		name: "Sarah Matthews",
		role: "Year 2 Teacher",
		image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "The Duo Flip has transformed how my students engage with learning. They're up, moving, and collaborating in ways I never thought possible. It's particularly amazing for children who struggle with traditional desk-based activities.",
		quoteColor: "text-emerald-500",
	},
	{
		name: "David Chen",
		role: "SEN Coordinator",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "For our SEN students, the Duo Flip has been a game-changer. Children who normally struggle with focus are completely engaged. The sensory aspect combined with interactive learning is just perfect for our needs.",
		quoteColor: "text-purple-400",
	},
	{
		name: "Emma Richardson",
		role: "Head Teacher",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "The investment in Duo Flip has paid dividends. Parents are amazed by how excited their children are about learning. It's particularly effective for kinesthetic learners and has improved engagement across all ability levels.",
		quoteColor: "text-pink-400",
	},
	{
		name: "Michael Thompson",
		role: "Primary School Principal",
		image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "Since introducing Duo Flip, we've seen a 40% increase in student participation. The physical movement combined with learning has revolutionized our classroom dynamics and improved overall academic performance.",
		quoteColor: "text-blue-500",
	},
	{
		name: "Lisa Parker",
		role: "Reception Teacher",
		image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "Early years children absolutely love the Duo Flip! It's incredible how it helps develop their motor skills while they learn. The joy on their faces when they use it is priceless - learning has never been this fun.",
		quoteColor: "text-orange-500",
	},
	{
		name: "James Wilson",
		role: "Deputy Head",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "The Duo Flip has transformed our approach to inclusive education. Students with different learning needs all benefit from this innovative tool. It's become an essential part of our teaching methodology.",
		quoteColor: "text-indigo-500",
	},
	{
		name: "Rachel Green",
		role: "Year 5 Teacher",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "My older students were initially skeptical, but now they request to use the Duo Flip for everything! It's amazing how it makes complex subjects more accessible and memorable through movement.",
		quoteColor: "text-teal-500",
	},
	{
		name: "Mark Davis",
		role: "Education Consultant",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100",
		quote: "I've observed Duo Flip in over 20 schools now. The consistent positive impact on student engagement and learning outcomes is remarkable. It's truly innovative educational technology at its finest.",
		quoteColor: "text-red-500",
	},
];

export default function Testimonials() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [slideCount, setSlideCount] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!api) return;

		const updateSlideCount = () => {
			const slides = api.scrollSnapList();
			setSlideCount(slides.length);
			setCurrent(api.selectedScrollSnap());
		};

		// ⏸️ Pause on user drag/swipe
		const handleUserInteraction = () => {
			setIsPaused(true);
			if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
			pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000);
		};

		updateSlideCount();
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});

		api.on("pointerDown", handleUserInteraction); // Mobile + Desktop
		api.on("scroll", handleUserInteraction); // Fallback for touch devices

		return () => {
			api.off("select", updateSlideCount);
			api.off("pointerDown", handleUserInteraction);
			api.off("scroll", handleUserInteraction);
		};
	}, [api]);

	// Auto-scroll functionality
	useEffect(() => {
		if (!api || isHovered || isPaused) return;

		let interval: NodeJS.Timeout | null = null;

		const startAutoplay = () => {
			if (interval) clearInterval(interval);
			interval = setInterval(() => {
				const nextIndex = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
				api.scrollTo(nextIndex);
			}, 700);
		};

		startAutoplay(); //
		api.on("reInit", startAutoplay); // fallback if Embla reinitialises

		return () => {
			if (interval) clearInterval(interval);
			api.off("reInit", startAutoplay);
		};
	}, [api, isHovered, isPaused]);

	const scrollToPrevious = () => {
		api?.scrollPrev();
	};

	const scrollToNext = () => {
		api?.scrollNext();
	};

	const scrollToSlide = (index: number) => {
		api?.scrollTo(index);
	};

	return (
		<section id="testimonials" ref={ref} role="region" aria-label="Testimonial Carousel" className="scroll-mt-20 pt-20 pb-10 bg-gradient-to-br from-blue-50 to-purple-50 relative">
			<div className="site-container">
				<motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full mb-6">
						<span className="text-sm font-semibold text-pink-700 tracking-wider uppercase">Testimonials</span>
					</div>
					<h2 id="testimonial-heading" className="text-slate-800 mb-6">
						Trusted by Educational Professionals
					</h2>
					<p className="section-subtitle max-w-4xl mx-auto">Hear directly from teachers, SEN coordinators, and head teachers about their transformative experiences with Duo Flip</p>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					<Carousel
						setApi={setApi}
						className="w-full"
						opts={{
							align: "center",
							loop: true,
							skipSnaps: false,
							dragFree: false,
						}}
					>
						<CarouselContent className="-ml-2 md:-ml-4 py-4">
							{testimonials.map((testimonial, index) => (
								<CarouselItem key={index} className="pl-2 md:pl-4 py-2 basis-full md:basis-1/2 lg:basis-1/3">
									<div className="bg-white rounded-xl p-6 h-full relative">
										<div className="flex items-center mb-4">
											<img src={testimonial.image} alt={`${testimonial.name} profile`} className="w-12 h-12 rounded-full mr-4 object-cover ring-2 ring-slate-100" />
											<div>
												<h4 className="font-semibold text-slate-800 text-sm">{testimonial.name}</h4>
												<p className="text-xs text-slate-500">{testimonial.role}</p>
											</div>
										</div>
										<p className="text-slate-600 mb-4 text-sm leading-relaxed">“{testimonial.quote}”</p>{" "}
										<div className="flex text-amber-400">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className="w-4 h-4 fill-current" />
											))}
										</div>
										<Quote className={`absolute top-4 right-4 w-6 h-6 transition-all duration-300 ${index === current ? "text-pink-500" : "text-slate-200"}`} />
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>

					{/* Controls and Indicators */}
					<div className="flex items-center justify-center gap-4 mt-8">
						{/* Previous Button */}
						<button onClick={scrollToPrevious} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-200" aria-label="Previous slide">
							<ChevronLeft className="w-4 h-4" />
						</button>

						{/* Indicators */}
						<div className="flex space-x-2">
							{Array.from({ length: slideCount }, (_, index) => (
								<button key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? "bg-pink-500 scale-125" : "bg-slate-300 hover:bg-slate-400"}`} onClick={() => scrollToSlide(index)} aria-label={`Go to slide ${index + 1}`} />
							))}
						</div>

						{/* Next Button */}
						<button onClick={scrollToNext} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-200" aria-label="Next slide">
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
