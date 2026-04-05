import React from 'react';
import SuggestedPeople from './SuggestedPeople';
import EventsCard from './EventsCard';

import { HiOutlinePlay, HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineBarChart, MdOutlinePeopleAlt, MdOutlineSettings } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { IoGameControllerOutline, IoSaveOutline } from "react-icons/io5";

const LeftSidebar = () => {
  const exploreLinks = [
    { name: 'Learning', icon: <HiOutlinePlay size={18} />, isNew: true },
    { name: 'Insights', icon: <MdOutlineBarChart size={18} />, isNew: false },
    { name: 'Find friends', icon: <MdOutlinePeopleAlt size={18} />, isNew: false },
    { name: 'Bookmarks', icon: <FiBookmark size={16} />, isNew: false },
    { name: 'Group', icon: <HiOutlineUsers size={18} />, isNew: false },
    { name: 'Gaming', icon: <IoGameControllerOutline size={18} />, isNew: true },
    { name: 'Settings', icon: <MdOutlineSettings size={18} />, isNew: false },
    { name: 'Save post', icon: <IoSaveOutline size={16} />, isNew: false },
  ];

  return (
    <div className="hidden lg:block lg:w-[320px] flex-shrink-0">
      {/* ml-6: Adds margin to the left 
          flex flex-col items-center: Centers the children (cards) horizontally
      */}
      <div className="sticky top-20 space-y-4 ml-6 flex flex-col items-center pr-2">

        {/* Explore Section - Made width 100% to match other cards */}
        <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-base font-bold mb-3 text-gray-900">
            Explore
          </h4>

          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li
                key={link.name}
                className="flex items-center justify-between group cursor-pointer py-0.5"
              >
                <a
                  href="#0"
                  className="flex items-center gap-3 text-gray-500 group-hover:text-blue-600 transition-colors"
                >
                  <div className="text-gray-400 group-hover:text-blue-500">
                    {link.icon}
                  </div>
                  <span className="text-[13px] font-semibold text-gray-600 group-hover:text-gray-900">
                    {link.name}
                  </span>
                </a>

                {link.isNew && (
                  <span className="text-[9px] font-bold bg-[#10d38d] text-white px-1.5 py-0.5 rounded">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* These will now be centered because of 'items-center' on the parent div */}
        <SuggestedPeople />
        <EventsCard />
      </div>
    </div>
  );
};

export default LeftSidebar;