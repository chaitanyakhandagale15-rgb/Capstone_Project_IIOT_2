import { Link, useNavigate } from "react-router-dom";
import { Droplets, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login, redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-800 tracking-tight mb-8">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
          <Droplets className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl leading-tight text-slate-900">Aqua AI</span>
        </div>
      </Link>
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Welcome Back</h1>
        <p className="text-slate-500 text-center mb-8 text-sm">Enter your credentials to access the dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="admin@aqua-ai.com" defaultValue="admin@aqua-ai.com" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>
            <input type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="••••••••" defaultValue="password123" />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 transition-all flex justify-center items-center gap-2 mt-4 shadow-md shadow-blue-600/20">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-600">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
