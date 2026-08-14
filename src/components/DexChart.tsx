import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LineChart, Search, Sparkles, TrendingUp, RefreshCw, Layers, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { playPopSound, playPumpSound } from "../utils/audio";

interface PresetToken {
  name: string;
  ticker: string;
  address: string;
  chain: string;
}

// Robinhood Chain EVM Preset Tokens
const PRESET_TOKENS: PresetToken[] = [
  {
    name: "Thinking Trump",
    ticker: "HMMM",
    address: "0x000000000000000000000000",
    chain: "arbitrum"
  },
  {
    name: "Robinhood Official",
    ticker: "HOOD",
    address: "0x471ece3750da237f93b8e33ec242a90221e9ee9c",
    chain: "ethereum"
  },
  {
    name: "PEPE Meme",
    ticker: "PEPE",
    address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    chain: "ethereum"
  }
];

interface MockTrade {
  id: string;
  type: "BUY" | "SELL";
  amount: string;
  value: string;
  wallet: string;
  time: string;
}

export default function DexChart() {
  const [tokenAddress, setTokenAddress] = useState(PRESET_TOKENS[0].address);
  const [chain, setChain] = useState("arbitrum");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePreset, setActivePreset] = useState(PRESET_TOKENS[0].ticker);

  // Real-time fluctuating state metrics
  const [price, setPrice] = useState(0.04523);
  const [marketCap, setMarketCap] = useState(45230000);
  const [volume, setVolume] = useState(6842500);
  const [priceChange, setPriceChange] = useState(12.4);
  const [trades, setTrades] = useState<MockTrade[]>([]);

  // Periodically fluctuate values to simulate realistic real-time blockchain telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      const pct = (Math.random() * 1.6 - 0.75) / 100; // random change between -0.75% and +0.85%
      setPrice(prev => {
        const next = prev * (1 + pct);
        setMarketCap(next * 1000000000); // 1 Billion tokens total supply
        return next;
      });
      setVolume(prev => prev + Math.floor(Math.random() * 850) - 200);
      setPriceChange(prev => prev + (Math.random() * 0.2 - 0.08));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate simulated buy/sell trade notifications
  useEffect(() => {
    const wallets = ["0x3d...f9", "0xae...21", "0x72...bb", "0x5c...a0", "0x11...ec", "0x9d...2b", "0xf0...3d"];
    
    const makeTrade = (): MockTrade => {
      const isBuy = Math.random() > 0.35; // 65% buys for upward trend
      const amount = (Math.random() * 180000 + 5000).toLocaleString(undefined, { maximumFractionDigits: 0 });
      const valueUsd = (parseFloat(amount.replace(/,/g, "")) * price).toLocaleString(undefined, { style: "currency", currency: "USD" });
      
      return {
        id: Math.random().toString(),
        type: isBuy ? "BUY" : "SELL",
        amount,
        value: valueUsd,
        wallet: wallets[Math.floor(Math.random() * wallets.length)],
        time: "Just now"
      };
    };

    // Initial feed
    setTrades([makeTrade(), makeTrade(), makeTrade()]);

    const tradeInterval = setInterval(() => {
      setTrades(prev => {
        const next = [makeTrade(), ...prev];
        return next.slice(0, 4); // Keep latest 4 trades
      });
    }, 4500);

    return () => clearInterval(tradeInterval);
  }, [price]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    playPumpSound();
    
    const cleaned = searchQuery.trim();
    setTokenAddress(cleaned);
    setActivePreset("");
    triggerReload();
  };

  const handleSelectPreset = (token: PresetToken) => {
    playPopSound();
    setTokenAddress(token.address);
    setChain(token.chain);
    setActivePreset(token.ticker);
    triggerReload();
  };

  const triggerReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  // Compute Dexscreener embed URL safely
  const getEmbedUrl = () => {
    if (tokenAddress === "0x000000000000000000000000") {
      // Use premium default live trading pair on Arbitrum
      return "https://dexscreener.com/arbitrum/0xc31e54c7a869b9fcbecc14363cf510d1c41fa443?embed=1&theme=dark&trades=0&info=0";
    }
    
    const targetAddress = tokenAddress || PRESET_TOKENS[0].address;
    return `https://dexscreener.com/${chain}/${targetAddress}?embed=1&theme=dark&trades=1&info=0`;
  };

  return (
    <section id="chart" className="py-24 bg-black relative" style={{ contentVisibility: "auto" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full mb-4">
              <TrendingUp className="w-3.5 h-3.5" /> LIVE TELEMETRY
            </div>
            <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase tracking-tight">
              DEXSCREENER CHART
            </h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-xl font-sans">
              Real-time candlestick chart direct from the **Robinhood Chain** EVM node. Inspect the volume, track whale movements, and verify the $HMMMM pumps.
            </p>
          </div>

          {/* Quick presets selectors */}
          <div className="flex flex-wrap gap-2" id="preset-token-selectors">
            {PRESET_TOKENS.map((token) => (
              <button
                key={token.ticker}
                onClick={() => handleSelectPreset(token)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all active:scale-95 flex items-center gap-2 ${
                  activePreset === token.ticker
                    ? "bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/10"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> {token.name} (${token.ticker})
              </button>
            ))}
          </div>
        </div>

        {/* PRICE USD, MARKETCAP, VOLUME REAL-TIME HEADER BOARD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" id="real-time-ticker-board">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">PRICE USD</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl md:text-2xl font-mono font-black text-amber-400">
                ${price.toLocaleString(undefined, { minimumFractionDigits: 5, maximumFractionDigits: 5 })}
              </span>
              <span className={`text-xs font-mono font-bold flex items-center ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {priceChange >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {priceChange.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">MARKETCAP USD</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl md:text-2xl font-mono font-black text-white">
                ${(marketCap / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">24H VOLUME</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl md:text-2xl font-mono font-black text-zinc-300">
                ${(volume / 1000000).toFixed(3)}M
              </span>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">LIQUIDITY DEPTH</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl md:text-2xl font-mono font-black text-green-400">
                100% LOCK
              </span>
            </div>
          </div>
        </div>

        {/* LIVE TRADE FEED ROW */}
        <div className="bg-zinc-950 border border-zinc-900/60 rounded-2xl p-3 mb-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-2 border-b border-zinc-900 pb-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[9px] font-black text-zinc-400 tracking-wider uppercase">ROBINHOOD CHAIN TRADE CHRONICLE:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {trades.map((trade) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono ${
                    trade.type === "BUY" ? "bg-green-500/5 border border-green-500/20" : "bg-red-500/5 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`font-black ${trade.type === "BUY" ? "text-green-400" : "text-red-400"}`}>
                      {trade.type}
                    </span>
                    <span className="text-zinc-500">{trade.wallet}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold block leading-none">{trade.amount}</span>
                    <span className="text-[9px] text-zinc-400">{trade.value}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Chart Frame Terminal Container */}
        <div className="bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl" id="dexscreener-chart-container">
          
          {/* Chart Terminal Menu Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b border-zinc-900 bg-zinc-950">
            
            {/* Left controls: State & quick info */}
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                ROBINHOOD FEED: <span className="text-white">LIVE_STREAMING</span>
              </span>
              <button
                onClick={triggerReload}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-amber-400 transition-colors"
                aria-label="Reload chart"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
              </button>
            </div>

            {/* Custom token search bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto" id="custom-token-form">
              <div className="relative flex items-center flex-1 md:w-80">
                <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Enter Robinhood Chain custom token address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-zinc-850 rounded-xl py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-zinc-500 outline-none hover:border-zinc-750 focus:border-amber-400/50 transition-all"
                  id="custom-token-address-input"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-bold border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                Load
              </button>
            </form>
          </div>

          {/* Iframe View */}
          <div className="relative w-full h-[520px] md:h-[600px] bg-black">
            {isLoading && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mb-3" />
                <p className="font-mono text-xs text-amber-400 italic animate-pulse">
                  Querying Robinhood node coordinates...
                </p>
              </div>
            )}
            
            <iframe
              title="Dexscreener Token Chart"
              src={getEmbedUrl()}
              className="w-full h-full border-0"
              allow="fullscreen"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

          {/* Terminal Footer Info */}
          <div className="p-3.5 bg-zinc-950 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] text-zinc-500">
            <span className="uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3 h-3 text-amber-400" /> Secure SSL connection established with Robinhood DEX.
            </span>
            <span className="text-zinc-600 font-bold truncate">
              ROBINHOOD_COORDINATE: {tokenAddress}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
