import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountryButtons = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://lasttryserver.vercel.app/api/countries")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">All Country Spots</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {countries.map(country => (
          <button
            key={country}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={() => navigate(`/spots/${country}`)} // route
          >
            {country}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryButtons;