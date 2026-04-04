import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlineBell,
  AiOutlineMessage,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "../pages/UserDropdown";


const getAvatarUrl = (user) =>
  user?.avatar
    ? `http://localhost:5000${user.avatar}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}+${user?.lastName}`;

const Navbar = () => {
  const { currentUser, clearSession } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-6 py-2 bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-gray-600" onClick={() => setIsDrawerOpen(true)}>
            <AiOutlineMenu size={26} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-blue-600 p-1 rounded-md">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-blue-600 font-bold text-xl tracking-tight">
              Buddy<span className="text-blue-400 font-medium">Script</span>
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <AiOutlineSearch className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-5 border-r border-gray-200 pr-6">
            <button className="text-blue-600"><AiFillHome size={26} /></button>
            <button className="hover:text-blue-600"><HiOutlineUserGroup size={26} /></button>
            <div className="relative">
              <AiOutlineBell size={26} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-white">6</span>
            </div>
            <div className="relative">
              <AiOutlineMessage size={26} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-white">2</span>
            </div>
          </div>

          {/* ✅ Profile Dropdown replaced with component */}
          <UserDropdown
            currentUser={currentUser}
            getAvatarUrl={getAvatarUrl}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownRef={dropdownRef}
            handleLogout={handleLogout}
          />
        </div>
      </nav>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setIsDrawerOpen(false)}><AiOutlineClose size={22} /></button>
        </div>
        <div className="p-4 space-y-5 text-gray-700">
          <div className="relative">
            <AiOutlineSearch className="absolute top-3 left-3 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-10 py-2 bg-gray-100 rounded-full text-sm outline-none" />
          </div>
          <button className="flex items-center gap-3"><AiFillHome size={22} /> Home</button>
          <button className="flex items-center gap-3"><HiOutlineUserGroup size={22} /> Friends</button>
          <button className="flex items-center gap-3"><AiOutlineBell size={22} /> Notifications</button>
          <button className="flex items-center gap-3"><AiOutlineMessage size={22} /> Messages</button>
          <div className="flex items-center gap-3 pt-4 border-t">
            <img src={getAvatarUrl(currentUser)} className="w-8 h-8 rounded-full object-cover" alt="" />
            <span>{currentUser?.firstName} {currentUser?.lastName}</span>
          </div>
          <button onClick={handleLogout} className="text-red-500 text-sm font-semibold">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;