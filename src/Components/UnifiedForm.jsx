import React, { useState } from 'react';
import { FiUser, FiPhone, FiMapPin, FiAlertTriangle, FiCheckCircle, FiAlertCircle, FiChevronDown } from 'react-icons/fi';

const UnifiedForm = ({ formData, onUpdate, onSubmit, isLoading = false, activeTab = 'Police' }) => {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchDisposition, setSearchDisposition] = useState('');
  const [showAllDispositions, setShowAllDispositions] = useState(false);

  // KPK Districts
  const kpkDistricts = [
    'Abbottabad',
    'Bannu',
    'Buner',
    'Charsadda',
    'Chitral',
    'Dera Ismail Khan',
    'Hangu',
    'Haripur',
    'Kohat',
    'Kohistan',
    'Lakki Marwat',
    'Lower Dir',
    'Malakand',
    'Mansehra',
    'Mardan',
    'Nowshera',
    'Peshawar',
    'Sawat',
    'Shangla',
    'Swabi',
    'Tangi',
    'Upper Dir',
  ];

  // All Disposition Options
  const allDispositionOptions = [
    'Abusive Call',
    'Call Drop',
    'Case Follow Up',
    'Complete Call',
    'Distortion Call',
    'Test Call',
    'Information Call',
    'No Voice',
    'Other Helpline Related Info',
    'Prank Call',
    'Scheduled Call Back',
    'Transfer Call'
  ];

  // Filter dispositions based on search
  const filteredDispositions = allDispositionOptions.filter(disp =>
    disp.toLowerCase().includes(searchDisposition.toLowerCase())
  );

  // Show only 4 dispositions by default, or all if showAllDispositions is true
  const displayedDispositions = showAllDispositions ? filteredDispositions : filteredDispositions.slice(0, 4);

  // Hierarchical Department-Specific Case Nature Categories
  const departmentCaseNatures = {
    Police: {
      level1: [
        {
          name: 'Crime Against Property',
          level2: [ 
            {
              name: 'Theft',
              level3: ['Pickpocketing', 'Mobile Theft', 'Purse / Wallet Theft']
            },
            {
              name: 'Robbery',
              level3: ['Armed Robbery', 'Street Robbery', 'Store Robbery']
            },
            {
              name: 'Burglary',
              level3: ['Break-in', 'Breaking & Entering', 'Burglary Tools Found']
            }
          ]
        },
        {
          name: 'Violent & Personal Crimes',
          level2: [
            {
              name: 'Assault / Violence',
              level3: ['Simple Assault', 'Aggravated Assault', 'Battery']
            },
            {
              name: 'Domestic Violence',
              level3: ['Domestic Abuse', 'Family Violence', 'Spouse Abuse']
            },
            {
              name: 'Harassment / Threats',
              level3: ['Threatening Calls', 'Verbal Threats', 'Written Threats']
            }
          ]
        },
        {
          name: 'Other Police Matters',
          level2: [
            {
              name: 'Traffic Violation',
              level3: ['Speeding', 'Running Red Light', 'Reckless Driving']
            },
            {
              name: 'Lost & Found',
              level3: ['Lost Item Report', 'Found Property', 'Stolen Recovery']
            },
            {
              name: 'Complaint',
              level3: ['Noise Complaint', 'Trespassing', 'Suspicious Activity']
            }
          ]
        }
      ]
    },
    Rescue: {
      level1: [
        {
          name: 'Medical Emergencies',
          level2: [
            {
              name: 'Cardiac Issues',
              level3: ['Heart Attack', 'Chest Pain', 'Arrhythmia']
            },
            {
              name: 'Unconscious',
              level3: ['Unconscious Person', 'Unresponsive', 'Loss of Consciousness']
            },
            {
              name: 'Severe Injury',
              level3: ['Traumatic Injury', 'Bleeding', 'Choking']
            }
          ]
        },
        {
          name: 'Accident & Rescue',
          level2: [
            {
              name: 'Traffic Collision',
              level3: ['Vehicle Crash', 'Multi-car Accident', 'Hit & Run']
            },
            {
              name: 'Trapped Person',
              level3: ['Vehicle Entrapment', 'Building Collapse', 'Water Rescue']
            },
            {
              name: 'Fall Injury',
              level3: ['Fall from Height', 'Ladder Fall', 'Ground Level Fall']
            }
          ]
        },
        {
          name: 'Fire & Hazmat',
          level2: [
            {
              name: 'Fire',
              level3: ['Structure Fire', 'Vehicle Fire', 'Brush Fire']
            },
            {
              name: 'Gas Leak',
              level3: ['Natural Gas Leak', 'Propane Leak', 'Chemical Leakage']
            },
            {
              name: 'Hazmat',
              level3: ['Chemical Spill', 'Toxic Fumes', 'Biological Hazard']
            }
          ]
        }
      ]
    },
    PDMA: {
      level1: [
        {
          name: 'Natural Disasters',
          level2: [
            {
              name: 'Earthquake',
              level3: ['Minor Quake', 'Strong Quake', 'Aftershock']
            },
            {
              name: 'Flood',
              level3: ['Flash Flood', 'River Flood', 'Urban Flooding']
            },
            {
              name: 'Severe Weather',
              level3: ['Hurricane / Cyclone', 'Landslide', 'Tsunami']
            }
          ]
        },
        {
          name: 'Disaster Response',
          level2: [
            {
              name: 'Evacuation',
              level3: ['Evacuation Required', 'Shelter Needed', 'Supplies Distribution']
            },
            {
              name: 'Rescue Operations',
              level3: ['Search & Rescue', 'Missing Persons', 'Trapped Persons']
            },
            {
              name: 'Recovery',
              level3: ['Body Recovery', 'Infrastructure Assessment', 'Debris Removal']
            }
          ]
        },
        {
          name: 'Disaster Management',
          level2: [
            {
              name: 'Assessment',
              level3: ['Damage Assessment', 'Needs Assessment', 'Impact Report']
            },
            {
              name: 'Support',
              level3: ['Rehabilitation Support', 'Public Health Alert', 'Relief Operation']
            },
            {
              name: 'Coordination',
              level3: ['Inter-agency Coordination', 'Resource Distribution', 'Aid Distribution']
            }
          ]
        }
      ]
    },
    NHMA: {
      level1: [
        {
          name: 'Home Security',
          level2: [
            {
              name: 'Break-in',
              level3: ['Break-in / Burglary', 'Unauthorized Entry', 'Forced Entry']
            },
            {
              name: 'Damage',
              level3: ['Broken Lock / Door', 'Window Damage', 'Property Damage']
            },
            {
              name: 'Safety',
              level3: ['Security Concern', 'Alarm Activation', 'Suspicious Activity']
            }
          ]
        },
        {
          name: 'Home Maintenance',
          level2: [
            {
              name: 'Utilities',
              level3: ['Gas Leak', 'Water Leak', 'Electrical Problem']
            },
            {
              name: 'Structure',
              level3: ['Structural Damage', 'Roof Damage', 'Foundation Issue']
            },
            {
              name: 'Safety',
              level3: ['Smoke / Fire Hazard', 'Unsafe Conditions', 'Pest Infestation']
            }
          ]
        },
        {
          name: 'Housing Support',
          level2: [
            {
              name: 'Emergency',
              level3: ['Emergency Shelter', 'Immediate Housing', 'Temporary Accommodation']
            },
            {
              name: 'Inspection',
              level3: ['Property Inspection', 'Habitability Check', 'Compliance Check']
            },
            {
              name: 'Services',
              level3: ['Repair Coordination', 'Housing Check', 'Welfare Check']
            }
          ]
        }
      ]
    },
    Bolo: {
      level1: [
        {
          name: 'Missing Persons',
          level2: [
            {
              name: 'Adult Missing',
              level3: ['Missing Adult', 'Missing Senior', 'Missing Mentally Ill']
            },
            {
              name: 'Child Missing',
              level3: ['Missing Child', 'Missing Adolescent', 'Abducted Child']
            },
            {
              name: 'Vulnerable',
              level3: ['Missing Elder', 'Missing Disabled', 'Endangered Person']
            }
          ]
        },
        {
          name: 'Wanted / Fugitive',
          level2: [
            {
              name: 'Criminal',
              level3: ['Wanted Criminal', 'Fugitive Alert', 'Absconded Convict']
            },
            {
              name: 'International',
              level3: ['INTERPOL Alert', 'International Fugitive', 'Cross-border Criminal']
            },
            {
              name: 'Suspect',
              level3: ['Murder Suspect', 'Rape Suspect', 'Armed & Dangerous']
            }
          ]
        },
        {
          name: 'Alert Coordination',
          level2: [
            {
              name: 'Child Alert',
              level3: ['AMBER Alert', 'Child Abduction Alert', 'Child Endangerment']
            },
            {
              name: 'Senior Alert',
              level3: ['Silver Alert', 'Elder Missing', 'Senior Endangerment']
            },
            {
              name: 'Other Alert',
              level3: ['Blue Alert', 'Broadcast Coordination', 'Public Safety Alert']
            }
          ]
        }
      ]
    }
  };

  // Get case nature categories based on active tab
  const caseNatureData = departmentCaseNatures[activeTab] || departmentCaseNatures.Police;
  
  // Filter level 1 options based on search query 1 only
  const filteredLevel1 = caseNatureData.level1.filter(item =>
    item.name.toLowerCase().includes(searchQuery1.toLowerCase())
  );

  // Get level 2 options based on selected level 1
  const level2Options = selectedLevel1 !== null ? caseNatureData.level1[selectedLevel1].level2 : [];
  
  // Filter level 2 options based on search query 2 only
  const filteredLevel2 = level2Options.filter(item =>
    item.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  // Get level 3 options based on selected level 2
  const level3Options = (selectedLevel1 !== null && selectedLevel2 !== null) ? 
    caseNatureData.level1[selectedLevel1].level2[selectedLevel2].level3 : [];
  
  // Filter level 3 options based on search query 3 only
  const filteredLevel3 = level3Options.filter(item =>
    item.toLowerCase().includes(searchQuery3.toLowerCase())
  );

  const dispositionOptions = [
    'Abusive Call',
    'Call Drop',
    'Case Follow Up',
    'Complete Call',
    'Distortion Call',
    'Test Call',
    'Information Call',
    'No Voice',
    'Other Helpline Related Info',
    'Prank Call',
    'Scheduled Call Back',
    'Transfer Call'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSelectChange = (fieldName, value) => {
    onUpdate({ ...formData, [fieldName]: value });
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Caller Info Validation
    if (!formData.callerName?.trim()) {
      newErrors.callerName = 'Caller name is required';
    }

    if (!formData.callerNumber?.trim()) {
      newErrors.callerNumber = 'Phone number is required';
    } else if (!/^\d{7,}$/.test(formData.callerNumber.replace(/\D/g, ''))) {
      newErrors.callerNumber = 'Please enter a valid phone number';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.nearestLocation?.trim()) {
      newErrors.nearestLocation = 'Nearest location is required';
    }

    if (!formData.district) {
      newErrors.district = 'Please select a district';
    }

    // Case Nature Validation
    if (!formData.caseNature) {
      newErrors.caseNature = 'Please select a case nature';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Please provide a description of the incident';
    }

    // Disposition Validation
    if (!formData.disposition) {
      newErrors.disposition = 'Please select a disposition';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      onSubmit();
    }
  };

  const fieldClass = (fieldName) => `
    w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200
    ${errors[fieldName]
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
    }
  `;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
        <div className="mb-4 sm:mb-6 p-6 sm:p-8 bg-green-100 rounded-full">
          <FiCheckCircle size={48} className="text-green-600 sm:w-16 sm:h-16" />
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mb-2">Form Submitted Successfully!</h2>
        <p className="text-xs sm:text-base text-slate-600 mb-4">The incident report has been recorded.</p>
        <div className="bg-slate-100 rounded-lg p-4 sm:p-6 w-full max-w-md text-left">
          <p className="text-xs sm:text-sm text-slate-600 mb-2">
            <span className="font-semibold">Ticket ID:</span> <span className="break-all">911-{Date.now().toString().slice(-8)}</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mb-2">
            <span className="font-semibold">Caller:</span> <span className="break-words">{formData.callerName}</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mb-2">
            <span className="font-semibold">Case Type:</span> <span className="break-words">{formData.caseNature}</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            <span className="font-semibold">Disposition:</span> <span className="break-words">{formData.disposition}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* ==================== TOP SECTION: CALLER INFO + DISPOSITION ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* LEFT: CALLER INFORMATION (2 columns) */}
        <div className="col-span-1 lg:col-span-2 border-t-4 border-blue-600 pt-4 sm:pt-6">
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
            <FiUser size={20} className="text-blue-600" />
            <span>Caller Information</span>
          </h3>

          {/* Row 1: Name, Phone, Alt Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Caller Name *
              </label>
              <input
                type="text"
                name="callerName"
                value={formData.callerName || ''}
                onChange={handleChange}
                placeholder="Full name"
                className={fieldClass('callerName')}
                disabled={isLoading}
              />
              {errors.callerName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle size={14} /> {errors.callerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="callerNumber"
                value={formData.callerNumber || ''}
                onChange={handleChange}
                placeholder="Phone number"
                className={fieldClass('callerNumber')}
                disabled={isLoading}
              />
              {errors.callerNumber && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle size={14} /> {errors.callerNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Alternative Number
              </label>
              <input
                type="tel"
                name="alternativeNumber"
                value={formData.alternativeNumber || ''}
                onChange={handleChange}
                placeholder="Alt phone"
                className={fieldClass('alternativeNumber')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Row 2: KPK District, Auto Location Fetch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                District of KPK *
              </label>
              <select
                name="district"
                value={formData.district || ''}
                onChange={handleChange}
                className={fieldClass('district')}
                disabled={isLoading}
              >
                <option value="">Select District</option>
                {kpkDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle size={14} /> {errors.district}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Auto-Fetch Location
              </label>
              <button
                type="button"
                onClick={() => {
                  const location = 'GPS Coordinates: Latitude, Longitude';
                  onUpdate({ ...formData, nearestLocation: location });
                }}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
              >
                📍 Fetch Location
              </button>
            </div>
          </div>

          {/* Row 3: Address, Nearest Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Complete address"
                rows="3"
                className={fieldClass('address')}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle size={14} /> {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Nearest Location/Landmark *
              </label>
              <textarea
                name="nearestLocation"
                value={formData.nearestLocation || ''}
                onChange={handleChange}
                placeholder="e.g., Near City Hospital"
                rows="3"
                className={fieldClass('nearestLocation')}
                disabled={isLoading}
              />
              {errors.nearestLocation && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle size={14} /> {errors.nearestLocation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: DISPOSITION SECTION */}
        <div className="col-span-1 border-2 border-green-300 rounded-lg overflow-hidden bg-green-50">
          <div className="bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 font-semibold text-sm sm:text-base">
            Main Disposition
          </div>
          <div className="p-3 sm:p-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search disposition..."
              value={searchDisposition}
              onChange={(e) => setSearchDisposition(e.target.value)}
              className="w-full px-3 py-2 mb-3 sm:mb-4 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-green-500"
            />

            {/* Dispositions List */}
            <div className={`space-y-2 ${showAllDispositions ? 'max-h-96 overflow-y-auto' : ''}`}>
              {displayedDispositions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectChange('disposition', option)}
                  className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs font-medium ${
                    formData.disposition === option
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* See More Button */}
            {filteredDispositions.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllDispositions(!showAllDispositions)}
                className="w-full mt-2 sm:mt-3 px-3 py-2 bg-slate-300 hover:bg-slate-400 text-slate-700 font-semibold rounded-lg transition text-xs sm:text-sm"
              >
                {showAllDispositions ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* End Top Section */}

      {/* ==================== CASE NATURE SECTION ==================== */}
      {activeTab && (
        <div className="border-t-4 border-orange-600 pt-4 sm:pt-6">
        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
          <FiAlertTriangle size={20} className="text-orange-600" />
          <span>Case Nature & Details</span>
        </h3>

        {/* Case Nature Selection - 3 Dropdown Boxes */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-3 sm:mb-4">
            Select Case Nature *
          </label>
          
          {/* 3 Dropdown Sections in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Case Nature 1 Dropdown */}
            <div className="border-2 border-slate-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-between"
              >
                <span className="truncate">{selectedLevel1 !== null ? caseNatureData.level1[selectedLevel1].name : 'Case Nature 1'}</span>
                <FiChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 1 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 1 && (
                <div className="p-3 sm:p-4 bg-white">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery1}
                    onChange={(e) => setSearchQuery1(e.target.value)}
                    className="w-full px-3 py-2 mb-2 sm:mb-3 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-400"
                  />
                  <div className="space-y-2 max-h-64 overflow-y-auto">
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
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs sm:text-sm font-medium ${
                          selectedLevel1 === index
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Case Nature 2 Dropdown */}
            <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel1 !== null ? 'border-slate-300' : 'border-slate-200 opacity-50'}`}>
              <button
                type="button"
                onClick={() => selectedLevel1 !== null && setOpenDropdown(openDropdown === 2 ? null : 2)}
                disabled={selectedLevel1 === null}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-between"
              >
                <span className="truncate">{selectedLevel2 !== null ? level2Options[selectedLevel2].name : 'Case Nature 2'}</span>
                <FiChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 2 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 2 && selectedLevel1 !== null && (
                <div className="p-3 sm:p-4 bg-white">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery2}
                    onChange={(e) => setSearchQuery2(e.target.value)}
                    className="w-full px-3 py-2 mb-2 sm:mb-3 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-orange-400"
                  />
                  <div className="space-y-2 max-h-64 overflow-y-auto">
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
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs sm:text-sm font-medium ${
                          selectedLevel2 === index
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-orange-400'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Case Nature 3 Dropdown */}
            <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel1 !== null && selectedLevel2 !== null ? 'border-slate-300' : 'border-slate-200 opacity-50'}`}>
              <button
                type="button"
                onClick={() => (selectedLevel1 !== null && selectedLevel2 !== null) && setOpenDropdown(openDropdown === 3 ? null : 3)}
                disabled={selectedLevel1 === null || selectedLevel2 === null}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-between"
              >
                <span className="truncate">{formData.caseNature ? formData.caseNature : 'Case Nature 3'}</span>
                <FiChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 3 ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 3 && selectedLevel1 !== null && selectedLevel2 !== null && (
                <div className="p-3 sm:p-4 bg-white">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery3}
                    onChange={(e) => setSearchQuery3(e.target.value)}
                    className="w-full px-3 py-2 mb-2 sm:mb-3 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-green-400"
                  />
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredLevel3.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleSelectChange('caseNature', option);
                          setSearchQuery3('');
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs sm:text-sm font-medium ${
                          formData.caseNature === option
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Value Display */}
          {formData.caseNature && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">Selected: </span>
                <span className="text-green-700 font-semibold">{formData.caseNature}</span>
              </p>
            </div>
          )}

          {errors.caseNature && (
            <p className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm text-red-600">
              <FiAlertCircle size={14} /> {errors.caseNature}
            </p>
          )}
        </div>

        {/* Incident Description */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Comment *
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Detailed description of the incident..."
            rows="4"
            className={fieldClass('description')}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <FiAlertCircle size={14} /> {errors.description}
            </p>
          )}
        </div>
        </div>
      )}
      {/* End Case Nature Section */}

      {/* Summary Section */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-6">
        <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Incident Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-xs sm:text-sm text-slate-700">
          <div>
            <p><span className="font-semibold">Caller:</span> {formData.callerName || 'N/A'}</p>
            <p><span className="font-semibold">Phone:</span> {formData.callerNumber || 'N/A'}</p>
            <p><span className="font-semibold">Location:</span> {formData.address || 'N/A'}</p>
          </div>
          <div>
            <p><span className="font-semibold">Case Type:</span> {formData.caseNature || 'N/A'}</p>
            <p><span className="font-semibold">Disposition:</span> {formData.disposition || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-4 px-4 sm:px-8 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isLoading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
    
  );
};

export default UnifiedForm;
