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
    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-gray-900">Events</h2>
        <button className="text-[11px] font-semibold text-blue-500 hover:underline">
          See all
        </button>
      </div>

      {/* Event */}
      {events.map((event) => (
        <div key={event.id} className="group cursor-pointer">

          {/* Image */}
          <div className="relative h-[140px] rounded-xl overflow-hidden mb-3">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex gap-3 items-center mb-3">
            <div className="flex flex-col items-center justify-center min-w-[50px] h-[55px] bg-[#10d38d] rounded-lg text-white shadow-sm">
              <span className="text-lg font-bold leading-none">{event.date.day}</span>
              <span className="text-[11px] font-semibold uppercase">{event.date.month}</span>
            </div>

            <h4 className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-black">
              {event.title}
            </h4>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400">
              {event.attendees} going
            </span>
            <button className="px-3 py-1 text-[11px] font-semibold rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 transition">
              Going
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsCard;