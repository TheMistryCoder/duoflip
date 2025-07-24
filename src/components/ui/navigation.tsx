import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import duoFlipLogo from "@/assets/duo-flip-logo.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = scrollBarWidth + "px";
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToContact = () => scrollToSection('contact');

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-sm shadow-md' 
        : 'bg-white/95 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="nav-container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <img
              src={duoFlipLogo}
              alt="Duo Flip Logo"
              className="h-12 w-auto object-contain align-middle"
              style={{ display: 'block' }}
            />
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('benefits')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Gallery
            </button>
            <Button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-pink-400 to-amber-400 text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Request Demo
            </Button>
          </div>
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="lg:hidden fixed top-0 right-0 z-50 flex flex-col bg-white h-screen overflow-y-auto w-11/12 max-w-xs sm:max-w-sm shadow-2xl"
            >
              <div className="flex items-center justify-end px-6 py-4 border-b border-slate-200">
                <button className="p-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-6 flex-1">
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  Home
                </button>
                <button
                  onClick={() => { scrollToSection('how-it-works'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  How It Works
                </button>
                <button
                  onClick={() => { scrollToSection('benefits'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  Benefits
                </button>
                <button
                  onClick={() => { scrollToSection('solutions'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  Solutions
                </button>
                <button
                  onClick={() => { scrollToSection('demo'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  Demo
                </button>
                <button
                  onClick={() => { scrollToSection('gallery'); setIsMobileMenuOpen(false); }}
                  className="text-slate-600 hover:text-sky-500 transition-colors text-left py-3 border-b border-slate-100"
                >
                  Gallery
                </button>
                <Button
                  onClick={() => { scrollToContact(); setIsMobileMenuOpen(false); }}
                  className="bg-gradient-to-r from-pink-400 to-amber-400 text-white w-full mt-8"
                >
                  Request Demo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
