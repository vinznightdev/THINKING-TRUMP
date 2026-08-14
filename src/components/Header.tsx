import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, BrainCircuit, ExternalLink } from "lucide-react";
import { NavItem } from "../types";
import { playPopSound, playPumpSound } from "../utils/audio";

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Contemplation" },
  { id: "mind", label: "Brain Cortex" },
  { id: "chart", label: "Live Chart" },
  { id: "tokenomics", label: "Trumpnomics" },
  { id: "how-to-buy", label: "How To Buy" }
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section on scroll
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playPopSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3"
          : "bg-transparent py-5"
      }`}
      id="main-nav-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Branding */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => scrollToSection("home")}
          onMouseEnter={playPopSound}
          id="nav-branding"
        >
          <div className="relative">
            <BrainCircuit className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-[360deg] group-hover:text-amber-400" />
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="font-mono font-black tracking-wider text-sm sm:text-base text-white">
              THINKING TRUMP
            </span>
            <p className="text-[8px] font-sans text-zinc-500 uppercase tracking-widest leading-none">
              The Official Contemplation
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-full border border-zinc-800/60" id="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={playPopSound}
                className={`relative px-4 py-2 text-xs font-mono font-medium rounded-full transition-colors duration-300 ${
                  isActive ? "text-black font-extrabold" : "text-zinc-400 hover:text-white"
                }`}
                id={`nav-item-${item.id}`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick External Links (Socials/DEX) */}
        <div className="hidden md:flex items-center gap-3" id="nav-cta-group">
          <a
            href="https://dexscreener.com"
            target="_blank"
            referrerPolicy="no-referrer"
            onMouseEnter={playPumpSound}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 transition-all active:scale-95 shadow-lg shadow-amber-400/10"
            id="buy-hmmmm-btn"
          >
            BUY $HMMMM <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://dexscreener.com"
            target="_blank"
            referrerPolicy="no-referrer"
            onClick={playPumpSound}
            className="px-3 py-1.5 rounded-full bg-amber-400 text-black text-[10px] font-mono font-bold hover:bg-amber-300"
            id="buy-hmmmm-mobile"
          >
            BUY
          </a>
          <button
            onClick={() => {
              playPopSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="text-white hover:text-amber-400 transition-colors p-1"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-850 px-6 py-4"
            id="mobile-dropdown-container"
          >
            <div className="flex flex-col gap-3 py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-mono text-sm py-2 px-3 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-zinc-900 text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-zinc-900 pt-3 flex flex-col gap-2">
                <a
                  href="https://dexscreener.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  onClick={playPumpSound}
                  className="flex items-center justify-center gap-1 w-full py-2.5 rounded-lg bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 text-center"
                >
                  BUY $HMMMM <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
