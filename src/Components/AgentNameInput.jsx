import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const AgentNameInput = ({ onSubmit, isLoading = false }) => {
  const [agentName, setAgentName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!agentName.trim()) {
      setError('Please enter your name to proceed');
      return;
    }

    if (agentName.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    onSubmit(agentName.trim());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to 911 Form</h2>
        <p className="text-slate-600 mb-6">Please enter your name to begin taking calls</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => {
                setAgentName(e.target.value);
                setError('');
              }}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition duration-200"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Start Taking Calls'}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6 text-center">
          All calls will be logged with your name for accountability and quality assurance
        </p>
      </div>
    </div>
  );
};

export default AgentNameInput;
