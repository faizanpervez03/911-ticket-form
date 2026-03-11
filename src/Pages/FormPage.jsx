import React, { useState } from 'react';
import { FiX, FiPlus, FiUser } from 'react-icons/fi';
import AgentSidebar from '../Components/AgentSidebar';
import AgentNameInput from '../Components/AgentNameInput';
import TabNavigation from '../Components/TabNavigation';
import UnifiedForm from '../Components/UnifiedForm';
import DepartmentModal from '../Components/DepartmentModal';

const FormPage = () => {
  const [agentName, setAgentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const tabs = ['Police', 'Rescue', 'PDMA', 'NHMA', 'Bolo'];

  // Store data for each department
  const [departmentForms, setDepartmentForms] = useState({});
  const [primaryDepartment, setPrimaryDepartment] = useState(null);
  const [secondaryDepartments, setSecondaryDepartments] = useState([]);
  
  // Modal state for secondary departments
  const [modalState, setModalState] = useState({
    isOpen: false,
    department: null
  });

  // Shared caller info across all departments
  const [callerInfo, setCallerInfo] = useState({
    callerName: '',
    callerNumber: '',
    alternativeNumber: '',
    district: '',
    address: '',
    nearestLocation: '',
  });

  const handleAgentSubmit = (name) => {
    setAgentName(name);
  };

  const handleLogout = () => {
    setAgentName('');
    setDepartmentForms({});
    setPrimaryDepartment(null);
    setSecondaryDepartments([]);
    setModalState({ isOpen: false, department: null });
    setCallerInfo({
      callerName: '',
      callerNumber: '',
      alternativeNumber: '',
      district: '',
      address: '',
      nearestLocation: '',
    });
    setShowReview(false);
  };

  // Select primary department (shown inline)
  const selectPrimaryDepartment = (deptName) => {
    if (primaryDepartment !== deptName) {
      setPrimaryDepartment(deptName);
      if (!departmentForms[deptName]) {
        setDepartmentForms({
          ...departmentForms,
          [deptName]: {
            caseNature: '',
            caseNature1: '',
            caseNature2: '',
            caseNature3: '',
            description: '',
            additionalInfo: '',
            personsInvolved: '',
            disposition: '',
            closingNotes: '',
            followUpActions: '',
            priorityLevel: '',
          }
        });
      }
    }
  };

  // Open modal for secondary department
  const openModalForDepartment = (deptName) => {
    setModalState({ isOpen: true, department: deptName });
  };

  // Handle department button click
  const handleDepartmentButtonClick = (deptName) => {
    if (primaryDepartment === null) {
      // First department selection
      selectPrimaryDepartment(deptName);
    } else if (deptName === primaryDepartment) {
      // Already selected - stay on primary
      return;
    } else {
      // Secondary department - open modal
      if (!secondaryDepartments.includes(deptName)) {
        setSecondaryDepartments([...secondaryDepartments, deptName]);
      }
      openModalForDepartment(deptName);
    }
  };

  // Save secondary department from modal
  const handleSaveSecondaryDepartment = (formData) => {
    const deptName = modalState.department;
    setDepartmentForms({
      ...departmentForms,
      [deptName]: formData
    });
    setModalState({ isOpen: false, department: null });
  };

  // Close modal without saving
  const closeModal = () => {
    setModalState({ isOpen: false, department: null });
  };

  // Remove department
  const removeDepartment = (deptName) => {
    if (deptName === primaryDepartment) {
      setPrimaryDepartment(null);
      const newForms = { ...departmentForms };
      delete newForms[deptName];
      setDepartmentForms(newForms);
    } else {
      setSecondaryDepartments(secondaryDepartments.filter(d => d !== deptName));
      const newForms = { ...departmentForms };
      delete newForms[deptName];
      setDepartmentForms(newForms);
    }
  };

  // Update form data for primary department
  const handleFormUpdate = (updatedData) => {
    if (primaryDepartment) {
      // Filter out caller info fields - only keep department-specific fields
      const callerInfoFields = ['callerName', 'callerNumber', 'alternativeNumber', 'district', 'address', 'nearestLocation'];
      const departmentFormData = Object.entries(updatedData).reduce((acc, [key, value]) => {
        if (!callerInfoFields.includes(key)) {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      setDepartmentForms({
        ...departmentForms,
        [primaryDepartment]: {
          ...departmentForms[primaryDepartment],
          ...departmentFormData
        }
      });
    }
  };

  // Update shared caller info
  const handleCallerInfoUpdate = (updatedInfo) => {
    setCallerInfo(updatedInfo);
  };

  // Final submission with review
  const handleFormSubmit = () => {
    setShowReview(true);
  };

  // Submit all departments
  const handleFinalSubmit = () => {
    setIsLoading(true);
    
    // Combine primary + secondary departments
    const allDepartments = primaryDepartment ? [primaryDepartment, ...secondaryDepartments] : [];
    
    const allData = {
      agentName,
      submittedAt: new Date().toISOString(),
      callerInfo,
      cases: allDepartments.map(dept => ({
        department: dept,
        formData: {
          ...callerInfo,
          ...departmentForms[dept]
        }
      }))
    };

    console.log('Multi-Department Submission:', allData);

    setTimeout(() => {
      alert(`✅ Dispatch Submitted!\n\nDepartments: ${allDepartments.join(', ')}\nTicket ID: 911-${Date.now().toString().slice(-8)}`);
      
      setTimeout(() => {
        setDepartmentForms({});
        setPrimaryDepartment(null);
        setSecondaryDepartments([]);
        setShowReview(false);
        setCallerInfo({
          callerName: '',
          callerNumber: '',
          alternativeNumber: '',
          district: '',
          address: '',
          nearestLocation: '',
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

  // Show review page
  if (showReview) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
        <AgentSidebar agentName={agentName} onLogout={handleLogout} />
        <div className="flex-1 overflow-auto w-full">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Review & Dispatch All Cases</h1>
            
            {/* Caller Info Summary */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-bold text-blue-900 mb-3">Caller Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p><span className="font-semibold">Name:</span> {callerInfo.callerName}</p>
                <p><span className="font-semibold">Phone:</span> {callerInfo.callerNumber}</p>
                <p><span className="font-semibold">District:</span> {callerInfo.district}</p>
                <p><span className="font-semibold">Address:</span> {callerInfo.address}</p>
              </div>
            </div>

            {/* All Cases Summary */}
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900">Cases to Dispatch</h2>
              {primaryDepartment && (
                <div key={primaryDepartment} className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    🎯 {primaryDepartment} Department (Primary)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                    <p><span className="font-semibold">Case Type:</span> {departmentForms[primaryDepartment]?.caseNature3 || departmentForms[primaryDepartment]?.caseNature || 'N/A'}</p>
                    <p><span className="font-semibold">Priority:</span> {departmentForms[primaryDepartment]?.priorityLevel || 'N/A'}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Description:</span> {departmentForms[primaryDepartment]?.description || 'N/A'}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Disposition:</span> {departmentForms[primaryDepartment]?.disposition || 'N/A'}</p>
                  </div>
                </div>
              )}
              {secondaryDepartments.map((dept) => (
                <div key={dept} className="border-2 border-slate-300 rounded-lg p-4 bg-white">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    🚨 {dept} Department (Secondary)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                    <p><span className="font-semibold">Case Type:</span> {departmentForms[dept]?.caseNature3 || departmentForms[dept]?.caseNature || 'N/A'}</p>
                    <p><span className="font-semibold">Priority:</span> {departmentForms[dept]?.priorityLevel || 'N/A'}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Description:</span> {departmentForms[dept]?.description || 'N/A'}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Disposition:</span> {departmentForms[dept]?.disposition || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowReview(false)}
                disabled={isLoading}
                className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-3 px-4 rounded-lg transition disabled:bg-slate-200"
              >
                Back to Edit
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:bg-slate-400"
              >
                {isLoading ? '⏳ Dispatching...' : '✓ Dispatch All Cases'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show main form page
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <AgentSidebar agentName={agentName} onLogout={handleLogout} />

      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              911 Emergency Call Form
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              <span className="block sm:inline">Agent: <span className="font-semibold">{agentName}</span></span>
            </p>
          </div>

          {/* DEPARTMENT TABS - Always visible at top */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {tabs.map((dept) => {
                const isPrimary = dept === primaryDepartment;
                const isSecondary = secondaryDepartments.includes(dept);
                const isSelected = isPrimary || isSecondary;

                return (
                  <div key={dept} className="relative">
                    <button
                      onClick={() => handleDepartmentButtonClick(dept)}
                      className={`w-full py-3 px-3 rounded-lg transition font-bold text-sm flex items-center justify-center gap-2 ${
                        isPrimary
                          ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700'
                          : isSecondary
                          ? 'bg-green-500 text-white shadow-md border-2 border-green-600'
                          : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-500 hover:shadow-md'
                      }`}
                    >
                      {isPrimary && <span>🎯 {dept}</span>}
                      {isSecondary && <span>✓ {dept}</span>}
                      {!isSelected && <span>🔘 {dept}</span>}
                    </button>
                    
                    {/* Remove button for secondary departments */}
                    {isSecondary && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDepartment(dept);
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center transition"
                        title="Remove this department"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Clear Selection Button - Shows when departments are selected */}
            {(primaryDepartment || secondaryDepartments.length > 0) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setPrimaryDepartment(null);
                    setSecondaryDepartments([]);
                    const newForms = {};
                    setDepartmentForms(newForms);
                  }}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm flex items-center gap-2"
                >
                  ✕ Clear All Selections
                </button>
              </div>
            )}
          </div>

          {/* CALLER INFO + DISPOSITION FORM - Always visible by default */}
          {!primaryDepartment ? (
            // Before department selection - show caller info + disposition
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* LEFT: CALLER INFORMATION (2 columns) */}
                <div className="col-span-1 lg:col-span-2 border-t-4 border-blue-600 pt-4 sm:pt-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                     <FiUser size={20} className="text-blue-600" />
                    Caller Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Caller Name *</label>
                      <input
                        type="text"
                        value={callerInfo.callerName || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, callerName: e.target.value })}
                        placeholder="Full name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={callerInfo.callerNumber || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, callerNumber: e.target.value })}
                        placeholder="Phone number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Alternative Number</label>
                      <input
                        type="tel"
                        value={callerInfo.alternativeNumber || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, alternativeNumber: e.target.value })}
                        placeholder="Alt phone"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">District of KPK *</label>
                      <select
                        value={callerInfo.district || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, district: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      >
                        <option value="">Select District</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Mardan">Mardan</option>
                        <option value="Kohat">Kohat</option>
                        <option value="Swabi">Swabi</option>
                        <option value="Bannu">Bannu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Auto-Fetch Location</label>
                      <button
                        type="button"
                        onClick={() => setCallerInfo({ ...callerInfo, nearestLocation: 'GPS Coordinates: Latitude, Longitude' })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
                      >
                        📍 Fetch Location
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Address *</label>
                      <textarea
                        value={callerInfo.address || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, address: e.target.value })}
                        placeholder="Complete address"
                        rows="3"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Nearest Location/Landmark *</label>
                      <textarea
                        value={callerInfo.nearestLocation || ''}
                        onChange={(e) => setCallerInfo({ ...callerInfo, nearestLocation: e.target.value })}
                        placeholder="e.g., Near City Hospital"
                        rows="3"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: DISPOSITION SECTION */}
                <div className="col-span-1 border-2 border-green-300 rounded-lg overflow-hidden bg-green-50">
                  <div className="bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 font-semibold text-sm sm:text-base">
                    Main Disposition
                  </div>
                  <div className="p-3 sm:p-4">
                    <input
                      type="text"
                      placeholder="Search disposition..."
                      className="w-full px-3 py-2 mb-3 sm:mb-4 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-green-500"
                    />

                    <div className="space-y-2">
                      {['Prank Call', 'No Voice Call', 'Complete Call', 'Case Follow Up'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setCallerInfo({ ...callerInfo, disposition: option })}
                          className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs font-medium ${
                            callerInfo.disposition === option
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="w-full text-center px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300"
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          ) : (
            // After department selection - show full form with case nature
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
              <UnifiedForm
                formData={{
                  ...callerInfo,
                  ...departmentForms[primaryDepartment]
                }}
                onUpdate={handleFormUpdate}
                onCallerInfoUpdate={handleCallerInfoUpdate}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                activeTab={primaryDepartment}
                isMultiDepartment={secondaryDepartments.length > 0}
                departmentCount={1 + secondaryDepartments.length}
              />
            </div>
          )}

          {/* SECONDARY DEPARTMENTS MODALS - Centered fixed overlay with blur background */}
          {modalState.isOpen && (
            <div className="fixed inset-4  bg-opacity-50  backdrop-blur-[3px] z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <DepartmentModal
                  isOpen={modalState.isOpen}
                  department={modalState.department}
                  callerInfo={callerInfo}
                  formData={departmentForms[modalState.department] || {}}
                  onSave={handleSaveSecondaryDepartment}
                  onClose={closeModal}
                  activeTab={modalState.department}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
       
    