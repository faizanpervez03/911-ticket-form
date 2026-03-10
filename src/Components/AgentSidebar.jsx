import React, { useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';

const AgentSidebar = ({ agentName, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <div className="w-full lg:w-64 bg-gradient-to-r lg:bg-gradient-to-b from-slate-800 to-slate-900 text-white h-auto lg:h-screen flex flex-row justify-around   lg:flex-col p-2 sm:p-3 lg:p-6 shadow-lg border-b lg:border-b-0 lg:border-l border-slate-700 lg:justify-start lg:items-stretch gap-2 lg:gap-0">
      {/* Agent Info */}
      <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-2 lg:gap-0 flex-shrink-0 lg:mb-8">
        <div className="bg-slate-700 rounded-full w-10 lg:w-16 h-10 lg:h-16 flex items-center justify-center flex-shrink-0 lg:mb-4 lg:mx-auto">
          <FiUser size={18} className="lg:w-8 lg:h-8 text-blue-400" />
        </div>
        <div className="lg:text-center whitespace-nowrap lg:whitespace-normal">
          <h3 className="font-semibold text-xs lg:text-lg truncate">{agentName || 'Agent'}</h3>
          <p className="text-xs lg:text-sm text-slate-400 lg:mt-1 hidden lg:block">Call Center Agent</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block border-t border-slate-700 mb-8 mt-8 w-full"></div>

      {/* Status Info */}
      <div className="p-2 lg:p-4 bg-slate-700 rounded-lg flex flex-row lg:flex-col items-center lg:items-stretch gap-1 lg:gap-0 lg:mb-8 flex-shrink-0">
        <p className="text-xs text-slate-400 lg:mb-2 hidden lg:block">STATUS</p>
        <div className="flex items-center gap-1 lg:gap-2 lg:justify-start">
          <div className="w-2 lg:w-3 h-2 lg:h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs lg:text-sm font-medium whitespace-nowrap">Active</span>
        </div>
      </div>

      {/* Session Info */}
      <div className="hidden lg:flex lg:flex-col mb-auto p-4 bg-slate-700 rounded-lg w-full">
        <p className="text-xs text-slate-400 mb-3">SESSION</p>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-slate-400">Session ID:</p>
            <p className="text-blue-400 font-mono text-xs break-all">911-{Date.now().toString().slice(-6)}</p>
          </div>
          <div className="mt-3">
            <p className="text-slate-400">Login Time:</p>
            <p className="text-slate-300">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex-shrink-0 flex items-center justify-center lg:flex-none lg:w-full">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 lg:py-3 px-2 lg:px-4 rounded-lg flex items-center justify-center gap-1 lg:gap-2 transition duration-200 text-xs lg:text-base whitespace-nowrap lg:w-full"
        >
          <FiLogOut size={16} className="lg:w-5 lg:h-5" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full sm:w-96 shadow-xl">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">Confirm Logout</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-200 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-200 text-xs sm:text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSidebar;
