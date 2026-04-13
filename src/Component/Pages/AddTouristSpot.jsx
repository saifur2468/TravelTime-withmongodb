import React, { useState, useContext } from "react";
import { AuthContext } from "../Authsection/AuthProvider";
import Swal from "sweetalert2";

const AddTouristSpot = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddSpot = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        const newSpot = {
            image: form.image.value,
            tourists_spot_name: form.spotName.value,
            country_Name: form.country.value,
            location: form.location.value,
            short_description: form.description.value,
            average_cost: parseInt(form.cost.value),
            seasonality: form.season.value,
            travel_time: form.travelTime.value,
            totalVisitorsPerYear: parseInt(form.visitors.value),
            user_email: user?.email,
            user_name: user?.displayName,
        };

        try {
            const res = await fetch("https://lasttryserver.vercel.app/tourist-spots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSpot),
            });

            const data = await res.json();

            if (data.insertedId) {
                Swal.fire("Success!", "Tourist Spot Added Successfully", "success");
                form.reset();
            }
        } catch (err) {
            Swal.fire("Error!", err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-lg rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
                Add Tourist Spot
            </h2>

            <form onSubmit={handleAddSpot} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Image URL */}
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    required
                    className="input input-bordered w-full h-[58px] rounded-xl text-center"
                />

                {/* Tourist Spot Name */}
                <input
                    type="text"
                    name="spotName"
                    placeholder="Tourist Spot Name"
                    required
                    className="input input-bordered w-full h-[58px] text-center  rounded-xl"
                />

                {/* Country */}
                <input
                    type="text"
                    name="country"
                    placeholder="Country Name"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

















                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

                {/* Average Cost */}
                <input
                    type="number"
                    name="cost"
                    placeholder="Average Cost"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

                {/* Seasonality */}
                <input
                    type="text"
                    name="season"
                    placeholder="Seasonality (Summer/Winter)"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

                {/* Travel Time */}
                <input
                    type="text"
                    name="travelTime"
                    placeholder="Travel Time (e.g. 5 hours)"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

                {/* Visitors Per Year */}
                <input
                    type="number"
                    name="visitors"
                    placeholder="Total Visitors Per Year"
                    required
                    className="input input-bordered w-full h-[48px] text-center  rounded-xl"
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Short Description"
                    className="textarea textarea-bordered col-span-1 md:col-span-2 h-[58px] text-center  rounded-xl"
                    rows="4"
                ></textarea>

                {/* User Email */}
                <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-200 h-[48px] text-center  rounded-xl"
                />

                {/* User Name */}
                <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-200 h-[48px] text-center  rounded-xl"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-1 md:col-span-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Adding..." : "Add Tourist Spot"}
                </button>
            </form>
        </div>
    );
};

export default AddTouristSpot;