// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { auth } from "../Authsection/Authcontex"; // firebase auth
// const SpotDetails = () => {
//   const { id } = useParams();
//   const [spot, setSpot] = useState(null);
//   const navigate = useNavigate();


//   const handleVisited = async () => {
//     if (!auth.currentUser) return; // ensure logged in

//     const visitedSpot = {
//       userId: auth.currentUser.uid,
//       tourists_spot_id: spot._id,
//       tourists_spot_name: spot.tourists_spot_name,
//       image: spot.image,
//       average_cost: spot.average_cost,
//       location: spot.location || "Unknown",
//       createdAt: new Date(),
//     };

//     try {
//       await fetch("http://localhost:5000/visited/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(visitedSpot),
//       });
//       // Navigate to MyList
//       navigate("/mylist");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     fetch(`http://localhost:5000/adddatapost-add/all`)
//       .then((res) => res.json())
//       .then((data) => {
//         const foundSpot = data.find((s) => s._id === id);
//         setSpot(foundSpot);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!spot) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-blue-600 hover:underline"
//       >
//         &larr; Back
//       </button>

//       <img
//         src={spot.image}
//         alt={spot.tourists_spot_name}
//         className="w-full h-96 object-cover rounded mb-6"
//       />
//       <h1 className="text-3xl font-bold mb-4">{spot.tourists_spot_name}</h1>
//       <p><strong>Average Cost:</strong> ${spot.average_cost}</p>
//       <p><strong>Total Visitors/Year:</strong> {spot.totalVisitorsPerYear}</p>
//       <p><strong>Travel Time:</strong> {spot.travel_time}</p>
//       <p><strong>Seasonality:</strong> {spot.seasonality}</p>
//       <p className="mt-4">{spot.description}</p>
//       <button
//         onClick={handleVisited}
//         className="bottom-2 bg-blue-500 text-center text-xl text-white w-[150px] rounded-xl h-[38px]"
//       >
//         Visited country
//       </button>
//       <button>Request to visted </button>
//     </div>
//   );
// };

// export default SpotDetails;

























import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../Authsection/Authcontex"; // firebase auth

const SpotDetails = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [requestStatus, setRequestStatus] = useState("Request to visited");
  const navigate = useNavigate();

  // Old Visited button
  const handleVisited = async () => {
    if (!auth.currentUser) return;

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

      navigate("/mylist"); // Navigate to MyList
    } catch (err) {
      console.error(err);
    }
  };

  // Extra Request button
  const handleRequest = async () => {
    if (!auth.currentUser) return alert("Please login first!");

    const requestData = {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Anonymous",
      userEmail: auth.currentUser.email,
      spotId: spot._id,
      spotName: spot.tourists_spot_name,
      spotImage: spot.image,
    };

    try {
      const res = await fetch("http://localhost:5000/visit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (res.ok) setRequestStatus("Pending...");
      else {
        const data = await res.json();
        alert(data.message || "Request failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Fetch spot details
  useEffect(() => {
    fetch(`http://localhost:5000/adddatapost-add/all`)
      .then((res) => res.json())
      .then((data) => {
        const foundSpot = data.find((s) => s._id === id);
        setSpot(foundSpot);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch request status
  useEffect(() => {
    if (!auth.currentUser) return;

    fetch(
      `http://localhost:5000/visit-request/status?userId=${auth.currentUser.uid}&spotId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Accepted") setRequestStatus("Visited This Spot");
        else if (data.status === "Pending") setRequestStatus("Pending...");
        else setRequestStatus("Request to visited");
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

      {/* Old Visited button */}
      <button
        onClick={handleVisited}
        className="bottom-2 bg-blue-500 text-center text-xl text-white w-[150px] rounded-xl h-[38px] mr-4"
      >
        Visited country
      </button>

      {/* Extra Request button */}
      <button
        onClick={handleRequest}
        disabled={requestStatus === "Visited This Spot"}
        className={`bg-green-500 text-center text-xl text-white w-[180px] rounded-xl h-[38px] ${
          requestStatus === "Visited This Spot" ? "cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        {requestStatus}
      </button>
    </div>
  );
};

export default SpotDetails;