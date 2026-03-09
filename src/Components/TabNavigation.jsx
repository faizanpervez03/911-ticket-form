import React from 'react';
import { FiShield, FiTruck, FiAlertTriangle, FiHome, FiList } from 'react-icons/fi';

const TabNavigation = ({ activeTab, onTabChange, tabs, disabled = false }) => {
  const tabIcons = {
    Police: FiShield,
    Rescue: FiTruck,
    PDMA: FiAlertTriangle,
    NHMA: FiHome,
    Bolo: FiList,
  };

  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab] || FiShield;
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => !disabled && onTabChange(tab)}
            disabled={disabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Icon size={20} />
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
