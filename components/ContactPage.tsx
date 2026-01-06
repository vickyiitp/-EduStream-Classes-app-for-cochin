
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900">Get in Touch</h1>
        <p className="text-lg text-slate-500">Have questions? We are here to help you on your educational journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Phone, title: 'Phone', text: '+91 1800-EDU-STREAM', color: 'text-green-600', bg: 'bg-green-50' },
            { icon: Mail, title: 'Email', text: 'support@edustream.com', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: MapPin, title: 'Address', text: 'Knowledge Park, New Delhi, India', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Clock, title: 'Hours', text: 'Mon-Sat: 9 AM - 9 PM', color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 text-[#5D3FD3] p-3 rounded-2xl">
              <MessageCircle size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Send us a Message</h3>
          </div>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Message</label>
              <textarea rows={5} placeholder="Write your message here..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"></textarea>
            </div>
            <button className="bg-[#5D3FD3] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
