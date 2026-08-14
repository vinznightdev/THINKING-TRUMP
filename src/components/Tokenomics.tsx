import { Shield, Coins, Percent, Landmark } from "lucide-react";

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 bg-zinc-950 border-t border-zinc-900 relative" style={{ contentVisibility: "auto" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono rounded-full mb-4">
            <Coins className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> SECURE TRUMPNOMICS ARCHITECTURE
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase tracking-tight">
            TRUMPNOMICS SPECIFICATION
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-3 font-sans">
            A tokenomics structure so beautiful, so secure, that even the most corrupt fake news media cannot find any faults. Made exclusively for the Robinhood Chain!
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" id="tokenomics-cards-grid">
          
          {/* Card 1: Supply */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl backdrop-blur-sm relative group hover:border-amber-400 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">TOTAL SUPPLY</span>
            <span className="text-2xl font-mono font-black text-white">1,000,000,000</span>
            <p className="text-xs text-zinc-400 font-sans mt-3">
              One billion tokens minted directly on the **Robinhood Chain**. No mint authority, no extra inflation, pure absolute ceiling of diamond hands.
            </p>
          </div>

          {/* Card 2: Tax */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl backdrop-blur-sm relative group hover:border-amber-400 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5">
              <Percent className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">BUY & SELL TAX</span>
            <span className="text-2xl font-mono font-black text-white">0% TAX-FREE</span>
            <p className="text-xs text-zinc-400 font-sans mt-3">
              Thinking should be completely exempt from taxes. Trade back and forth without losing single fractions of your $HMMMM tokens. Very smart people agree!
            </p>
          </div>

          {/* Card 3: Contract */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl backdrop-blur-sm relative group hover:border-amber-400 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">LIQUIDITY STATUS</span>
            <span className="text-2xl font-mono font-black text-white">100% BURNED</span>
            <p className="text-xs text-zinc-400 font-sans mt-3">
              The LP tokens have been entirely sent to the burn wallet. Nobody can retrieve them. Absolutely rug-proof, safe for your generation on Robinhood Chain.
            </p>
          </div>

          {/* Card 4: Ownership */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl backdrop-blur-sm relative group hover:border-amber-400 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">OWNERSHIP</span>
            <span className="text-2xl font-mono font-black text-white">REVOKED</span>
            <p className="text-xs text-zinc-400 font-sans mt-3">
              The contract is fully decentralized and completely renounced. No developer or administrator can modify the mechanics.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
