import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountrySpots = () => {
  const [activeCountry, setActiveCountry] = useState('Bangladesh');
  const [allSpots, setAllSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // দেশের নামগুলোর লিস্ট (ট্যাব বাটন তৈরির জন্য)
  const countries = ["Bangladesh", "Thailand", "Vietnam", "Malaysia", "Indonesia"];

  
  useEffect(() => {
    setLoading(true);
   
   fetch('http://localhost:5000/favorite-country')
      .then(res => res.json())
      .then(data => {
        setAllSpots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Data fetch error:", err);
        setLoading(false);
      });
  }, []);

  
  const filteredSpots = allSpots.filter(spot => 
    spot.country_Name?.toLowerCase() === activeCountry.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-[600px] mb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Explore Exotic Destinations</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Choose your favorite country and discover the most beautiful tourist spots they have to offer.</p>
      </div>

      {/* Country Tabs - Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setActiveCountry(country)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform ${
              activeCountry === country
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Spots Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading amazing spots...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSpots.length > 0 ? (
            filteredSpots.map((spot) => (
              <div 
                key={spot._id} 
                className="group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={spot.image} 
                    alt={spot.tourists_spot_name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                       {spot.rating || '4.5'}
                       <h1>{spot.Name}</h1>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {spot.tourists_spot_name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {spot.short_description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Starting from</p>
                      <p className="text-xl font-black text-blue-600">${spot.averageCost}</p>
                    </div>
                    {/* <Link to={`/spot/${spot._id}`}>
                      <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md">
                        View Details
                      </button>
                    </Link> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-xl font-bold text-gray-400">No spots found for {activeCountry} yet!</p>
              <p className="text-gray-400 mt-1">Try selecting another country.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySpots;