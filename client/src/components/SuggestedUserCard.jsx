import React from "react";

const SUGGESTED_USERS = [
  {
    id: "1",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Radovan",
  },
];

const SuggestedUserCard = () => {
  return (
    <div className="max-w-sm overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm mb-4">
      <div className="flex items-center justify-between px-6 py-4">
        <h4 className="text-lg font-bold text-gray-900">You Might Like</h4>
        <a href="#0" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          See All
        </a>
      </div>

      <hr className="border-gray-100" />

      {SUGGESTED_USERS.map((user) => (
        <div key={user.id} className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border border-gray-50 flex-shrink-0"
            />
            <div>
              <h4 className="text-base font-bold text-gray-900 leading-tight hover:underline cursor-pointer">
                {user.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{user.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2.5 text-sm font-semibold text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              Ignore
            </button>
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all">
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUserCard;