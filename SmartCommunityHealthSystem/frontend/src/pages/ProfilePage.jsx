import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import { User, Mail, Shield, Smartphone, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <Layout title="User Profile">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your profile, preferences, and security settings.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar / Quick Links */}
          <div className="space-y-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-50 text-slate-900 rounded-xl font-medium text-sm text-left">
                <User className="w-4 h-4 text-slate-500" /> Personal Info
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm text-left transition-colors">
                <Shield className="w-4 h-4 text-slate-500" /> Security
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm text-left transition-colors">
                <Bell className="w-4 h-4 text-slate-500" /> Notifications
              </button>
              <div className="h-px bg-slate-100 my-2 mx-4" />
              <Link to="/login" className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm text-left transition-colors">
                <LogOut className="w-4 h-4 text-red-500" /> Sign Out
              </Link>
            </div>
          </div>

          {/* Main Content Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Personal Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-blue-600 text-2xl font-bold">
                  AD
                </div>
                <div>
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                    Change Avatar
                  </button>
                </div>
              </div>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <input type="text" defaultValue="Admin" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" defaultValue="admin@aqua-ai.com" disabled className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Contact support to change your email address.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number (SMS Alerts)</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
