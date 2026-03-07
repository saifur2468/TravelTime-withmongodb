import React, { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaExpand } from "react-icons/fa"; // বাড়তি আইকন
import { Typewriter } from "react-simple-typewriter";

const TouristCard = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
  
    fetch("http://localhost:5000/api/top-spots")
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-indigo-700">
        <Typewriter
          words={["Discover Top Tourist Spots"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spots.map((spot) => (
          <div
            key={spot._id}
            className="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
           
            <img
              src={spot.image}
              alt={spot.spotName}
              className="w-full h-64 object-cover"
            />

          
            <div className="p-5 flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
             
                {/* <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {spot.spotName.charAt(0).toUpperCase()}
                </div> */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {spot.spotName}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <p className="text-sm">{spot.location}</p>
                  </div>
                </div>
              </div>

             
              <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                {spot.description}
              </p>

            
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center space-x-1.5 text-yellow-500 bg-yellow-50 px-3 py-1.5 rounded-full shadow-inner">
                  <FaStar size={16} />
                  <span className="font-bold text-lg text-gray-800">
                    {spot.rating}
                  </span>
                </div>

                {/* <button className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md">
                  <FaExpand size={14} />
                  <span>View Details</span>
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristCard;