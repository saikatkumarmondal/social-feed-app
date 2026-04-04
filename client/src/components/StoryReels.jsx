import React from 'react';
import { HiPlus } from 'react-icons/hi2';

// Importing assets based on your directory structure
import userStoryImg from '../assets/images/people1.png';
import storyImg1 from '../assets/images/people2.png';
import storyImg2 from '../assets/images/people3.png';
import storyImg3 from '../assets/images/img7.png';
import miniPic from '../assets/images/mini_pic.png';

const StoryReels = () => {
  const publicStories = [
    { id: 1, name: "Ryan Roslansky", img: storyImg1, mini: miniPic },
    { id: 2, name: "Ryan Roslansky", img: storyImg2, mini: miniPic },
    { id: 3, name: "Ryan Roslansky", img: storyImg3, mini: miniPic },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {/* Your Story Component */}
      <div className="relative group cursor-pointer aspect-[3/4] rounded-xl overflow-hidden bg-gray-900">
        <img 
          src={userStoryImg} 
          alt="Your Story" 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Dark overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#1c2231] mb-2">
            <HiPlus className="text-white text-lg" />
          </div>
          <p className="text-white text-[13px] font-bold">Your Story</p>
        </div>
      </div>

      {/* Public Stories */}
      {publicStories.map((story) => (
        <div key={story.id} className="relative group cursor-pointer aspect-[3/4] rounded-xl overflow-hidden shadow-sm">
          <img 
            src={story.img} 
            alt={story.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {/* Subtle gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Mini Profile Picture Overlay */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-lg">
            <img src={story.mini} alt="profile" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-4 left-3 right-3">
            <p className="text-white text-[13px] font-bold truncate">
              {story.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryReels;