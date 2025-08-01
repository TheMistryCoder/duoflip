import Image from "next/image";
<Image src="/duo-flip-logo.png" alt="Duo Flip Logo" width={0} height={0} sizes="100vw" className="h-12 w-auto object-contain align-middle block" />;

export default function Footer() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<footer className="bg-slate-900 text-blue-100 py-12">
			<div className="site-container">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div className="col-span-2">
						<div className="flex items-center space-x-3 mb-4">
							<Image src="/duo-flip-logo.png" alt="Duo Flip Logo" width={130} height={48} className="h-12 w-auto object-contain align-middle block" />
						</div>
						<p className="text-blue-200 leading-relaxed max-w-md">Revolutionary interactive learning system designed for Early Years, Primary classrooms, and SEN environments. Transform any space into an engaging educational experience.</p>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<button onClick={() => scrollToSection("how-it-works")} className="text-blue-200 hover:text-white transition-colors text-left">
									How It Works
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection("benefits")} className="text-blue-200 hover:text-white transition-colors text-left">
									Benefits
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection("solutions")} className="text-blue-200 hover:text-white transition-colors text-left">
									Solutions
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection("demo")} className="text-blue-200 hover:text-white transition-colors text-left">
									Demo
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection("gallery")} className="text-blue-200 hover:text-white transition-colors text-left">
									Gallery
								</button>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<a href="tel:08450953600" className="text-blue-200 hover:text-white transition-colors">
									0845 095 3600
								</a>
							</li>
							<li>
								<a href="mailto:info@efficient-is.co.uk" className="text-blue-200 hover:text-white transition-colors">
									Contact Us
								</a>
							</li>
							<li>
								<button onClick={() => scrollToSection("contact")} className="text-blue-200 hover:text-white transition-colors text-left">
									Technical Support
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection("contact")} className="text-blue-200 hover:text-white transition-colors text-left">
									Two Week Trial
								</button>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-blue-300 text-sm">© 2025 Efficient Infrastructure Solutions. All rights reserved.</p>
					<div className="flex items-center space-x-6 mt-4 md:mt-0">
						<a href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
							Privacy Policy
						</a>
						<a href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
							Terms of Service
						</a>
						<a href="https://efficient-is.co.uk" className="text-blue-300 hover:text-white transition-colors text-sm">
							efficient-is.co.uk
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
