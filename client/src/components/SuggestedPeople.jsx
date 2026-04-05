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
 <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-300 mb-4">

  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-sm font-bold text-gray-900 tracking-tight">
      Suggested People
    </h2>
    <a href="#all" className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 uppercase">
      See All
    </a>
  </div>

  {/* List */}
  <div className="flex flex-col gap-3">
    {people.map((person) => (
      <div
        key={person.id}
        className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition"
      >
        {/* Left */}
        <div className="flex items-center gap-4"> {/* 👈 increased gap */}
          <img
            src={person.imageUrl}
            alt={person.name}
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
          <div>
            <p className="text-[13px] font-semibold text-gray-800 group-hover:text-black">
              {person.name}
            </p>
            <p className="text-[11px] text-gray-400">
              {person.role}
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="ml-4 px-3 py-1 text-[11px] font-semibold border border-gray-200 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
          Connect
        </button>
      </div>
    ))}
  </div>
</div>
  );
};

export default SuggestedPeople;