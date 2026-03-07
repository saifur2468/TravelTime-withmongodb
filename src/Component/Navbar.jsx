import React, { useState, useEffect } from 'react';
import imglogo from "../assets/icons8-around-the-globe-48.png";
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../Component/Authsection/Authcontex';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু টগল করার জন্য
  const navigate = useNavigate();

  const backgrounds = [
    "https://i.postimg.cc/SsDzcQnV/thailand-main.jpg",
    "https://i.postimg.cc/50nF89XZ/ricardo-gomez-angel-2AQt-Pacdfp8-unsplash.jpg",
    "https://i.postimg.cc/xCtbLjX7/istockphoto-539115110-612x612.jpg"
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsOpen(false);
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };

  // নেভিগেশন লিংকগুলো বারবার না লিখে ম্যাপ করার জন্য
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Tourists Spot', path: '/allTouristSpot' },
    { name: 'Add Tourists Spot', path: '/AddTouristsSpot' },
    { name: 'My List', path: '/mylist' },
  ];

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      {/* Background Slider */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg})` }}
        />
      ))}

      {/* Navbar Container */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src={imglogo} alt="logo" className="w-10 h-10" />
              <h1 className='text-2xl font-bold tracking-tight'>TravelTime</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 font-semibold">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-400 transition"}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Auth Section & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden sm:flex items-center gap-4">
                  <div className="group relative">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                    />
                    <div className="absolute top-12 right-0 bg-gray-800 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {user?.displayName || "User"}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="bg-white/10 hover:bg-red-500 px-4 py-2 rounded-lg text-sm transition-all">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:block">
                  <button className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-lg font-bold transition">Login</button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-500 focus:outline-none"
                >
                  {/* Hamburger Icon */}
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"} bg-black/80 backdrop-blur-lg`}>
          <div className="px-4 pt-2 pb-6 space-y-2 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-orange-500 transition"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth Button */}
            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <img src={user?.photoURL} className="w-12 h-12 rounded-full border-2 border-orange-500" alt="" />
                  <p className="font-bold">{user?.displayName}</p>
                  <button onClick={handleLogout} className="w-full bg-red-600 py-3 rounded-lg font-bold">Logout</button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-orange-600 py-3 rounded-lg font-bold">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 mt-16 lg:mt-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6">Discover the World with Us</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">Explore breathtaking destinations and create unforgettable memories.</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-[#ff5a4e] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Start Exploring</button>
            <button className="border-2 border-[#ff5a4e] px-8 py-3 rounded-full font-bold hover:bg-[#ff5a4e] transition-colors">View Tours</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;