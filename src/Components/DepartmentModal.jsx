import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown, FiUser } from 'react-icons/fi';

const DepartmentModal = ({ 
  isOpen, 
  department, 
  callerInfo, 
  formData, 
  onSave, 
  onClose,
  activeTab 
}) => {
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [localFormData, setLocalFormData] = useState(formData || {});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');
  const [errors, setErrors] = useState({});
  const [searchPoliceStation, setSearchPoliceStation] = useState('');
  const [openPoliceStationDropdown, setOpenPoliceStationDropdown] = useState(false);

  // KPK Police Stations
  const kpkPoliceStations = [
    'Abbottabad City Police Station',
    'Abbottabad Cantonment Police Station',
    'Bannu City Police Station',
    'Bannu Cantonment Police Station',
    'Buner City Police Station',
    'Charsadda City Police Station',
    'Charsadda Cantonment Police Station',
    'Chitral City Police Station',
    'Dera Ismail Khan City Police Station',
    'Dera Ismail Khan Cantonment Police Station',
    'Hangu City Police Station',
    'Haripur City Police Station',
    'Kohat City Police Station',
    'Kohat Cantonment Police Station',
    'Mardan City Police Station',
    'Mardan Cantonment Police Station',
    'Nowshera City Police Station',
    'Nowshera Cantonment Police Station',
    'Peshawar City Police Station',
    'Peshawar Cantonment Police Station',
    'Peshawar Sadar Police Station',
    'Peshawar Pipal Mandi Police Station',
    'Sawat City Police Station',
    'Swabi City Police Station',
    'Swabi Cantonment Police Station',
    'Wazirabad Police Station',
  ];

  // Filter police stations based on search
  const filteredPoliceStations = kpkPoliceStations.filter(station =>
    station.toLowerCase().includes(searchPoliceStation.toLowerCase())
  );

  useEffect(() => {
    setLocalFormData(formData || {});
  }, [formData]);

  const departmentCaseNatures = {
    Police: {
      level1: [
        {
          name: 'Crime Against Person',
          level2: [
            { name: 'Assault', level3: ['Simple Assault', 'Aggravated Assault', 'Domestic Violence'] },
            { name: 'Robbery', level3: ['Street Robbery', 'Armed Robbery', 'Bank Robbery'] },
            { name: 'Murder', level3: ['Homicide', 'Manslaughter', 'Murder'] }
          ]
        },
        {
          name: 'Crime Against Property',
          level2: [
            { name: 'Theft', level3: ['Pickpocketing', 'Theft from Vehicle', 'Shoplifting'] },
            { name: 'Burglary', level3: ['Residential Burglary', 'Commercial Burglary', 'Warehouse Burglary'] },
            { name: 'Vehicle Theft', level3: ['Car Theft', 'Motorcycle Theft', 'Truck Theft'] }
          ]
        },
        {
          name: 'Crime Against Public Order',
          level2: [
            { name: 'Disorderly Conduct', level3: ['Public Intoxication', 'Fighting in Public', 'Disturbing Peace'] },
            { name: 'Drug Related', level3: ['Drug Possession', 'Drug Distribution', 'Drug Manufacturing'] },
            { name: 'Harassment / Threats', level3: ['Threatening Calls', 'Verbal Threats', 'Written Threats'] }
          ]
        },
        {
          name: 'Other Police Matters',
          level2: [
            { name: 'Traffic Violation', level3: ['Speeding', 'Running Red Light', 'Reckless Driving'] },
            { name: 'Lost & Found', level3: ['Lost Item Report', 'Found Property', 'Stolen Recovery'] },
            { name: 'Complaint', level3: ['Noise Complaint', 'Trespassing', 'Suspicious Activity'] }
          ]
        }
      ]
    },
    Rescue: {
      level1: [
        {
          name: 'Medical Emergencies',
          level2: [
            { name: 'Cardiac Issues', level3: ['Heart Attack', 'Chest Pain', 'Arrhythmia'] },
            { name: 'Unconscious', level3: ['Unconscious Person', 'Unresponsive', 'Loss of Consciousness'] },
            { name: 'Severe Injury', level3: ['Traumatic Injury', 'Bleeding', 'Choking'] }
          ]
        },
        {
          name: 'Accident & Rescue',
          level2: [
            { name: 'Traffic Collision', level3: ['Vehicle Crash', 'Multi-car Accident', 'Hit & Run'] },
            { name: 'Trapped Person', level3: ['Vehicle Entrapment', 'Building Collapse', 'Water Rescue'] },
            { name: 'Fall Injury', level3: ['Fall from Height', 'Ladder Fall', 'Ground Level Fall'] }
          ]
        },
        {
          name: 'Fire & Hazmat',
          level2: [
            { name: 'Fire', level3: ['Structure Fire', 'Vehicle Fire', 'Brush Fire'] },
            { name: 'Gas Leak', level3: ['Natural Gas Leak', 'Propane Leak', 'Chemical Leakage'] },
            { name: 'Hazmat', level3: ['Chemical Spill', 'Toxic Fumes', 'Biological Hazard'] }
          ]
        }
      ]
    },
    PDMA: {
      level1: [
        {
          name: 'Natural Disasters',
          level2: [
            { name: 'Earthquake', level3: ['Minor Quake', 'Strong Quake', 'Aftershake'] },
            { name: 'Flood', level3: ['Flash Flood', 'River Flood', 'Urban Flooding'] },
            { name: 'Severe Weather', level3: ['Hurricane / Cyclone', 'Landslide', 'Tsunami'] }
          ]
        },
        {
          name: 'Disaster Response',
          level2: [
            { name: 'Shelter Management', level3: ['Camp Setup', 'Food Distribution', 'Medical Aid'] },
            { name: 'Search & Rescue', level3: ['Missing Persons', 'Trapped People', 'Recovery'] },
            { name: 'Damage Assessment', level3: ['Infrastructure Damage', 'Casualty Count', 'Resource Needs'] }
          ]
        }
      ]
    },
    NHMA: {
      level1: [
        {
          name: 'Health Services',
          level2: [
            { name: 'Epidemics', level3: ['Disease Outbreak', 'Quarantine Setup', 'Testing'] },
            { name: 'Medical Supply', level3: ['Medicine Distribution', 'Equipment Supply', 'Vaccination'] },
            { name: 'Health Camp', level3: ['Free Checkup', 'Health Education', 'Referral'] }
          ]
        }
      ]
    },
    Bolo: {
      level1: [
        {
          name: 'Missing Persons',
          level2: [
            { name: 'Child Missing', level3: ['Kidnapping', 'Lost Child', 'Runaway'] },
            { name: 'Adult Missing', level3: ['Wandering Elder', 'Lost Adult', 'Voluntary Missing'] },
            { name: 'Wanted Criminal', level3: ['Fugitive', 'Absconding', 'Escape'] }
          ]
        },
        {
          name: 'Alert Notices',
          level2: [
            { name: 'Red Alert', level3: ['High Risk Missing', 'Dangerous Crime', 'Immediate Threat'] },
            { name: 'Yellow Alert', level3: ['General Missing', 'Public Search', 'Community Alert'] },
            { name: 'Green Alert', level3: ['Located Safe', 'Found Alive', 'Resolved'] }
          ]
        }
      ]
    }
  };

  if (!isOpen) return null;

  const deptData = departmentCaseNatures[department] || departmentCaseNatures.Police;

  const handleChangeField = (fieldName, value) => {
    setLocalFormData({ ...localFormData, [fieldName]: value });
  };

  // Find category path when level 3 is selected
  const findCategoryPath = (selectedValue) => {
    for (let i = 0; i < deptData.level1.length; i++) {
      const level1 = deptData.level1[i];
      for (let j = 0; j < level1.level2.length; j++) {
        const level2 = level1.level2[j];
        if (level2.level3.includes(selectedValue)) {
          return { l1Idx: i, l2Idx: j, l1Name: level1.name, l2Name: level2.name };
        }
      }
    }
    return null;
  };

  // Filter level 1 options based on search query 1 only
  const filteredLevel1 = deptData.level1.filter(item =>
    item.name.toLowerCase().includes(searchQuery1.toLowerCase())
  );

  // Get level 2 options based on selected level 1
  const level2Options = selectedLevel1 !== null ? deptData.level1[selectedLevel1].level2 : [];
  
  // Filter level 2 options based on search query 2 only
  const filteredLevel2 = level2Options.filter(item =>
    item.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  // Get level 3 options based on selected level 2
  const level3Options = (selectedLevel1 !== null && selectedLevel2 !== null) ? 
    deptData.level1[selectedLevel1].level2[selectedLevel2].level3 : [];
  
  // Filter level 3 options based on search query 3 only
  const filteredLevel3 = level3Options.filter(item =>
    item.toLowerCase().includes(searchQuery3.toLowerCase())
  );

  // Get all level 3 options from all categories (for direct selection)
  const getAllLevel3Options = () => {
    const allLevel3 = [];
    deptData.level1.forEach((l1) => {
      l1.level2.forEach((l2) => {
        l2.level3.forEach((l3) => {
          allLevel3.push(l3);
        });
      });
    });
    return allLevel3;
  };

  const allLevel3Options = getAllLevel3Options();
  const filteredAllLevel3 = allLevel3Options.filter(item =>
    item.toLowerCase().includes(searchQuery3.toLowerCase())
  );

  const handleSave = () => {
    const newErrors = {};

    // Validate Case Nature Level 3 (required)
    if (!localFormData.caseNature3 || localFormData.caseNature3.trim() === '') {
      newErrors.caseNature3 = 'Case Nature (Level 3) is required';
    }

    // Validate Description (required)
    if (!localFormData.description || localFormData.description.trim() === '') {
      newErrors.description = 'Description/Comment is required';
    }

    // Validate Disposition (required)
    if (!localFormData.disposition || localFormData.disposition.trim() === '') {
      newErrors.disposition = 'Disposition is required';
    }

    setErrors(newErrors);

    // Only save if no errors
    if (Object.keys(newErrors).length === 0) {
      onSave(localFormData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200 w-full">
      {/* Modal Header - Green */}
      <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          ✓ {department} Department
        </h2>
        <button
          onClick={onClose}
          className="hover:bg-green-700 p-1 rounded transition text-lg"
        >
          ✕
        </button>
      </div>

      {/* Modal Body - Scrollable */}
      <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {/* Caller Info Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-3 text-sm flex items-center gap-2">
            <FiUser size={20} className="text-blue-600" />
             Caller Information (Auto-filled)
          </h3>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Name:</span> {callerInfo?.callerName || 'Not provided'}</p>
            <p><span className="font-semibold">Phone:</span> {callerInfo?.callerNumber || 'Not provided'}</p>
            <p><span className="font-semibold">District:</span> {callerInfo?.district || 'Not provided'}</p>
            <p><span className="font-semibold">Address:</span> {callerInfo?.address || 'Not provided'}</p>
          </div>
        </div>

        

        {/* Case Nature Section */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            Case Nature
          </h3>

          {/* Case Nature Selection - 3 Dropdown Boxes */}
          <div className="grid grid-cols-3 gap-2">
            {/* Case Nature 1 Dropdown */}
            <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel1 !== null ? 'border-blue-500 shadow-md' : 'border-slate-300'}`}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
                className={`w-full px-3 py-2 text-xs font-semibold hover:bg-blue-700 transition flex items-center justify-between ${
                  selectedLevel1 !== null
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <span className="truncate text-xs">
                  {selectedLevel1 !== null ? (
                    <span className="font-bold">✓ {deptData.level1[selectedLevel1].name}</span>
                  ) : (
                    'Level 1'
                  )}
                </span>
                <FiChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-1 ${openDropdown === 1 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 1 && (
                <div className="p-2 bg-white border-t border-slate-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery1}
                    onChange={(e) => setSearchQuery1(e.target.value)}
                    className="w-full px-2 py-1 mb-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-blue-400"
                  />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {filteredLevel1.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedLevel1(index);
                          setSelectedLevel2(null);
                          setSearchQuery1('');
                          setSearchQuery2('');
                          setSearchQuery3('');
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2 py-1 rounded border text-xs transition ${
                          selectedLevel1 === index
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedLevel1 === index && '✓ '}{item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Case Nature 2 Dropdown */}
            <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel2 !== null ? 'border-orange-500 shadow-md' : selectedLevel1 !== null ? 'border-slate-300' : 'border-slate-300'}`}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
                className={`w-full px-3 py-2 text-xs font-semibold transition flex items-center justify-between ${
                  selectedLevel2 !== null
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : selectedLevel1 !== null
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                <span className="truncate text-xs">
                  {selectedLevel2 !== null ? (
                    <span className="font-bold">✓ {level2Options[selectedLevel2].name}</span>
                  ) : selectedLevel1 !== null ? (
                    'Level 2'
                  ) : (
                    'Level 2'
                  )}
                </span>
                <FiChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-1 ${openDropdown === 2 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 2 && selectedLevel1 !== null && (
                <div className="p-2 bg-white border-t border-slate-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery2}
                    onChange={(e) => setSearchQuery2(e.target.value)}
                    className="w-full px-2 py-1 mb-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-orange-400"
                  />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {filteredLevel2.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedLevel2(index);
                          setSearchQuery2('');
                          setSearchQuery3('');
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2 py-1 rounded border text-xs transition ${
                          selectedLevel2 === index
                            ? 'bg-orange-600 text-white border-orange-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-orange-400'
                        }`}
                      >
                        {selectedLevel2 === index && '✓ '}{item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Case Nature 3 Dropdown */}
            <div className={`border-2 rounded-lg overflow-hidden ${localFormData.caseNature3 ? 'border-green-500 shadow-md' : 'border-slate-300'}`}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 3 ? null : 3)}
                className={`w-full px-3 py-2 text-xs font-semibold transition flex items-center justify-between ${
                  localFormData.caseNature3
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <span className="truncate text-xs">
                  {localFormData.caseNature3 ? (
                    <span className="font-bold">✓ {localFormData.caseNature3}</span>
                  ) : (
                    'Level 3'
                  )}
                </span>
                <FiChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-1 ${openDropdown === 3 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 3 && (
                <div className="p-2 bg-white border-t border-slate-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery3}
                    onChange={(e) => setSearchQuery3(e.target.value)}
                    className="w-full px-2 py-1 mb-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-green-400"
                  />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {filteredAllLevel3.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          const path = findCategoryPath(option);
                          if (path) {
                            setSelectedLevel1(path.l1Idx);
                            setSelectedLevel2(path.l2Idx);
                          }
                          handleChangeField('caseNature3', option);
                          if (errors.caseNature3) {
                            const newErrors = { ...errors };
                            delete newErrors.caseNature3;
                            setErrors(newErrors);
                          }
                          setSearchQuery3('');
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2 py-1 rounded border text-xs transition ${
                          localFormData.caseNature3 === option
                            ? 'bg-green-600 text-white border-green-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
                        }`}
                      >
                        {localFormData.caseNature3 === option && '✓ '}{option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Value Display - Full Hierarchy Path */}
          {localFormData.caseNature3 && (
            <div className="mt-2 p-2 bg-green-50 border border-green-400 rounded shadow-sm">
              <p className="text-xs mb-1">
                <span className="font-bold text-green-800">✓ Case Nature Selected:</span>
              </p>
              <div className="space-y-0.5 text-xs">
                <p className="text-slate-700">
                  <span className="inline-block bg-blue-100 px-1.5 py-0.5 rounded font-semibold text-blue-800 text-xs">L1:</span>
                  <span className="ml-1 font-bold text-blue-700">{selectedLevel1 !== null && deptData.level1[selectedLevel1].name}</span>
                </p>
                <p className="text-slate-700">
                  <span className="inline-block bg-orange-100 px-1.5 py-0.5 rounded font-semibold text-orange-800 text-xs">L2:</span>
                  <span className="ml-1 font-bold text-orange-700">{selectedLevel2 !== null && level2Options[selectedLevel2].name}</span>
                </p>
                <p className="text-slate-700">
                  <span className="inline-block bg-green-100 px-1.5 py-0.5 rounded font-semibold text-green-800 text-xs">L3:</span>
                  <span className="ml-1 font-bold text-green-700">{localFormData.caseNature3}</span>
                </p>
              </div>
            </div>
          )}
          {errors.caseNature3 && (
            <p className="text-xs text-red-600 font-semibold mt-1">⚠️ {errors.caseNature3}</p>
          )}


          {/* Police Station - Police Department Only */}
        {department === 'Police' && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <label className="block text-xs font-semibold text-slate-700 mb-2">Police Station</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenPoliceStationDropdown(!openPoliceStationDropdown)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 hover:border-blue-400 transition bg-white text-left flex items-center justify-between"
              >
                <span className="truncate">
                  {localFormData.policeStation ? (
                    <span className="font-medium text-slate-800">✓ {localFormData.policeStation}</span>
                  ) : (
                    <span className="text-slate-500">Select a police station</span>
                  )}
                </span>
                <FiChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openPoliceStationDropdown ? 'rotate-180' : ''}`}
                />
              </button>
              
              {openPoliceStationDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg">
                  <input
                    type="text"
                    placeholder="Search station..."
                    value={searchPoliceStation}
                    onChange={(e) => setSearchPoliceStation(e.target.value)}
                    className="w-full px-3 py-2 border-b border-slate-300 rounded-t-lg text-xs focus:outline-none focus:border-blue-400"
                    autoFocus
                  />
                  <div className="max-h-48 overflow-y-auto">
                    {filteredPoliceStations.length > 0 ? (
                      filteredPoliceStations.map((station) => (
                        <button
                          key={station}
                          type="button"
                          onClick={() => {
                            handleChangeField('policeStation', station);
                            setOpenPoliceStationDropdown(false);
                            setSearchPoliceStation('');
                          }}
                          className={`w-full text-left px-3 py-2 border-b border-slate-200 hover:bg-blue-50 transition text-xs ${
                            localFormData.policeStation === station
                              ? 'bg-blue-100 text-blue-900 font-semibold'
                              : 'text-slate-700'
                          }`}
                        >
                          {localFormData.policeStation === station && '✓ '}{station}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-slate-500 text-center">
                        No police stations found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
          

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Comment *</label>
            <textarea
              value={localFormData.description || ''}
              onChange={(e) => {
                handleChangeField('description', e.target.value);
                if (errors.description) {
                  const newErrors = { ...errors };
                  delete newErrors.description;
                  setErrors(newErrors);
                }
              }}
              placeholder="Brief description (required)"
              rows="2"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition text-xs ${
                errors.description
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-slate-300 focus:border-green-600 hover:border-green-400'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 font-semibold mt-1">⚠️ {errors.description}</p>
            )}
          </div>

          {/* Disposition */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Disposition *</label>
            <select
              value={localFormData.disposition || ''}
              onChange={(e) => {
                handleChangeField('disposition', e.target.value);
                if (errors.disposition) {
                  const newErrors = { ...errors };
                  delete newErrors.disposition;
                  setErrors(newErrors);
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition text-xs bg-white ${
                errors.disposition
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-slate-300 focus:border-green-600 hover:border-green-400'
              }`}
            >
              <option value="">Select Disposition (required)</option>
              <option value="Prank Call">Prank Call</option>
              <option value="No Voice">No Voice</option>
              <option value="Complete Call">Complete Call</option>
              <option value="Case Follow Up">Case Follow Up</option>
              <option value="Abusive Call">Abusive Call</option>
              <option value="Call Drop">Call Drop</option>
              <option value="Distortion Call">Distortion Call</option>
              <option value="Test Call">Test Call</option>
              <option value="Information Call">Information Call</option>
              <option value="Other Helpline Related Info">Other Helpline Related Info</option>
              <option value="Scheduled Call Back">Scheduled Call Back</option>
              <option value="Transfer Call">Transfer Call</option>
            </select>
            {errors.disposition && (
              <p className="text-xs text-red-600 font-semibold mt-1">⚠️ {errors.disposition}</p>
            )}
            {localFormData.disposition && !errors.disposition && (
              <div className="mt-1 p-1.5 bg-green-100 border-l-2 border-green-600 text-xs text-green-700 font-medium">
                ✓ {localFormData.disposition}
              </div>
            )}
          </div>

          {/* Suspect Detail - Police & NHMA Only */}
          {(department === 'Police' || department === 'NHMA') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Suspect Detail</label>
              <input
                type="number"
                value={localFormData.suspectDetail || ''}
                onChange={(e) => handleChangeField('suspectDetail', e.target.value)}
                placeholder="Enter suspect detail number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 hover:border-blue-400 transition text-xs"
              />
            </div>
          )}

          {/* Victim Number - PDMA & Rescue Only */}
          {(department === 'PDMA' || department === 'Rescue') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Victim Number</label>
              <input
                type="number"
                value={localFormData.victimNumber || ''}
                onChange={(e) => handleChangeField('victimNumber', e.target.value)}
                placeholder="Enter victim number"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 hover:border-blue-400 transition text-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="bg-gray-50 px-6 py-3 flex flex-col gap-3 border-t border-gray-200">
        {/* Validation Message */}
        {Object.keys(errors).length > 0 && (
          <div className="p-2 bg-red-100 border-l-4 border-red-600 rounded">
            <p className="text-xs font-semibold text-red-700">
              ⚠️ Please fill all required fields to save details
            </p>
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={Object.keys(errors).length > 0}
            className={`flex-1 font-semibold py-2 px-4 rounded-lg transition text-sm ${
              Object.keys(errors).length > 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            ✓ Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
