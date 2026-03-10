import React, { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

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
    <div className="w-full lg:w-64 bg-gradient-to-b lg:bg-gradient-to-b from-slate-800 to-slate-900 text-white flex items-center lg:flex-col p-3 sm:p-4 lg:p-6 shadow-lg border-b lg:border-l border-slate-700 h-auto lg:h-screen gap-4 lg:gap-0">
      {/* Agent Info */}
      <div className="flex lg:block items-center gap-4 lg:gap-0 lg:mb-8">
        <div className="bg-slate-700 rounded-full w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
          <FiUser size={24} className="text-blue-400 lg:hidden" />
          <FiUser size={32} className="text-blue-400 hidden lg:block" />
        </div>
        <div className="flex-1 lg:flex-none lg:text-center">
          <h3 className="font-semibold text-sm lg:text-lg truncate">
            {agentName || "Agent"}
          </h3>
          <p className="text-xs lg:text-sm text-slate-400 mt-0 lg:mt-1 hidden lg:block">
            Call Center Agent
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block border-t bg-red border-slate-700 mb-8"></div>

      {/* Status Info */}
      <div className="p-2 sm:p-3 lg:p-4 bg-red rounded-lg lg:mb-8 flex-shrink-0 flex lg:block items-center justify-center">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <p className="text-xs text-slate-400">STATUS</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs lg:text-sm font-medium">Active</span>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="p-2 sm:p-3 lg:p-4 bg-slate-700 rounded-lg hidden lg:block lg:mb-auto">
        <p className="text-xs text-slate-400 mb-3">SESSION</p>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-slate-400">Session ID:</p>
            <p className="text-blue-400 font-mono text-xs break-all">
              911-{Date.now().toString().slice(-6)}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-slate-400">Login Time:</p>
            <p className="text-slate-300">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 lg:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 text-xs lg:text-base"
        >
          <FiLogOut size={18} className="lg:hidden" />
          <FiLogOut size={20} className="hidden lg:inline" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full sm:w-96 shadow-xl">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 text-xs sm:text-sm"
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
