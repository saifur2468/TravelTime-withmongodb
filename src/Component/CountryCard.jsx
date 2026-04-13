// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CountryCard = () => {
//   const [countries, setCountries] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://lasttryserver.vercel.app/api/countries")
//       .then((res) => res.json())
//       .then((data) => setCountries(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Countries</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {countries.slice(0,6).map((country) => (
//           <div
//             key={country._id}
//             className="border rounded shadow-lg cursor-pointer hover:shadow-2xl transition"
//             onClick={() => navigate(`/country/${country.country_Name}/spots`)}
//           >
//             <img
//               src={country.image}
//               alt={country.country_Name}
//               className="w-full h-48 object-cover rounded-t"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{country.country_Name}</h2>
//               <p className="text-gray-600">{country.short_description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CountryCard;