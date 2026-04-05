import React from 'react';
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
  ];

  return (
    /* Width reduced to 315px and padding to p-4 */
    <div className="w-[315px] bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* Header: Smaller font and margin */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Events</h2>
        <button className="text-[12px] font-bold text-blue-500 hover:underline">
          See all
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            {/* Image Container: Height reduced from 220px to 140px */}
            <div className="relative h-[140px] rounded-lg overflow-hidden mb-3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Section: Tighter spacing */}
            <div className="flex gap-3 items-center mb-4">
              {/* Green Date Box: Smaller dimensions */}
              <div className="flex flex-col items-center justify-center min-w-[50px] h-[55px] bg-[#10d38d] rounded-md text-white shadow-sm">
                <span className="text-lg font-bold leading-none">{event.date.day}</span>
                <span className="text-[11px] font-bold uppercase">{event.date.month}</span>
              </div>

              {/* Title: Reduced from 20px to 14px */}
              <h4 className="text-[14px] font-bold text-gray-800 leading-snug">
                {event.title}
              </h4>
            </div>

            {/* Footer Section: Compact buttons and text */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <span className="text-[12px] font-medium text-gray-400">
                {event.attendees} People Going
              </span>
              <button className="px-4 py-1.5 border border-blue-500 text-blue-500 text-[12px] font-bold rounded-md hover:bg-blue-50 transition-colors">
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