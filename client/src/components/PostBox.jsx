// src/components/PostBox.jsx
import React, { useState, useRef } from "react";
import { 
  FiImage, 
  FiVideo, 
  FiCalendar, 
  FiFileText, 
  FiSend, 
  FiEdit2, 
  FiX,
  FiGlobe,
  FiLock,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../services/api";

const SERVER_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const getAvatarUrl = (user) =>
  user?.avatar
    ? `${SERVER_URL}${user.avatar}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}+${user?.lastName}`;

const VISIBILITY_OPTIONS = [
  { value: "public",  label: "Public",  icon: FiGlobe, color: "text-green-600" },
  { value: "private", label: "Private", icon: FiLock,  color: "text-orange-500" },
];

const PostBox = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const [postText, setPostText]             = useState("");
  const [selectedImage, setSelectedImage]   = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [visibility, setVisibility]         = useState("public");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const fileInputRef                        = useRef(null);

  const activeOption = VISIBILITY_OPTIONS.find((o) => o.value === visibility);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!postText.trim() && !selectedImage) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("text", postText);
      formData.append("visibility", visibility);
      if (selectedImage) formData.append("image", selectedImage);

      const res = await createPost(formData);
      onPostCreated(res.data.post);
      setPostText("");
      setSelectedImage(null);
      setImagePreviewUrl("");
      setVisibility("public");
    } catch (err) {
      console.error("Post creation failed:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canPost = (postText.trim() || selectedImage) && !isSubmitting;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 md:p-6 w-full border border-gray-100">
      
      {/* Top Section */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
          <img src={getAvatarUrl(currentUser)} alt="user" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex items-center relative">
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            placeholder="Write something ..."
            className="w-full bg-transparent border-none text-[14px] sm:text-[16px] md:text-[18px] text-gray-600 outline-none placeholder:text-gray-400"
          />
          <FiEdit2 className="text-gray-400 ml-2 hidden sm:block" size={18} />
        </div>
      </div>

      {/* Image Preview */}
      {imagePreviewUrl && (
        <div className="mt-4 relative inline-block sm:ml-14">
          <img src={imagePreviewUrl} alt="preview" className="max-h-48 sm:max-h-60 rounded-lg shadow-sm w-full sm:w-auto" />
          <button onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-black">
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-6 sm:mt-8 bg-[#F8FBFF] rounded-xl p-3 sm:p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        
        {/* Actions Left */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
            <FiImage size={20} />
            <span className="text-sm sm:text-base font-medium">Photo</span>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
            <FiVideo size={20} />
            <span className="text-sm sm:text-base font-medium">Video</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
            <FiCalendar size={18} />
            <span className="text-sm sm:text-base font-medium">Event</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
            <FiFileText size={18} />
            <span className="text-sm sm:text-base font-medium">Article</span>
          </button>
        </div>

        {/* Right: Visibility + Post Button */}
        <div className="flex items-center gap-3 w-full lg:w-auto">

          {/* Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold transition-all ${
                visibility === "public"
                  ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                  : "border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100"
              }`}
            >
              <activeOption.icon size={15} />
              <span>{activeOption.label}</span>
              <FiChevronDown
                size={13}
                className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-20 min-w-[130px]">
                {VISIBILITY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setVisibility(option.value); setIsDropdownOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                      visibility === option.value ? option.color : "text-gray-600"
                    }`}
                  >
                    <option.icon size={15} />
                    {option.label}
                    {visibility === option.value && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            disabled={!canPost}
            className={`flex items-center justify-center gap-2 flex-1 lg:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
              canPost
                ? "bg-[#1B94FF] text-white hover:bg-blue-600 shadow-md"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiSend size={16} />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBox;