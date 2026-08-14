import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Brain, ArrowDown, Sparkles, Flame, Check, HelpCircle, Activity } from "lucide-react";

import Header from "./components/Header";
import MemeParticles from "./components/MemeParticles";
import MindReader from "./components/MindReader";
import DexChart from "./components/DexChart";
import Tokenomics from "./components/Tokenomics";
import HowToBuy from "./components/HowToBuy";
import Footer from "./components/Footer";
import { playPopSound, playPumpSound } from "./utils/audio";

// A list of random funny ticker warnings to display on the timeline alert bar
const TIMELINE_WARNINGS = [
  "ALERT: TRUMP HAS BEEN CONTEMPLATING THE MCRIB FOR 45 SECONDS. TIMELINE INSTABILITY LEVEL: SEVERE.",
  "NOTICE: COVFEFE DECRYPTION SYNAPSE FULLY ACTIVATED ON ROBINHOOD CHAIN BLOCK 291,093,425.",
  "WARNING: CHROME CASTING TRUMP'S THOUGHTS DIRECTLY TO VLAD'S TELEGRAM NODE.",
  "MARKET DATA: $HMMMM DIAMOND HANDS RATIO ON ROBINHOOD IS HIGHER THAN MOUNT EVEREST. UNBELIEVABLE!",
  "ALERT: DECENTRALIZED LUNCH CONTEMPLATION UNDERWAY. BURGER RATIO IS HUGE. TRULY HUGE."
];

export default function App() {
  const [warningIndex, setWarningIndex] = useState(0);
  const [copiedCA, setCopiedCA] = useState(false);
  const contractAddress = "0x000000000000000000000000";

  // Cycle through ticker warnings
  useEffect(() => {
    const interval = setInterval(() => {
      setWarningIndex((prev) => (prev + 1) % TIMELINE_WARNINGS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCA = () => {
    playPopSound();
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const scrollToSection = (id: string) => {
    playPopSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#060607] text-white font-sans overflow-x-hidden selection:bg-amber-400 selection:text-black relative">
      
      {/* Immersive Brand Banner Backdrop & Cyber Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Layer 1: Ambient Banner Backplate with Heavy Blur */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-center scale-110 blur-[80px] opacity-[0.16]"
          style={{ backgroundImage: `url('https://sf4service.site/raw/img_bon5proir.jpg')` }}
        />
        {/* Layer 2: Vector Cyber Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]"
        />
        {/* Layer 3: Warm Neural Glow Nodes */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px] animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      {/* Background Particles Layer */}
      <MemeParticles />

      {/* Responsive Header Menu */}
      <Header />

      {/* Top Floating Ticker / Alert Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-amber-400 text-black py-2 px-6 z-40 overflow-hidden border-t border-amber-500/30 shadow-lg select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono font-black tracking-wide">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-black animate-ping" />
            <span className="uppercase font-extrabold text-[10px] bg-black text-amber-400 px-1.5 py-0.5 rounded mr-2">TIMELINE FEED</span>
            <span className="truncate">{TIMELINE_WARNINGS[warningIndex]}</span>
          </div>
          <button 
            onClick={() => scrollToSection("mind")}
            className="hidden md:flex items-center gap-1.5 hover:underline text-[10px] uppercase font-black cursor-pointer"
          >
            ACTIVATE COGNITION <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Hero / Contemplation Section */}
      <section 
        id="home" 
        className="pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden z-10"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Visual Logo Frame with Hover Physics */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            whileHover={{ scale: 1.03 }}
            onMouseEnter={playPopSound}
            className="relative cursor-pointer mb-8"
            onClick={() => scrollToSection("mind")}
            id="hero-logo-frame"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border border-zinc-800 p-2.5 bg-zinc-950/40 backdrop-blur-md flex items-center justify-center relative overflow-visible shadow-2xl group">
              {/* Spinning Ambient Halo */}
              <div className="absolute inset-0 border border-dashed border-zinc-700/40 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-1 border border-amber-400/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-full h-full rounded-full overflow-hidden border border-zinc-700 shadow-lg relative">
                <img
                  src="https://sf4service.site/raw/img_rj7oa8eqs.jpg"
                  alt="Thinking Trump Logo Portrait"
                  className="w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hover Thought Bubble Meme (Quirky animation) */}
              <div className="absolute -top-12 -right-16 bg-white text-black text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border border-zinc-200 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 rotate-12 shadow-lg whitespace-nowrap pointer-events-none">
                HMMMM... 100x? 💭
              </div>
            </div>
          </motion.div>

          {/* Headline Typography */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase font-bold">
              THE ULTIMATE TRUMP CONTEMPLATION SITE
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tighter text-white uppercase leading-none">
              THINKING TRUMP
            </h1>
          </motion.div>

          {/* Core Copy requested by User */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 mb-8 font-sans"
            id="hero-copy-block"
          >
            <p>
              Thinking Trump is just Trump… thinking.
            </p>
            <p className="text-zinc-300 font-medium">
              Nobody knows what he’s thinking about. Maybe the next pump. Maybe the next 100x. Maybe absolutely nothing. But one thing is certain: the longer he thinks, the more unhinged the timeline gets.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-10"
            id="hero-ctas"
          >
            <button
              onClick={() => {
                playPumpSound();
                scrollToSection("mind");
              }}
              onMouseEnter={playPopSound}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-mono font-black text-sm hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-white/5"
            >
              READ HIS BRAIN
            </button>
            <button
              onClick={() => {
                playPumpSound();
                scrollToSection("chart");
              }}
              onMouseEnter={playPopSound}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono font-bold text-sm border border-zinc-800 hover:border-zinc-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              VIEW LIVE CHART
            </button>
          </motion.div>

          {/* CA Banner Copier */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 text-xs font-mono max-w-full"
            id="ca-copier"
          >
            <span className="text-zinc-500 uppercase tracking-widest font-black text-[9px] mr-2">CONTRACT</span>
            <span className="text-zinc-300 font-bold truncate max-w-[180px] sm:max-w-xs">{contractAddress}</span>
            <button
              onClick={handleCopyCA}
              className="ml-2 px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-400 text-[10px] font-bold active:scale-95 transition-all cursor-pointer"
            >
              {copiedCA ? <Check className="w-3.5 h-3.5 text-green-400" /> : "COPY"}
            </button>
          </motion.div>

        </div>
      </section>

      {/* Prominent High-Quality Banner Block */}
      <section className="py-12 px-6 bg-black relative overflow-hidden z-10" style={{ contentVisibility: "auto" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl group"
            id="branding-banner-container"
          >
            <div className="aspect-[21/9] sm:aspect-[24/10] md:aspect-[3/1] w-full relative overflow-hidden">
              <img
                src="https://sf4service.site/raw/img_bon5proir.jpg"
                alt="Thinking Trump Official Banner"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 brightness-[0.7] group-hover:brightness-[0.8]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              {/* Overlay gradient for premium integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              
              {/* Creative Floating Subtitle Badge on Banner */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400 text-black text-[9px] font-mono font-black uppercase tracking-widest mb-2">
                    OFFICIAL BRAND BANNER
                  </span>
                  <h3 className="text-lg md:text-2xl font-mono font-black uppercase tracking-tight text-white leading-none">
                    DECENTRALIZED MEME CONTINUUM
                  </h3>
                </div>
                <button
                  onClick={() => {
                    playPumpSound();
                    scrollToSection("mind");
                  }}
                  onMouseEnter={playPopSound}
                  className="self-start sm:self-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono font-bold backdrop-blur-sm transition-all flex items-center gap-2 border border-white/20 hover:border-white cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" /> INTERROGATE BRAIN
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Mind Reader (Gemini API integrated) */}
      <MindReader />

      {/* Live Dexscreener Candlestick Chart */}
      <DexChart />

      {/* Specified Tokenomics Spec sheet */}
      <Tokenomics />

      {/* Interactive How to Buy Protocol */}
      <HowToBuy />

      {/* Sticky footer with disclaimer */}
      <Footer />

    </div>
  );
}
