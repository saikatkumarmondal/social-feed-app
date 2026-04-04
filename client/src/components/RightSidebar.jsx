import React from "react";
import SuggestedUserCard from "./SuggestedUserCard";
import FriendsSidebar from "./FriendsSidebar";

const RightSidebar = () => {
  return (
    <div className="p-4 space-y-4">
      <SuggestedUserCard />
      <FriendsSidebar />
    </div>
  );
};

export default RightSidebar;