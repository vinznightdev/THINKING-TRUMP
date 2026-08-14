import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { BrainCircuit, Sparkles, Copy, Check, MessageSquare, Flame } from "lucide-react";
import { TrumpThoughtResponse } from "../types";
import { playThinkChime, playPopSound, playRugSound } from "../utils/audio";

// Suggested topics for users to click
const SUGGESTED_TOPICS = [
  "McDonald's Fries",
  "10,000% Solana Pump",
  "My Empty Wallet",
  "Diamond Hands",
  "The Next 100x",
  "Elon Musk",
  "Federal Reserve",
  "Fake News"
];

const LOADING_STEPS = [
  "Firing up dormant brain synapses...",
  "Constructing monumental green candles in Trump's memory bank...",
  "Routing past fake news neural networks...",
  "Bypassing conventional logic gates...",
  "Securing massive leverage on Solana blockchain...",
  "Unleashing total unhinged clarity..."
];

export default function MindReader() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(LOADING_STEPS[0]);
  const [thoughtResult, setThoughtResult] = useState<TrumpThoughtResponse | null>(null);
  const [totalThoughts, setTotalThoughts] = useState(25910243);
  const [copied, setCopied] = useState(false);
  
  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-increment the thought counter over time for hilarity
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalThoughts((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Cycle loading messages when loading
  useEffect(() => {
    if (!loading) return;
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % LOADING_STEPS.length;
      setLoadingStep(LOADING_STEPS[stepIndex]);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const triggerThought = async (selectedTopic?: string) => {
    if (loading) return;
    
    // Play the premium brain chimes synthesizer
    playThinkChime();
    
    setLoading(true);
    setThoughtResult(null);
    const activeTopic = selectedTopic !== undefined ? selectedTopic : topic;

    // Play a rug warning sound for funny triggers like empty wallet
    if (activeTopic && (activeTopic.toLowerCase().includes("empty") || activeTopic.toLowerCase().includes("news") || activeTopic.toLowerCase().includes("reserve"))) {
      setTimeout(() => playRugSound(), 500);
    }

    try {
      const response = await fetch("/api/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: activeTopic || undefined }),
      });
      const data: TrumpThoughtResponse = await response.json();
      setThoughtResult(data);
      setTotalThoughts((prev) => prev + 1);
    } catch (err) {
      console.error("Error connecting to thought API:", err);
      // Fallback
      setThoughtResult({
        thought: "Solana is tremendous. The hugest! Some people sold early, sad! But we are holding for the 1000x.",
        source: "local-fallback"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!thoughtResult) return;
    playPopSound();
    navigator.clipboard.writeText(`"${thoughtResult.thought}" — $HMMMM Thinking Trump`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="mind" className="py-24 relative overflow-hidden bg-zinc-950 border-t border-zinc-900" style={{ contentVisibility: "auto" }}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono mb-4"
          >
            <Flame className="w-3.5 h-3.5" /> THE NEURAL NETWORK OF COGNITION
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase tracking-tight">
            READ TRUMP'S BRAIN
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-3 font-sans">
            Submit any concept, keyword, or asset. Watch as the official brainwaves of Donald Trump analyze it on the decentralized timeline.
          </p>
          <div className="mt-4 font-mono text-xs text-zinc-500">
            Total Synaptic Computations: <span className="text-amber-400 font-bold">{totalThoughts.toLocaleString()}</span>
          </div>
        </div>

        {/* Core Mind Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Holographic Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-72 h-72 md:w-80 md:h-80 cursor-grab active:cursor-grabbing preserve-3d"
              id="brain-portrait-3d"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-4 relative flex flex-col items-center justify-center group shadow-2xl overflow-hidden"
              >
                {/* Thinking Rings Halo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-dashed border-amber-400/10 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="w-48 h-48 border border-dashed border-zinc-700/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                </div>

                {/* Trump Logo Image */}
                <div className="relative z-10 w-44 h-44 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-xl shadow-amber-400/10">
                  <img
                    src="https://sf4service.site/raw/img_rj7oa8eqs.jpg"
                    alt="Thinking Trump Logo"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Neural Overlay lines when loading */}
                  {loading && (
                    <div className="absolute inset-0 bg-amber-400/10 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-amber-400 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="mt-4 z-10 text-center">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">STATUS</span>
                  <div className="flex items-center gap-2 justify-center mt-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-amber-400 animate-ping' : 'bg-green-500'}`} />
                    <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      {loading ? "THINKING HARD..." : "CONTEMPLATING"}
                    </span>
                  </div>
                </div>

                {/* Cyberpunk corner brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-zinc-700 group-hover:border-amber-400 transition-colors" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-zinc-700 group-hover:border-amber-400 transition-colors" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-zinc-700 group-hover:border-amber-400 transition-colors" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-zinc-700 group-hover:border-amber-400 transition-colors" />
              </motion.div>
            </div>
          </div>

          {/* Right: Controller & Thought Reader console */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Input Console */}
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md" id="brain-input-terminal">
              <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" /> Cognitive Synapse Input
              </h3>

              <div className="relative flex items-center mb-5">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ask his brain to evaluate: e.g. Dogecoin, McDonald's..."
                  className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 font-mono outline-none transition-all pr-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") triggerThought();
                  }}
                  id="custom-thought-input"
                />
                <button
                  onClick={() => triggerThought()}
                  disabled={loading}
                  className="absolute right-2 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 disabled:opacity-45 transition-all"
                  aria-label="Send query to Trump's Brain"
                  id="submit-query-btn"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-zinc-500 block mb-2 uppercase tracking-widest">Or choose a preset stimulus:</span>
                <div className="flex flex-wrap gap-1.5" id="suggested-chips-container">
                  {SUGGESTED_TOPICS.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTopic(t);
                        triggerThought(t);
                      }}
                      onMouseEnter={playPopSound}
                      className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/40 text-[11px] text-zinc-400 font-mono hover:text-white transition-all active:scale-95 whitespace-nowrap"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big CTA */}
              <button
                onClick={() => triggerThought()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black font-mono font-extrabold text-sm hover:bg-amber-400 transition-all active:scale-[0.98] disabled:opacity-40 select-none shadow-xl cursor-pointer"
                id="pulse-synapse-btn"
              >
                <BrainCircuit className="w-4 h-4 animate-pulse" />
                {loading ? "CATALYZING NEURONS..." : "PUMP HIS SYNAPSE"}
              </button>
            </div>

            {/* Thought Output Terminal */}
            <div className="relative min-h-[140px] bg-black border border-zinc-800 rounded-2xl overflow-hidden p-6 flex flex-col justify-between" id="thought-output-terminal">
              
              {/* Terminal Head */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-mono text-zinc-500 ml-2 uppercase tracking-widest">
                    {loading ? "TELEMETRY.RUN" : "OUTPUT_THOUGHT.EXE"}
                  </span>
                </div>
                {thoughtResult && (
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                    Source: <span className="text-amber-400 font-bold uppercase">{thoughtResult.source}</span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="flex-1 flex items-center justify-center py-4">
                {loading ? (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-amber-400 mb-2" />
                    <p className="text-xs font-mono text-amber-400/80 italic animate-pulse">
                      {loadingStep}
                    </p>
                  </div>
                ) : thoughtResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                  >
                    <p className="font-mono text-sm md:text-base text-zinc-100 leading-relaxed italic text-left">
                      "{thoughtResult.thought}"
                    </p>
                  </motion.div>
                ) : (
                  <p className="font-mono text-xs text-zinc-600 text-center uppercase tracking-wider">
                    SYSTEM IDLE. ACTIVATE SYNAPSE TO LOG BRAINWAVES.
                  </p>
                )}
              </div>

              {/* Terminal Foot / Toolbar */}
              {thoughtResult && !loading && (
                <div className="flex items-center justify-between border-t border-zinc-900 pt-3 mt-3">
                  <span className="text-[10px] font-mono text-zinc-600 italic">
                    Contemplated on Solana. Keep holding.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-[11px] font-mono transition-all active:scale-95 cursor-pointer"
                      id="copy-thought-btn"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Thought
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
