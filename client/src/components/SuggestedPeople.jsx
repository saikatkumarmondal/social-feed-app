import React from 'react';
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
    /* Width reduced to 315px and padding to p-4 */
    <div className="w-[315px] bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      
      {/* Header: Tighter bottom margin */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-800 tracking-tight">
          Suggested People
        </h2>
        <a href="#all" className="text-[11px] font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase">
          See All
        </a>
      </div>

      {/* List: Gap reduced to 3 (12px) */}
      <div className="flex flex-col gap-3">
        {people.map((person) => (
          <div key={person.id} className="flex items-center justify-between">
            
            {/* Left Section: Avatar (w-9) + Info */}
            <div className="flex items-center gap-2.5">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-100"
              />
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-900 leading-none">
                  {person.name}
                </span>
                <span className="text-[10px] font-medium text-gray-400 mt-0.5">
                  {person.role}
                </span>
              </div>
            </div>
            
            {/* Right Section: Smallest viable button */}
            <button className="px-2.5 py-1 border border-gray-200 rounded-md text-[11px] font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPeople;