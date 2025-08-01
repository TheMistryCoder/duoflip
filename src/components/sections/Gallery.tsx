"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Sparkles } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/Carousel";
// import Gallery from "@/components/sections/Gallery";

interface GalleryImage {
	src: string;
	alt: string;
	caption: string;
	category: string;
	featured?: boolean;
}

interface GalleryProps {
	images?: GalleryImage[];
}

// Modal Image Carousel Component
interface ModalImageCarouselProps {
	images: GalleryImage[];
	selectedImage: GalleryImage;
	onImageChange: (image: GalleryImage) => void;
}

function ModalImageCarousel({ images, selectedImage, onImageChange }: ModalImageCarouselProps) {
	const [modalApi, setModalApi] = useState<CarouselApi>();
	const [modalCurrent, setModalCurrent] = useState(0);
	const [hasInitialized, setHasInitialized] = useState(false);

	const initialIndex = images.findIndex((img) => img.src === selectedImage.src);

	useEffect(() => {
		if (!modalApi) return;

		if (!hasInitialized) {
			modalApi.scrollTo(initialIndex, true);
			setModalCurrent(initialIndex);
			setHasInitialized(true);
		}

		const handleSelect = () => {
			const current = modalApi.selectedScrollSnap();
			setModalCurrent(current);
			onImageChange(images[current]);
		};

		modalApi.on("select", handleSelect);

		return () => {
			modalApi.off("select", handleSelect);
		};
	}, [modalApi, initialIndex, images, onImageChange, hasInitialized]);

	useEffect(() => {
		if (!modalApi || !hasInitialized) return;

		const newIndex = images.findIndex((img) => img.src === selectedImage.src);
		if (newIndex !== modalCurrent && newIndex !== -1) {
			modalApi.scrollTo(newIndex);
		}
	}, [selectedImage, modalApi, images, modalCurrent, hasInitialized]);

	return (
		<Carousel
			setApi={setModalApi}
			className="w-full h-full"
			opts={{
				align: "center",
				loop: true,
				skipSnaps: false,
				dragFree: false,
				duration: 20,
			}}
		>
			<CarouselContent className="h-full">
				{images.map((image, index) => (
					<CarouselItem key={index} className="basis-full">
						<div className="flex items-center justify-center h-full min-h-[400px] max-h-[70vh]">
							<img src={image.src} alt={image.alt} className="w-full h-auto max-h-[70vh] object-contain transition-none" loading={Math.abs(index - initialIndex) <= 1 ? "eager" : "lazy"} />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

const defaultImages: GalleryImage[] = [
	{ src: "/gallery/Demo-Room-1536x1152.jpg", alt: "Interactive mathematics projection on classroom floor with children engaging", caption: "Interactive Mathematics Learning", category: "Primary Education", featured: true },
	{ src: "/gallery/SensoryRoomOnthank2-1920w.jpg", alt: "Student with special educational needs using interactive floor projection", caption: "SEN Learning Environment", category: "Special Needs", featured: true },
	{ src: "/gallery/Demo-Room-3-1536x918.jpg", alt: "Early years students during story time with interactive wall projection", caption: "EYFS Story Time", category: "Early Years" },
	{ src: "/gallery/EAC-NETHER-ROBERTLAND-4.jpg", alt: "Children collaborating on interactive learning activities", caption: "Collaborative Learning", category: "Primary Education" },
	{ src: "/gallery/Nether-Robertland-EAC-1-edited-768x578.jpg", alt: "Interactive classroom technology demonstration", caption: "Technology Integration", category: "Classroom Tech" },
	{ src: "/gallery/Photo-6-edited-768x1024.jpg", alt: "Students using interactive projector for group activities", caption: "Group Activities", category: "Collaborative" },
	{ src: "/gallery/Demo-Room-7-1536x1024.jpg", alt: "Interactive floor projection in modern classroom setting", caption: "Modern Classroom Setup", category: "Classroom Tech" },
	{ src: "/gallery/Epson-Duo-Flip-in-EIS-Demo-Suite-2-at-2021-01-2-1-scaled.jpg", alt: "Epson Duo Flip demonstration setup", caption: "Demo Suite Setup", category: "Equipment" },
];

export default function Gallery({ images = defaultImages }: GalleryProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [slideCount, setSlideCount] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

	const getImagesPerSlide = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth < 768) return 1;
			if (window.innerWidth < 1024) return 2;
		}
		return 4;
	};

	const [imagesPerSlide, setImagesPerSlide] = useState(getImagesPerSlide());

	const groupedImages = [];
	for (let i = 0; i < images.length; i += imagesPerSlide) {
		groupedImages.push(images.slice(i, i + imagesPerSlide));
	}

	const openModal = (image: GalleryImage) => {
		setSelectedImage(image);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedImage(null);
		document.body.style.overflow = "unset";
	};

	const nextImage = () => {
		if (!selectedImage) return;
		const currentIndex = images.findIndex((img) => img.src === selectedImage.src);
		const nextIndex = (currentIndex + 1) % images.length;
		setSelectedImage(images[nextIndex]);
	};

	const prevImage = () => {
		if (!selectedImage) return;
		const currentIndex = images.findIndex((img) => img.src === selectedImage.src);
		const prevIndex = (currentIndex - 1 + images.length) % images.length;
		setSelectedImage(images[prevIndex]);
	};

	const scrollToPrevious = () => api?.scrollPrev();
	const scrollToNext = () => api?.scrollNext();
	const scrollToSlide = (index: number) => api?.scrollTo(index);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!selectedImage) return;
			if (e.key === "Escape") closeModal();
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
		},
		[selectedImage, closeModal, nextImage, prevImage]
	);

	const handleResize = useCallback(() => {
		const newImagesPerSlide = getImagesPerSlide();
		if (newImagesPerSlide !== imagesPerSlide) {
			setImagesPerSlide(newImagesPerSlide);
		}
	}, [imagesPerSlide]);

	useEffect(() => {
		if (!api) return;

		const updateSlideCount = () => {
			const slides = api.scrollSnapList();
			setSlideCount(slides.length);
			setCurrent(api.selectedScrollSnap());
		};

		const handleUserInteraction = () => {
			setIsPaused(true);
			if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
			pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000);
		};

		updateSlideCount();
		api.on("select", () => setCurrent(api.selectedScrollSnap()));
		api.on("pointerDown", handleUserInteraction);
		api.on("scroll", handleUserInteraction);

		return () => {
			api.off("select", updateSlideCount);
			api.off("pointerDown", handleUserInteraction);
			api.off("scroll", handleUserInteraction);
		};
	}, [api]);

	useEffect(() => {
		if (!api || isHovered || isPaused || slideCount <= 1) return;

		let interval: NodeJS.Timeout | null = null;

		const startAutoplay = () => {
			if (interval) clearInterval(interval);
			interval = setInterval(() => {
				const nextIndex = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
				api.scrollTo(nextIndex, { duration: 0.1 } as any);
			}, 4000);
		};

		startAutoplay();
		api.on("reInit", startAutoplay);

		return () => {
			if (interval) clearInterval(interval);
			api.off("reInit", startAutoplay);
		};
	}, [api, isHovered, isPaused, slideCount]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("resize", handleResize);
		};
	}, [handleKeyDown, handleResize]);

	return (
		<section id="gallery" className="scroll-mt-20 py-20 bg-gradient-to-br from-blue-50 to-purple-50" ref={ref}>
			<div className="site-container">
				{/* Header */}
				<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<motion.div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 via-sky-100 to-emerald-100 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-white/50" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
						<Sparkles className="w-4 h-4 text-teal-600 mr-2" />
						<span className="text-sm font-semibold text-teal-700 tracking-wider uppercase">Gallery</span>
					</motion.div>

					<motion.h2 className="text-slate-800 mb-8" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.2 }}>
						See Duo Flip in Action Across UK Schools
					</motion.h2>

					<motion.p className="section-subtitle max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.4 }}>
						Explore real classroom environments where Duo Flip is making learning more interactive, engaging, and accessible for students of all abilities
					</motion.p>
				</motion.div>

				{/* Swipeable Gallery Carousel */}
				<motion.div className="max-w-6xl mx-auto px-4" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.6 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					<Carousel
						key={imagesPerSlide} // Re-initialize on responsive change
						setApi={setApi}
						className="w-full"
						opts={{
							align: "center",
							loop: true,
							skipSnaps: false,
							dragFree: false,
						}}
					>
						<CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
							{groupedImages.map((slideImages, slideIndex) => (
								<CarouselItem key={slideIndex} className="pl-4 md:pl-6 lg:pl-8 basis-full">
									<div
										className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8"
										style={{
											gridTemplateColumns: `repeat(${imagesPerSlide}, 1fr)`,
										}}
									>
										{slideImages.map((image, imageIndex) => (
											<motion.div
												key={`${slideIndex}-${imageIndex}`}
												className="group relative aspect-square cursor-pointer md:cursor-pointer"
												onClick={() => {
													if (typeof window !== "undefined" && window.innerWidth >= 768) {
														openModal(image);
													}
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												whileHover={typeof window !== "undefined" && window.innerWidth >= 1024 ? { scale: 1.03, y: -4 } : {}}
												transition={{
													duration: 0.6,
													delay: imageIndex * 0.1,
												}}
											>
												{/* Enhanced Card Container */}
												<div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg lg:group-hover:shadow-xl transition-all duration-300 bg-white border border-slate-100">
													{/* Image */}
													<img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />

													{/* Overlay Gradient */}
													<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>

													{/* Enhanced Expand Icon - Desktop only */}
													<div className="hidden lg:block absolute top-3 right-3 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-y-2 lg:group-hover:translate-y-0">
														<div className="w-8 h-8 bg-white/95 backdrop-blur rounded-lg flex items-center justify-center shadow-lg">
															<Expand className="w-4 h-4 text-slate-700" />
														</div>
													</div>

													{/* Always visible expand icon for tablet */}
													<div className="hidden md:block lg:hidden absolute top-3 right-3">
														<div className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md">
															<Expand className="w-4 h-4 text-slate-600" />
														</div>
													</div>

													{/* Category Badge */}
													<div className="absolute bottom-3 left-3 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-y-2 lg:group-hover:translate-y-0">
														<span className="px-2 py-1 bg-white/95 backdrop-blur text-xs font-medium text-slate-700 rounded-md shadow-sm">{image.category}</span>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>

					{/* Navigation Controls */}
					{slideCount > 1 && (
						<div className="flex items-center justify-center gap-4 mb-12 mt-8">
							<button onClick={scrollToPrevious} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-200" aria-label="Previous page">
								<ChevronLeft className="w-4 h-4" />
							</button>

							<div className="flex space-x-2">
								{Array.from({ length: slideCount }, (_, index) => (
									<button key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? "bg-sky-500 scale-125" : "bg-slate-300 hover:bg-slate-400"}`} onClick={() => scrollToSlide(index)} aria-label={`Go to slide ${index + 1}`} />
								))}
							</div>

							<button onClick={scrollToNext} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-200" aria-label="Next page">
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					)}
				</motion.div>

				{/* CTA Section */}
				<motion.div className="mt-20" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.8 }}>
					<div className="bg-white rounded-2xl shadow-xl p-8  max-w-6xl mx-auto">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
							<div className="lg:text-left">
								<motion.h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.6, delay: 1.0 }}>
									Join <span className="bg-gradient-to-r from-sky-500 via-emerald-400 to-purple-400 bg-clip-text text-transparent">Hundreds of Schools</span> Across the UK
								</motion.h3>

								<motion.p className="text-lg text-slate-600" initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.6, delay: 1.1 }}>
									Experience the transformative power of interactive learning in your classroom
								</motion.p>
							</div>

							<motion.div className="lg:flex-shrink-0" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 1.2 }}>
								<motion.button
									className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sky-500 to-emerald-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg group"
									whileHover={{
										scale: 1.06,
										transition: { duration: 0.0, ease: "easeOut" },
									}}
									whileTap={{
										scale: 0.98,
										transition: { duration: 0.1 },
									}}
									animate={{
										scale: [1, 1.15, 1],
									}}
									transition={{
										duration: 1.2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									onClick={() => {
										const element = document.getElementById("contact");
										if (element) {
											element.scrollIntoView({ behavior: "smooth" });
										}
									}}
								>
									Get in Touch
								</motion.button>
							</motion.div>
						</div>
					</div>
				</motion.div>

				{/* Modal */}
				<AnimatePresence>
					{selectedImage && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
								{/* Close Button */}
								<button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-sm">
									<X className="w-5 h-5 text-slate-600" />
								</button>

								{/* Image Carousel */}
								<div
									className="relative bg-slate-50 flex items-center justify-center min-h-[400px]"
									style={{
										transform: "translateZ(0)",
										willChange: "transform",
									}}
								>
									<ModalImageCarousel images={images} selectedImage={selectedImage} onImageChange={setSelectedImage} />
								</div>

								{/* Info Panel */}
								<div className="p-6 bg-white border-t border-slate-100">
									<div className="flex items-center justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-3">
												<span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">{selectedImage.category}</span>
											</div>
											<h3 className="text-xl font-bold text-slate-800 mb-2">{selectedImage.caption}</h3>
											<p className="text-slate-600 leading-relaxed">{selectedImage.alt}</p>
										</div>

										{/* Fixed Navigation Buttons */}
										<div className="flex items-center gap-3 flex-shrink-0">
											<button onClick={prevImage} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all duration-200">
												<ChevronLeft className="w-5 h-5 text-slate-600" />
											</button>

											<span className="text-sm text-slate-500 px-2 font-medium">
												{images.findIndex((img) => img.src === selectedImage.src) + 1} / {images.length}
											</span>

											<button onClick={nextImage} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all duration-200">
												<ChevronRight className="w-5 h-5 text-slate-600" />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
