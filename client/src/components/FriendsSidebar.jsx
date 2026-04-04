import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const FRIENDS = [
  { id: "1", name: "Steve Jobs",      role: "CEO of Apple",    isOnline: false, lastActive: "5 minutes ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Steve"  },
  { id: "2", name: "Ryan Roslansky",  role: "CEO of LinkedIn", isOnline: true,  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"   },
  { id: "3", name: "Dylan Field",     role: "CEO of Figma",    isOnline: true,  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dylan"  },
];

const FriendsSidebar = () => {
  return (
    <aside className="max-w-xs p-1">
      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] p-6 border border-slate-100">
        <div className="flex justify-between items-baseline mb-5">
          <h2 className="text-[20px] font-extrabold text-slate-800 tracking-tight">Your Friends</h2>
          <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            See All
          </button>
        </div>

        <div className="relative mb-6 group">
          <div className="absolute left-4 top-[11px] pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
            <HiOutlineSearch size={18} />
          </div>
          <input
            type="search"
            placeholder="Search friends..."
            className="w-full bg-slate-50 border border-slate-100 rounded-full py-2.5 pl-11 pr-5 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-100 outline-none transition-all duration-300"
          />
        </div>

        <div className="space-y-4">
          {FRIENDS.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3.5 flex-1 pr-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-50 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                    {friend.name}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">{friend.role}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {friend.isOnline ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shadow-sm" />
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 tabular-nums">{friend.lastActive}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FriendsSidebar;