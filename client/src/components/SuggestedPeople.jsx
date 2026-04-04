import React from 'react';

// Import images from your assets folder
import people1 from '../assets/images/people1.png';
import people2 from '../assets/images/people2.png';
import people3 from '../assets/images/people3.png';

const SuggestedPeople = () => {
  const people = [
    { id: 1, name: "Steve Jobs", role: "CEO of Apple", imageUrl: people1 },
    { id: 2, name: "Ryan Roslansky", role: "CEO of Linkedin", imageUrl: people2 },
    { id: 3, name: "Dylan Field", role: "CEO of Figma", imageUrl: people3 },
  ];

  return (
    <div className="w-[380px] bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-7 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-[22px] font-bold text-gray-800 tracking-tight">
          Suggested People
        </h2>
        <a href="#all" className="text-[15px] font-semibold text-blue-500 hover:text-blue-600 transition-colors">
          See All
        </a>
      </div>

      {/* List */}
      <div className="flex flex-col gap-6">
        {people.map((person) => (
          <div key={person.id} className="flex items-center justify-between">
            {/* Left Section: Avatar + Info */}
            <div className="flex items-center gap-4">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm border border-gray-50"
              />
              <div className="flex flex-col">
                <span className="text-[17px] font-semibold text-gray-900 leading-tight">
                  {person.name}
                </span>
                <span className="text-sm font-medium text-gray-500 mt-0.5">
                  {person.role}
                </span>
              </div>
            </div>
            
            {/* Right Section: Button */}
            <button className="px-5 py-2 border border-gray-200 rounded-lg text-[15px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all active:scale-95">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPeople;