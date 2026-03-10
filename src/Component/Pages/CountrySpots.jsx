import React, { useState, useEffect } from 'react';

const CountrySpots = () => {

  const [activeCountry, setActiveCountry] = useState('Bangladesh');
  const [allSpots, setAllSpots] = useState([]);
  const [loading, setLoading] = useState(true);

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

<div className="max-w-7xl mx-auto p-6 mb-20">

{/* Title */}

<div className="text-center mb-10">

<h1 className="text-4xl font-bold text-gray-800">
Explore Tourist Spots
</h1>

</div>


{/* Country Buttons */}

<div className="flex flex-wrap justify-center gap-4 mb-10">

{countries.map((country) => (

<button
key={country}
onClick={() => setActiveCountry(country)}

className={`px-6 py-2 rounded-xl font-bold transition ${
activeCountry === country
? "bg-blue-600 text-white"
: "bg-gray-200 text-gray-700"
}`}

>

{country}

</button>

))}

</div>


{/* Loading */}

{loading ? (

<p className="text-center text-gray-500">Loading...</p>

) : (


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{filteredSpots.length > 0 ? (

filteredSpots.map((spot) => (

<div
key={spot._id}
className="relative rounded-2xl overflow-hidden shadow-lg group"
>

{/* Image */}

<img
src={spot.image}
alt={spot.tourists_spot_name}
className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
/>


{/* Spot Name */}

<div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg">

<h2 className="text-white text-lg font-bold">

{spot.tourists_spot_name}

</h2>

</div>

</div>

))

) : (

<p className="col-span-full text-center text-gray-400">

No spots found

</p>

)}

</div>

)}

</div>

)

}

export default CountrySpots