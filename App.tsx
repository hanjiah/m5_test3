
import React, { useState, useEffect, useRef } from 'react';
import { 
  Diamond, 
  Gift, 
  Star, 
  CheckCircle, 
  Loader2, 
  ArrowRight,
  Sparkles,
  Calendar,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Reusable Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-amber-500/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Diamond className="text-amber-500 w-6 h-6" />
          <span className="text-2xl font-serif font-bold tracking-tighter text-white">
            LUXE<span className="text-amber-500">REWARD</span>
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-slate-300 font-medium tracking-wide text-sm uppercase">
          <a href="#about" className="hover:text-amber-500 transition-colors">Event Info</a>
          <a href="#benefits" className="hover:text-amber-500 transition-colors">Benefits</a>
          <a href="#coupon" className="hover:text-amber-500 transition-colors">Get Coupon</a>
        </div>
      </div>
    </nav>
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CouponButton: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleIssue = () => {
    if (status !== 'idle') return;
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff']
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-8 shadow-2xl shadow-amber-500/10 text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-2">
              <CheckCircle className="text-amber-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Coupon Issued Successfully</h3>
            <p className="text-slate-400">Your exclusive code: <span className="text-amber-400 font-mono font-bold tracking-widest text-lg">LUXE-2024-EXCL</span></p>
            <p className="text-xs text-slate-500 pt-4">Expires in 30 days. Use at checkout.</p>
          </motion.div>
        ) : (
          <motion.button
            key="idle"
            onClick={handleIssue}
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
            whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
            className={`w-full py-5 rounded-full font-bold text-lg tracking-widest uppercase flex items-center justify-center space-x-3 transition-all duration-300 ${
              status === 'loading' 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
            }`}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin w-6 h-6" />
                <span>Processing Excellence...</span>
              </>
            ) : (
              <>
                <Gift className="w-6 h-6" />
                <span>Get Exclusive Coupon</span>
                <ArrowRight className="w-5 h-5 opacity-70" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
           <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500 rounded-full blur-[120px] mix-blend-screen" />
           <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-400 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Winter Collection Release Event</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Elegance in Every <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">Moment</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Experience true luxury with our exclusive seasonal rewards. <br className="hidden md:block" />
              Limited time offers crafted only for our distinguished members.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="#coupon" className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20">
                Join Now
              </a>
              <a href="#about" className="px-10 py-4 bg-transparent border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white font-medium rounded-full transition-all">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Info Section */}
      <section id="about" className="py-24 bg-slate-900 border-y border-amber-500/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <FadeInSection>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-amber-500/20">
                  <Calendar className="text-amber-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-4">Limited Duration</h3>
                <p className="text-slate-400 font-light leading-relaxed">This exclusive offer is available until Dec 31, 2024. Don't miss the chance to upgrade your lifestyle.</p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-amber-500/20">
                  <Star className="text-amber-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-4">Premium Access</h3>
                <p className="text-slate-400 font-light leading-relaxed">Access to members-only concierge service and early-bird notifications for upcoming collections.</p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-amber-500/20">
                  <ShieldCheck className="text-amber-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-4">Secure Rewards</h3>
                <p className="text-slate-400 font-light leading-relaxed">Our rewards are verified and linked to your unique membership profile for maximum security.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Coupon Issuance Section */}
      <section id="coupon" className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Abstract Gold Circles */}
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-amber-500/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full border-r border-amber-500/5 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] border border-amber-500/20 overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center bg-[url('https://picsum.photos/seed/luxury/800/1200')] bg-cover bg-center relative min-h-[300px] md:min-h-full">
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="relative z-10 text-center md:text-left">
                  <span className="text-amber-500 font-bold tracking-widest uppercase text-xs">Exclusively Yours</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4 mb-6 leading-tight">
                    30% Off <br />
                    Premium Series
                  </h2>
                  <p className="text-slate-300 font-light italic">
                    "True luxury is an experience that stays with you forever."
                  </p>
                </div>
              </div>
              <div className="p-12 flex flex-col items-center justify-center space-y-8 bg-slate-900/50">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white">Redeem Offer</h3>
                  <p className="text-slate-400 text-sm">Click the button below to generate your unique luxury code.</p>
                </div>
                
                <CouponButton />

                <div className="flex items-center space-x-6 pt-4">
                   <div className="text-center">
                     <p className="text-amber-500 font-bold text-xl">1200+</p>
                     <p className="text-slate-500 text-[10px] uppercase tracking-wider">Members Joined</p>
                   </div>
                   <div className="w-[1px] h-8 bg-slate-800" />
                   <div className="text-center">
                     <p className="text-amber-500 font-bold text-xl">4.9/5</p>
                     <p className="text-slate-500 text-[10px] uppercase tracking-wider">Service Rating</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Diamond className="text-amber-500 w-6 h-6" />
                <span className="text-2xl font-serif font-bold tracking-tighter text-white">
                  LUXE<span className="text-amber-500">REWARD</span>
                </span>
              </div>
              <p className="text-slate-400 font-light max-w-sm mb-8 leading-relaxed">
                We believe in the power of fine craftsmanship and the importance of moments that define excellence. Our rewards are a tribute to our community.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-serif font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-light">
                <li><a href="#" className="hover:text-amber-500 transition-colors">About Brand</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Support Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 text-sm font-light mb-4">Stay updated with our latest luxury releases.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 p-1.5 rounded-full hover:bg-amber-400 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-center text-slate-600 text-[10px] uppercase tracking-[0.3em]">
            © 2024 LUXE REWARD. Crafted with Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
