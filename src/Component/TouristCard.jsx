import React, { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaExpand, FaTimes } from "react-icons/fa"; 
import { Typewriter } from "react-simple-typewriter";

const TouristCard = () => {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); // For modal

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
              {/* <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {spot.spotName}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <p className="text-sm">{spot.location}</p>
                  </div>
                </div>
              </div> */}

              <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                {spot.description.slice(0, 80)}...
              </p>

              <div className="flex w-full items-center justify-between pt-4 border-t border-gray-100 mt-4">
                {/* <div className="flex items-center space-x-1.5 text-yellow-500">
                  <FaStar size={16} />
                  <span className="font-bold text-lg text-gray-800">
                    {spot.rating}
                  </span>
                </div> */}

                <button
                  onClick={() => setSelectedSpot(spot)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                  <FaExpand size={14} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedSpot(null)}
            >
              <FaTimes size={20} />
            </button>

            <img
              src={selectedSpot.image}
              alt={selectedSpot.spotName}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedSpot.spotName}
            </h3>

            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <p>{selectedSpot.location}</p>
            </div>

            <p className="text-gray-700 mb-4">{selectedSpot.description}</p>

            <div className="flex items-center space-x-3 text-yellow-500">
              <FaStar />
              <span className="font-bold">{selectedSpot.rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristCard;