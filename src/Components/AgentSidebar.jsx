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
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white h-screen flex flex-col p-6 shadow-lg border-l border-slate-700">
      {/* Agent Info */}
      <div className="mb-8">
        <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <FiUser size={32} className="text-blue-400" />
        </div>
        <h3 className="text-center font-semibold text-lg truncate">{agentName || 'Agent'}</h3>
        <p className="text-center text-sm text-slate-400 mt-1">Call Center Agent</p>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mb-8"></div>

      {/* Status Info */}
      <div className="mb-8 p-4 bg-slate-700 rounded-lg">
        <p className="text-xs text-slate-400 mb-2">STATUS</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Active</span>
        </div>
      </div>

      {/* Session Info */}
      <div className="mb-auto p-4 bg-slate-700 rounded-lg">
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
      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Confirm Logout</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
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
