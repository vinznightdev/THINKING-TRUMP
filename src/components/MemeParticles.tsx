import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FloatingMeme } from "../types";

const WORD_POOL = [
  "🤔 HMMMM...",
  "🚀 100x?",
  "☕ COVFEFE",
  "📈 HUGE CANDLE",
  "🦅 TREMENDOUS",
  "🎙️ BELIEVE ME",
  "🔥 PUMP IT",
  "📺 FAKE NEWS",
  "💎 DIAMOND HANDS",
  "⚡ SOLANA",
  "🍔 DOUBLE CHEESE",
  "👑 VERY SMART PEOPLE",
  "😭 SAD!",
  "🐋 WHALES INBOUND",
  "🧠 MASSIVE COGNITION",
  "🇺🇸 AMERICA PUMP"
];

export default function MemeParticles() {
  const [particles, setParticles] = useState<FloatingMeme[]>([]);

  useEffect(() => {
    // Generate simple particle positions that don't overload performance
    const generated: FloatingMeme[] = Array.from({ length: 18 }).map((_, i) => ({
      id: `p-${i}`,
      text: WORD_POOL[i % WORD_POOL.length],
      x: Math.random() * 88 + 4, // percentage
      y: Math.random() * 88 + 4, // percentage
      size: Math.random() * 16 + 11, // font size in px
      rotation: Math.random() * 40 - 20, // rotation angle
      delay: Math.random() * 3, // delay for start
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p, idx) => {
        // Render some particles as plain textured background text, and others as highlighted golden tags
        const isHighlighted = idx % 4 === 0;
        
        return (
          <motion.div
            key={p.id}
            className={`absolute font-mono font-black tracking-wide whitespace-nowrap transition-colors duration-300 ${
              isHighlighted 
                ? "bg-amber-400/5 hover:bg-amber-400/20 text-amber-400/25 border border-amber-400/15 rounded-full px-2 py-1 backdrop-blur-[1px]" 
                : "text-zinc-500/10 hover:text-zinc-400/20"
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              rotate: `${p.rotation}deg`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [p.rotation, p.rotation + 15, p.rotation],
            }}
            transition={{
              duration: 12 + Math.random() * 12,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          >
            {p.text}
          </motion.div>
        );
      })}
    </div>
  );
}

