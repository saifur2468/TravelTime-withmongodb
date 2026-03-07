import React from 'react';
import { Compass, Heart, Zap, Globe } from 'lucide-react'; 
import { Typewriter } from "react-simple-typewriter";
const WhyChooseUs = () => {
  const features = [
    {
      icon: <Compass className="w-6 h-6 text-[#ff5a4e]" />,
      title: "Expert Navigation",
      desc: "Quis nostrum exercitationem ullam corporis suscipit laboriosam"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ff5a4e]" />,
      title: "Personalized Care",
      desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa"
    },
    {
      icon: <Zap className="w-6 h-6 text-[#ff5a4e]" />,
      title: "Instant Booking",
      desc: "Ut enim ad minim veniam quis nostrud exercitation ullamco"
    },
    {
      icon: <Globe className="w-6 h-6 text-[#ff5a4e]" />,
      title: "Worldwide Coverage",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse"
    }
  ];

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Badge */}
        <span className="bg-[#fff0ef] text-[#ff5a4e] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Why Choose Us
        </span>
        
        {/* Main Heading */}
        {/* <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-[#1a1a1a]">
          What Makes Us Different
        </h2>
         */}
         <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
                          <Typewriter
                             words={['What Makes Us Different']}
                             loop={false} 
                             cursor
                             cursorStyle="|"
                             typeSpeed={80}   
                             deleteSpeed={50} 
                             delaySpeed={1500} 
                           />
                        </h2>
        {/* Description */}
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#fff0ef] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              {/* Feature Title */}
              <h3 className="text-xl font-bold mb-3 text-[#1a1a1a]">
                {item.title}
              </h3>
              {/* Feature Description */}
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;