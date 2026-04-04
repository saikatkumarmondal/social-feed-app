import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoHelpCircleOutline, IoChevronForward, IoChevronDown } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';

const NavbarUserMenu = ({ dropdownRef, isDropdownOpen, setIsDropdownOpen, currentUser, handleLogout, getAvatarUrl }) => {
  return (
    <div className="relative flex items-center gap-2 cursor-pointer" ref={dropdownRef}>
      {/* Trigger: The Profile Section in Navbar */}
      <div 
        className="flex items-center gap-2" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={getAvatarUrl(currentUser)}
          className="w-9 h-9 rounded-full border-2 border-blue-500 p-0.5 object-cover"
          alt={currentUser?.firstName}
        />
        <span className="text-sm font-bold text-gray-800">
          {currentUser?.firstName} {currentUser?.lastName}
        </span>
        <IoChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
        />
      </div>

      {/* The Styled Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[100]">
          
          {/* 1. Header Section */}
          <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 mb-2">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 p-0.5">
              <img 
                src={getAvatarUrl(currentUser)} 
                className="w-full h-full rounded-full object-cover" 
                alt="Profile" 
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[20px] font-bold text-gray-900 tracking-tight leading-tight">
                {currentUser?.firstName} {currentUser?.lastName}
              </h4>
              <button className="text-blue-500 text-[16px] font-medium text-left hover:underline w-fit">
                View Profile
              </button>
            </div>
          </div>

          {/* 2. Menu Items Section */}
          <div className="flex flex-col">
            <DropdownItem 
              icon={<AiOutlineSetting size={22} />} 
              label="Settings" 
              onClick={() => {/* Navigate to settings */}}
            />
            <DropdownItem 
              icon={<IoHelpCircleOutline size={22} />} 
              label="Help & Support" 
              onClick={() => {/* Navigate to help */}}
            />
            <DropdownItem 
              icon={<LuLogOut size={22} />} 
              label="Log Out" 
              onClick={handleLogout}
              isDestructive
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for the menu rows to ensure consistent styling
const DropdownItem = ({ icon, label, onClick, isDestructive }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-xl transition-all group"
  >
    <div className="flex items-center gap-4">
      {/* Soft Blue Icon Container */}
      <div className={`w-11 h-11 ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-[#EBF2FF] text-[#3B82F6]'} rounded-full flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <span className={`text-[17px] font-semibold ${isDestructive ? 'text-red-500' : 'text-gray-600'} group-hover:text-gray-900 transition-colors`}>
        {label}
      </span>
    </div>
    <IoChevronForward 
      className={`transition-transform group-hover:translate-x-1 ${isDestructive ? 'text-red-300' : 'text-gray-400'}`} 
      size={18} 
    />
  </button>
);

export default NavbarUserMenu;