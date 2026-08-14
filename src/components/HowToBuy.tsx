import React from "react";
import { motion } from "motion/react";
import { Wallet, Shuffle, ShoppingCart, HelpCircle, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { playPopSound, playPumpSound } from "../utils/audio";

interface BuyStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unhingedMeme: string;
}

const BUY_STEPS: BuyStep[] = [
  {
    number: "01",
    title: "Configure EVM Brain Wallet",
    description: "Install a secure Ethereum/EVM compatible wallet (MetaMask, Rabby, or Coinbase Wallet). Secure your private keys from the corrupt fake news media. Memorize your seed phrase or tattoo it under your hair.",
    icon: <Wallet className="w-6 h-6 text-amber-400" />,
    unhingedMeme: "🧠 COGNITION STATUS: 150 IQ SECURED"
  },
  {
    number: "02",
    title: "Load Gas Onto Robinhood Chain",
    description: "Bridge some raw ETH or USDC onto the ultra-fast Robinhood EVM network. Zero latency, beautiful green candles, and absolutely tremendous throughput. Trade with zero regrets and massive confidence.",
    icon: <Shuffle className="w-6 h-6 text-amber-400" />,
    unhingedMeme: "⛽ GAS STATUS: EXTREMELY CHEAP"
  },
  {
    number: "03",
    title: "Locate Robinhood Swap Node",
    description: "Connect your newly energized wallet to the Robinhood Swap or Uniswap V3 on Robinhood Chain. Insert the majestic contract address: 0x000000000000000000000000 with pride and perfect alignment.",
    icon: <HelpCircle className="w-6 h-6 text-amber-400" />,
    unhingedMeme: "🎯 COORDINATES: PERFECT MATCH"
  },
  {
    number: "04",
    title: "Swap & Let Him Think",
    description: "Set slippage to low (since tax is 0% - yes, zero taxes, absolutely gorgeous!). Click Swap, confirm with your touch-ID, and watch your portfolio ascend into the stratosphere. Relax as Trump contemplates your financial freedom.",
    icon: <ShoppingCart className="w-6 h-6 text-amber-400" />,
    unhingedMeme: "📈 BALANCE STATUS: INFINITE PUMP"
  }
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-24 bg-black border-t border-zinc-900 relative">
      {/* Visual cyber mesh pattern backing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.08),rgba(0,0,0,0))]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono rounded-full mb-4">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" /> FLAWLESS PROTOCOL INSTRUCTIONS
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase tracking-tight">
            HOW TO BUY $HMMMM
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 font-sans">
            Follow these simple, beautiful, and highly intelligent steps to acquire the native token of political contemplation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BUY_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.01 }}
              onMouseEnter={playPopSound}
              className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 hover:border-amber-400/50 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Corner Number Badge */}
              <div className="absolute top-4 right-6 text-5xl font-mono font-black text-zinc-900/40 select-none group-hover:text-amber-400/10 transition-colors">
                {step.number}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-amber-400 tracking-widest block uppercase font-bold">
                    STEP {step.number} OF {BUY_STEPS.length}
                  </span>
                  <h3 className="text-lg font-mono font-black text-white uppercase mt-0.5">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-6">
                {step.description}
              </p>

              {/* Meme Footer Alert Tag */}
              <div className="px-3.5 py-2 rounded-xl bg-zinc-900/50 border border-zinc-850 text-[10px] font-mono text-zinc-400 font-bold tracking-wide flex items-center justify-between">
                <span>{step.unhingedMeme}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Action Trigger Banner */}
        <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/5 border border-amber-400/25 rounded-3xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-mono font-black text-white uppercase tracking-tight mb-2">
            STILL HAVE BLOCKED COGNITION?
          </h3>
          <p className="text-xs text-zinc-300 font-sans max-w-lg mx-auto mb-6">
            Simply copy our contract address, open your trading app on the Robinhood Chain, and trade directly. No hidden protocols, no scams. Pure American contemplation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                playPumpSound();
                window.open("https://uniswap.org", "_blank");
              }}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs transition-all active:scale-95 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              LAUNCH SWAP TERMINAL
            </button>
            <span className="text-xs font-mono text-zinc-500">OR</span>
            <div className="flex items-center gap-2 bg-black border border-zinc-850 rounded-xl py-2 px-4 font-mono text-xs text-amber-400">
              <span className="text-zinc-500 text-[10px]">CA:</span>
              <span className="select-all">0x000000000000000000000000</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
