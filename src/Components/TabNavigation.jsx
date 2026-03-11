import React from 'react';
import { FiShield, FiTruck, FiAlertTriangle, FiHome, FiList } from 'react-icons/fi';

const TabNavigation = ({ activeTab, onTabChange, tabs, disabled = false }) => {
  const tabIcons = {
    Police: FiShield,
    Rescue: FiTruck,
    PDMA: FiAlertTriangle,
    NHMP: FiHome,
    Bolo: FiList,
  };

  return (
    <div className="flex gap-2 mb-4 sm:gap-3 sm:mb-8 flex-wrap justify-start sm:justify-start">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab] || FiShield;
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => !disabled && onTabChange(tab)}
            disabled={disabled}
            className={`flex items-center gap-1 px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg font-semibold transition duration-200 text-xs sm:text-sm whitespace-nowrap ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Icon size={16} />
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
