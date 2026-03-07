import React from 'react';
import { FaStar, FaMapMarkerAlt, FaCalendar, FaDollarSign } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
const events = [
  {
    title: "Santorini",
    location: "Greece",
    rating: 4.9,
    Day: "7 day",
    Cost:"3500",
    description: "Famous for its stunning sunsets and white-washed buildings.",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Bali",
    location: "Indonesia",
    rating: 4.8,
     Day: "7 day",
    Cost:"3500",
    description: "A tropical paradise known for its beaches and lush rice terraces.",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Eiffel Tower",
    location: "Paris, France",
    rating: 4.7,
     Day: "7 day",
    Cost:"3500",
    description: "The world's most iconic landmark in the city of love.",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Machu Picchu",
    location: "Peru",
    rating: 4.9,
     Day: "7 day",
    Cost:"3500",
    description: "An ancient Incan citadel set high in the Andes Mountains.",
    img: "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Great Wall of China",
    location: "Huairou, China",
    rating: 4.6,
     Day: "7 day",
    Cost:"3500",
    description: "A historic wonder stretching across thousands of miles.",
    img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Grand Canyon",
    location: "Arizona, USA",
    rating: 4.8,
     Day: "7 day",
    Cost:"3500",
    description: "A massive canyon carved by the Colorado River with vast views.",
    img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80&w=800",
  }
];
const Featured = () => {
    return (
        <div>
            <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center mb-8">
        {/* <h1 className="text-3xl font-bold">Check Our Complete Events</h1> */}
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
                 <Typewriter
                    words={['Check Our Featured Tours']}
                    loop={false} 
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}   
                    deleteSpeed={50} 
                    delaySpeed={1500} 
                  />
               </h2>
        <p className="text-gray-600 mt-2">
         Our travel experts are here to help you find the perfect destination based on your preferences, budget, and travel style.
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Event Image */}
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-start p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-red-400" /> {event.location}
              </div>
              <div className="flex items-center mb-2">
                <FaStar className="mr-2 text-yellow-400" /> {event.rating} / 5
              </div>
       
              <p className="text-sm">{event.description}</p>
             <div className='flex gap-2'>
                 <p className='flex items-center gap-2'>
                    <FaDollarSign></FaDollarSign>
                    {event.Cost}

                 </p>
              <p className='flex items-center gap-2'>
                <FaCalendar></FaCalendar> {event.Day}
              </p>
             </div>
            </div>
          </div>
        ))}
      </div>
    </section>
        </div>
    );
};

export default Featured;