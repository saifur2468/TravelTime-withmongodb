import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const ALLTouristSpot = () => {
  const [spots, setSpots] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true); // ✅ added
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // ✅ start loading

    fetch("https://lasttryserver.vercel.app/adddatapost-add/all")
      .then((res) => res.json())
      .then((data) => {
        setSpots(data);
        setLoading(false); // ✅ stop loading
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // ✅ stop loading even if error
      });
  }, []);

  const sortedSpots = [...spots].sort((a, b) => {
    if (sortOrder === "asc") return a.average_cost - b.average_cost;
    else return b.average_cost - a.average_cost;
  });

  return (
    <div className="p-4">

      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        <Typewriter
          words={[' All Tourist Spots']}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      <div className="mb-4 flex justify-end">
        <label className="mr-2 font-semibold">Sort by Average Cost:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* ✅ Loading Spinner */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500">Loading data...</p>
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {sortedSpots.map((spot) => (
            <div
              key={spot._id}
              className="border rounded shadow p-4 flex flex-col"
            >
              <img
                src={spot.image}
                alt={spot.tourists_spot_name}
                className="h-48 w-full object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold mb-2">
                {spot.tourists_spot_name}
              </h2>
              <p>
                <strong>Average Cost:</strong> ${spot.average_cost}
              </p>
              <p>
                <strong>Total Visitors/Year:</strong> {spot.totalVisitorsPerYear}
              </p>
              <p>
                <strong>Travel Time:</strong> {spot.travel_time}
              </p>
              <p>
                <strong>Seasonality:</strong> {spot.seasonality}
              </p>

              <button
                onClick={() => navigate(`/allTouristSpot/${spot._id}`)}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default ALLTouristSpot;