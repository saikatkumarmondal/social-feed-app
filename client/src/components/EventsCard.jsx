import React from 'react';
// Assuming your image is in src/assets/images/
import eventImg from '../assets/images/feed_event1.png'; 

const EventsCard = () => {
  const events = [
    {
      id: 1,
      title: "No more terrorism no more cry",
      date: { day: "10", month: "Jul" },
      attendees: 17,
      image: eventImg,
    },
    // Add more events here
  ];

  return (
    <div className="w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <button className="text-[15px] font-semibold text-blue-500 hover:underline">
          See all
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative h-[220px] rounded-xl overflow-hidden mb-5">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Section */}
            <div className="flex gap-4 items-center mb-6">
              {/* Green Date Box */}
              <div className="flex flex-col items-center justify-center min-w-[65px] h-[75px] bg-[#10d38d] rounded-lg text-white shadow-sm">
                <span className="text-2xl font-bold leading-none">{event.date.day}</span>
                <span className="text-[15px] font-semibold tracking-wide">{event.date.month}</span>
              </div>

              {/* Title */}
              <h4 className="text-[20px] font-bold text-gray-900 leading-[1.3] pr-4">
                {event.title}
              </h4>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-5 border-t border-gray-100">
              <span className="text-[16px] font-medium text-gray-400">
                {event.attendees} People Going
              </span>
              <button className="px-6 py-2 border border-blue-500 text-blue-500 text-[15px] font-bold rounded-md hover:bg-blue-50 transition-colors">
                Going
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCard;