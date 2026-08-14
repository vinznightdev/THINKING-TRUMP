import { Send, Twitter, ShieldCheck, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16 text-zinc-500 font-sans text-xs relative overflow-hidden" id="footer">
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8" id="social-links-container">
          <a
            href="https://x.com"
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 flex items-center justify-center transition-all duration-300 active:scale-90"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-sky-500 hover:text-white text-zinc-400 flex items-center justify-center transition-all duration-300 active:scale-90"
            aria-label="Telegram"
          >
            <Send className="w-5 h-5" />
          </a>
        </div>

        {/* Humorous Token Details Copy */}
        <div className="max-w-xl text-center mb-10" id="footer-details-copy">
          <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-2">
            CONTEMPLATION CORE
          </span>
          <p className="text-zinc-400 leading-relaxed text-sm">
            Thinking Trump is just Trump… thinking. Nobody knows what he’s thinking about. Maybe the next pump. Maybe the next 100x. Maybe absolutely nothing. But one thing is certain: the longer he thinks, the more unhinged the timeline gets.
          </p>
        </div>

        {/* Strict Legal Disclaimer */}
        <div className="max-w-2xl text-center border-t border-zinc-900 pt-8 text-[11px] text-zinc-600 leading-relaxed flex flex-col gap-3">
          <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> OFFICIAL CONFORMANCE DISCLAIMER
          </div>
          <p>
            $HMMMM is a meme coin with zero intrinsic value or expectation of financial return. There is no official team, no roadmap, and no utility. The coin is completely useless and for entertainment purposes only. When you buy, you are trading for pure, unadulterated cognitive energy.
          </p>
          <p className="font-mono text-[9px] text-zinc-700">
            © {new Date().getFullYear()} HMMMM.FUN. ALL THINKING IS RENOUCED. DECENTRALIZED COGNITION FOR THE TIMELINE.
          </p>
        </div>

      </div>
    </footer>
  );
}
