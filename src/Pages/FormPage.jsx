import React, { useState } from 'react';
import AgentSidebar from '../Components/AgentSidebar';
import AgentNameInput from '../Components/AgentNameInput';
import TabNavigation from '../Components/TabNavigation';
import UnifiedForm from '../Components/UnifiedForm';

const FormPage = () => {
  const [agentName, setAgentName] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = ['Police', 'Rescue', 'PDMA', 'NHMA', 'Bolo'];

  const [formData, setFormData] = useState({
    callerName: '',
    callerNumber: '',
    alternativeNumber: '',
    district: '',
    address: '',
    nearestLocation: '',
    caseNature: '',
    description: '',
    additionalInfo: '',
    personsInvolved: '',
    disposition: '',
    closingNotes: '',
    followUpActions: '',
    priorityLevel: '',
  });

  const handleAgentSubmit = (name) => {
    setAgentName(name);
  };

  const handleLogout = () => {
    setAgentName('');
    setFormData({
      callerName: '',
      callerNumber: '',
      alternativeNumber: '',
      district: '',
      address: '',
      nearestLocation: '',
      caseNature: '',
      description: '',
      additionalInfo: '',
      personsInvolved: '',
      disposition: '',
      closingNotes: '',
      followUpActions: '',
      priorityLevel: '',
    });
    setActiveTab(null);
  };

  const handleFormUpdate = (updatedData) => {
    setFormData(updatedData);
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      console.log('Form Submitted:', {
        agentName,
        activeTab,
        formData,
        submittedAt: new Date().toISOString(),
      });
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          callerName: '',
          callerNumber: '',
          alternativeNumber: '',
          district: '',
          address: '',
          nearestLocation: '',
          caseNature: '',
          description: '',
          additionalInfo: '',
          personsInvolved: '',
          disposition: '',
          closingNotes: '',
          followUpActions: '',
          priorityLevel: '',
        });
        setIsLoading(false);
      }, 2000);
    }, 1000);
  };

  // Show agent name input screen
  if (!agentName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <AgentNameInput onSubmit={handleAgentSubmit} />
      </div>
    );
  }

  // Show main form
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Sidebar - Horizontal on mobile, vertical on lg+ */}
      <AgentSidebar agentName={agentName} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">911 Emergency Call Form</h1>
            {activeTab ? (
              <p className="text-xs sm:text-sm text-slate-600">
                <span className="block sm:inline">Department: <span className="font-semibold">{activeTab}</span></span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">Agent: <span className="font-semibold">{agentName}</span></span>
              </p>
            ) : (
              <p className="text-sm text-slate-600">Please select a department to begin</p>
            )}
          </div>

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
            disabled={false}
          />

          {/* Unified Form - All Sections in One Page */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <UnifiedForm
              formData={formData}
              onUpdate={handleFormUpdate}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
