import React, { useEffect, useState } from "react";
import { auth } from "../Authsection/Authcontex";
import Swal from "sweetalert2";

const MyList = () => {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); // for update form
  const [formData, setFormData] = useState({});

  const fetchVisited = async () => {
    if (!auth.currentUser) return;
    const res = await fetch(`http://localhost:5000/visited/${auth.currentUser.uid}`);
    const data = await res.json();
    setSpots(data);
  };

  useEffect(() => {
    fetchVisited();
  }, []);

  // handle delete with SweetAlert
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:5000/visited/${id}`, { method: "DELETE" });
      Swal.fire("Deleted!", "Your spot has been deleted.", "success");
      fetchVisited();
    }
  };

  // open update form modal
  const openUpdateForm = (spot) => {
    setSelectedSpot(spot);
    setFormData({
      image: spot.image || "",
      tourists_spot_name: spot.tourists_spot_name || "",
      country_Name: spot.country_Name || "",
      location: spot.location || "",
      short_description: spot.short_description || "",
      average_cost: spot.average_cost || "",
      seasonality: spot.seasonality || "",
      travel_time: spot.travel_time || "",
      totalVisitorsPerYear: spot.totalVisitorsPerYear || "",
      user_email: spot.user_email || "",
      user_name: spot.user_name || "",
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/visited/${selectedSpot._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      Swal.fire("Updated!", "Your spot has been updated.", "success");
      setSelectedSpot(null);
      fetchVisited();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Visited Spots</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((s) => (
            <tr key={s._id} className="text-center">
              <td className="border p-2">
                <img src={s.image} alt={s.tourists_spot_name} className="w-24 h-16 object-cover mx-auto rounded" />
              </td>
              <td className="border p-2">{s.tourists_spot_name}</td>
              <td className="border p-2">${s.average_cost}</td>
              <td className="border p-2">{s.location}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => openUpdateForm(s)}
                  className="px-2 py-1 bg-yellow-400 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-xl overflow-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-bold mb-4">Update Spot</h2>
            <div className="space-y-3">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="block font-medium mb-1">{key.replace(/_/g, " ")}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setSelectedSpot(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyList;