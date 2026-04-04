import React, { useState } from 'react';
import { 
  HiOutlineCube, 
  HiOutlineChevronRight, 
  HiOutlineDotsVertical,
  HiOutlineClock,
  HiOutlineChartBar
} from 'react-icons/hi';

const InventoryCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    /* Wrapper added for visibility during development */
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start">
      <div className="w-full max-w-md">
        <div 
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <HiOutlineCube size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Premium Inventory</h3>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">SKU: INV-2024-001</p>
              </div>
            </div>
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors">
              <HiOutlineDotsVertical size={20} />
            </button>
          </div>

          {/* Dynamic Status Badges */}
          <div className="mt-6 flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Warehouse A
            </span>
          </div>

          {/* Content Body */}
          <div className="mt-8 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Current Valuation</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">$24,450</span>
                  <span className="text-sm font-bold text-emerald-500">+2.4%</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500">Quantity</p>
                <p className="text-lg font-bold text-slate-800">1,240 Units</p>
              </div>
            </div>

            {/* Progress Visual */}
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000 ease-in-out" 
                style={{ width: isHovered ? '85%' : '60%' }}
              />
            </div>
          </div>

          {/* Footer Meta */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <HiOutlineClock size={16} />
                <span className="text-[11px] font-medium">2h ago</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <HiOutlineChartBar size={16} />
                <span className="text-[11px] font-medium">High Demand</span>
              </div>
            </div>
            
            <button className="flex items-center gap-1 text-sm font-bold text-blue-600 transition-all hover:gap-2">
              Details
              <HiOutlineChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;