import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, Activity, ShieldCheck, ArrowRight, BrainCircuit } from "lucide-react";

export default function LandingPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Navbar */}
      <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-slate-200/60 bg-white/60 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 tracking-tight">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl leading-tight text-slate-900">Aqua AI</span>
            <span className="text-[10px] leading-tight text-slate-500 font-medium uppercase tracking-wider">Water Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Login</Link>
          <Link to="/signup" className="text-sm font-medium bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-20 relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live IoT + AI System
            </motion.div>
            
            <motion.h1 variants={item} className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Intelligence for <br className="hidden md:block"/> Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Single Drop.</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              The complete capstone platform for real-time water quality monitoring. Empowered by live IoT sensors, predictive analytics, and LLaMA 3.1 AI to ensure community health and safety.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/signup" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5">
                Launch Platform <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-base font-medium hover:bg-slate-50 transition-all hover:shadow-sm">
                View Demo Dashboard
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Animated Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="hidden lg:flex relative w-full aspect-square max-w-[500px] mx-auto items-center justify-center"
          >
            {/* Outer Orbital Rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute inset-4 rounded-full border border-dashed border-blue-200/60" />
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="absolute inset-16 rounded-full border border-teal-200/40" />
            <div className="absolute inset-28 rounded-full border border-indigo-100/30 bg-white/20 backdrop-blur-3xl" />
            
            {/* Central AI Node */}
            <div className="relative z-10 w-36 h-36 bg-white rounded-full shadow-2xl shadow-blue-500/20 flex items-center justify-center border-[6px] border-slate-50">
               <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                  <BrainCircuit className="w-14 h-14 text-blue-600" />
               </motion.div>
            </div>

            {/* Orbiting Sensor Nodes */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-4"
            >
               {/* Node 1 */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                 <Activity className="w-6 h-6 text-teal-500" />
               </div>
               {/* Node 2 */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                 <Droplets className="w-6 h-6 text-blue-500" />
               </div>
               {/* Node 3 */}
               <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                 <ShieldCheck className="w-6 h-6 text-indigo-500" />
               </div>
            </motion.div>

            {/* Floating Data Packets */}
            <motion.div 
              animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-700 z-20"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              pH 7.2
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] right-[5%] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-700 z-20"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Temp 28°C
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto w-full text-left"
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Real-time IoT Telemetry</h3>
            <p className="text-slate-600 leading-relaxed">Live socket connections stream pH, Temperature, and Turbidity data directly from remote hardware with zero latency.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Cloudflare Workers AI</h3>
            <p className="text-slate-600 leading-relaxed">Integrated LLaMA 3.1 8B analyzes data streams to predict disease risks and generate natural language safety assessments.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Automated Alerts</h3>
            <p className="text-slate-600 leading-relaxed">Intelligent thresholds automatically classify water quality and dispatch real-time critical warnings to the dashboard.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
