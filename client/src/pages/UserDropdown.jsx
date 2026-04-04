import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";

const UserDropdown = ({
  currentUser,
  getAvatarUrl,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  handleLogout,
}) => {
  return (
    <div className="relative flex items-center gap-2 cursor-pointer" ref={dropdownRef}>
      
      {/* Trigger */}
      <div
        className="flex items-center gap-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={getAvatarUrl(currentUser)}
          className="w-8 h-8 rounded-full border object-cover"
          alt={currentUser?.firstName}
        />
        <span className="text-sm font-semibold text-gray-700">
          {currentUser?.firstName} {currentUser?.lastName}
        </span>
        <IoChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">

          {/* Profile */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={getAvatarUrl(currentUser)}
              className="w-12 h-12 rounded-full object-cover border"
              alt="user"
            />
            <div>
              <h4 className="text-sm font-bold text-gray-800">
                {currentUser?.firstName} {currentUser?.lastName}
              </h4>
              <p className="text-sm text-blue-500 cursor-pointer hover:underline">
                View Profile
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Menu */}
          <div className="py-2">

            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50">
                  <FiSettings className="text-blue-500" size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Settings</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50">
                  <FiHelpCircle className="text-blue-500" size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Help & Support</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50">
                  <FiLogOut className="text-blue-500" size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Log Out</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;