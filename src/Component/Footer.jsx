import React from 'react';
import { 
  FaFacebookF, FaXTwitter, FaLinkedinIn, 
  FaYoutube, FaGithub 
} from "react-icons/fa6"; 
import { IoSend } from "react-icons/io5";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0a1118] text-gray-400 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <h2 className="text-white text-3xl font-bold tracking-tight">TravelTime</h2>
          <p className="leading-relaxed text-sm">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. 
            Donec velit neque auctor sit amet aliquam vel ullamcorper sit amet ligula.
          </p>
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Stay Updated</h4>
            <div className="relative flex items-center max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#1a232e] border border-gray-700 rounded-lg py-3 px-4 outline-none focus:border-[#ff5a4e] transition text-white"
              />
              <button className="absolute right-1.5 bg-[#ff5a4e] p-2.5 rounded-md hover:bg-orange-600 transition text-white">
                <IoSend size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-bold mb-6 relative inline-block border-b-2 border-[#ff5a4e] pb-1">Company</h4>
          <ul className="space-y-4 text-sm">
            {['About', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => (
              <li key={item} className="flex items-center group cursor-pointer hover:text-white transition">
                <span className="text-[#ff5a4e] mr-2 transition-transform group-hover:translate-x-1">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Links */}
        <div>
          <h4 className="text-white font-bold mb-6 relative inline-block border-b-2 border-[#ff5a4e] pb-1">Solutions</h4>
          <ul className="space-y-4 text-sm">
            {['Digital Strategy', 'Cloud Computing', 'Data Analytics', 'AI Solutions', 'Cybersecurity'].map((item) => (
              <li key={item} className="flex items-center group cursor-pointer hover:text-white transition">
                <span className="text-[#ff5a4e] mr-2 transition-transform group-hover:translate-x-1">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 className="text-white font-bold mb-6 relative inline-block border-b-2 border-[#ff5a4e] pb-1">Get in Touch</h4>
          <ul className="space-y-5 text-sm">
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-[#1a232e] flex items-center justify-center rounded-full text-[#ff5a4e] flex-shrink-0">
                <MdLocationOn size={20} />
              </div>
              <p>2847 Maple Avenue<br/>Los Angeles, CA 90210<br/>United States</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-[#1a232e] flex items-center justify-center rounded-full text-[#ff5a4e] flex-shrink-0">
                <MdPhone size={18} />
              </div>
              <p>01404260731</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-[#1a232e] flex items-center justify-center rounded-full text-[#ff5a4e] flex-shrink-0">
                <MdEmail size={18} />
              </div>
              <p>saifur.devweb@gmail.com
</p>
            </li>
          </ul>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-8">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaGithub].map((Icon, idx) => (
              <div key={idx} className="w-9 h-9 bg-[#1a232e] hover:bg-[#ff5a4e] hover:text-white flex items-center justify-center rounded-full cursor-pointer transition-all duration-300">
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© Copyright <span className="text-white font-bold">MyWebsite</span> All Rights Reserved</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Cookie Policy</span>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;