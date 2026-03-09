import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../Authsection/Authcontex"; // firebase auth
const SpotDetails = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const navigate = useNavigate();


  const handleVisited = async () => {
    if (!auth.currentUser) return; // ensure logged in

    const visitedSpot = {
      userId: auth.currentUser.uid,
      tourists_spot_id: spot._id,
      tourists_spot_name: spot.tourists_spot_name,
      image: spot.image,
      average_cost: spot.average_cost,
      location: spot.location || "Unknown",
      createdAt: new Date(),
    };

    try {
      await fetch("http://localhost:5000/visited/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitedSpot),
      });
      // Navigate to MyList
      navigate("/mylist");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:5000/adddatapost-add/all`)
      .then((res) => res.json())
      .then((data) => {
        const foundSpot = data.find((s) => s._id === id);
        setSpot(foundSpot);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!spot) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>

      <img
        src={spot.image}
        alt={spot.tourists_spot_name}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{spot.tourists_spot_name}</h1>
      <p><strong>Average Cost:</strong> ${spot.average_cost}</p>
      <p><strong>Total Visitors/Year:</strong> {spot.totalVisitorsPerYear}</p>
      <p><strong>Travel Time:</strong> {spot.travel_time}</p>
      <p><strong>Seasonality:</strong> {spot.seasonality}</p>
      <p className="mt-4">{spot.description}</p>
      <button
        onClick={handleVisited}
        className="bottom-2 bg-blue-500 text-center text-xl text-white w-[150px] rounded-xl h-[38px]"
      >
        Visited
      </button>
    </div>
  );
};

export default SpotDetails;