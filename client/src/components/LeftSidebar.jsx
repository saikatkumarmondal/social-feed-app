import React from 'react';
import SuggestedPeople from './SuggestedPeople';
import EventsCard from './EventsCard';

import { HiOutlinePlay, HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineBarChart, MdOutlinePeopleAlt, MdOutlineSettings } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { IoGameControllerOutline, IoSaveOutline } from "react-icons/io5";

const LeftSidebar = () => {
  const exploreLinks = [
    { name: 'Learning', icon: <HiOutlinePlay size={20} />, isNew: true },
    { name: 'Insights', icon: <MdOutlineBarChart size={20} />, isNew: false },
    { name: 'Find friends', icon: <MdOutlinePeopleAlt size={20} />, isNew: false },
    { name: 'Bookmarks', icon: <FiBookmark size={18} />, isNew: false },
    { name: 'Group', icon: <HiOutlineUsers size={20} />, isNew: false },
    { name: 'Gaming', icon: <IoGameControllerOutline size={20} />, isNew: true },
    { name: 'Settings', icon: <MdOutlineSettings size={20} />, isNew: false },
    { name: 'Save post', icon: <IoSaveOutline size={18} />, isNew: false },
  ];

  return (
    <div className="
      hidden lg:block          /* ❗ Hide on mobile & tablet */
      lg:w-[260px] xl:w-[300px]
      flex-shrink-0
    ">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-2 space-y-6">

        {/* Explore Section */}
        <div className="bg-white rounded-xl p-5 xl:p-7 shadow-sm border border-gray-100">
          <h4 className="text-lg xl:text-[22px] font-bold mb-5 xl:mb-7 text-gray-900">
            Explore
          </h4>

          <ul className="space-y-4 xl:space-y-6">
            {exploreLinks.map((link) => (
              <li
                key={link.name}
                className="flex items-center justify-between group cursor-pointer"
              >
                <a
                  href="#0"
                  className="flex items-center gap-3 xl:gap-4 text-gray-500 group-hover:text-blue-600 transition-colors"
                >
                  <div className="text-gray-400 group-hover:text-blue-500">
                    {link.icon}
                  </div>

                  <span className="text-sm xl:text-[16px] font-medium text-gray-600 group-hover:text-gray-900">
                    {link.name}
                  </span>
                </a>

                {link.isNew && (
                  <span className="text-[10px] xl:text-[11px] font-bold bg-[#10d38d] text-white px-2 py-0.5 rounded-md">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Other Sections */}
        <SuggestedPeople />
        <EventsCard />
      </div>
    </div>
  );
};

export default LeftSidebar;