import React, { useState } from 'react';
import { FiAlertTriangle, FiAlertCircle, FiChevronDown } from 'react-icons/fi';

const CaseNatureForm = ({ formData, onUpdate, onNext, onPrevious, isLoading = false, activeTab = 'Police' }) => {
  const [errors, setErrors] = useState({});
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');

  // Hierarchical Department-Specific Case Nature Categories (same as UnifiedForm)
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

  // Get case nature data based on active tab
  const caseNatureData = departmentCaseNatures[activeTab] || departmentCaseNatures.Police;

  // Filter level 1 options
  const filteredLevel1 = caseNatureData.level1.filter(item =>
    item.name.toLowerCase().includes(searchQuery1.toLowerCase())
  );

  // Get level 2 options based on selected level 1
  const level2Options = selectedLevel1 !== null ? caseNatureData.level1[selectedLevel1].level2 : [];

  // Filter level 2 options
  const filteredLevel2 = level2Options.filter(item =>
    item.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  // Get all level 3 options from all categories (for direct selection)
  const getAllLevel3Options = () => {
    const allLevel3 = [];
    caseNatureData.level1.forEach((l1) => {
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

  // Find which level 1 and 2 a level 3 selection corresponds to (for reverse mapping)
  const findCategoryPath = (selectedValue) => {
    for (let l1Idx = 0; l1Idx < caseNatureData.level1.length; l1Idx++) {
      for (let l2Idx = 0; l2Idx < caseNatureData.level1[l1Idx].level2.length; l2Idx++) {
        if (caseNatureData.level1[l1Idx].level2[l2Idx].level3.includes(selectedValue)) {
          return { l1Idx, l2Idx };
        }
      }
    }
    return null;
  };

  const handleCaseNatureSelect = (value) => {
    // Find the path for this case nature
    const path = findCategoryPath(value);
    if (path) {
      setSelectedLevel1(path.l1Idx);
      setSelectedLevel2(path.l2Idx);
    }
    onUpdate({ ...formData, caseNature: value });
    if (errors.caseNature) {
      setErrors({ ...errors, caseNature: '' });
    }
    setOpenDropdown(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.caseNature) {
      newErrors.caseNature = 'Please select a case nature';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Please provide a description of the incident';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Case Nature Selection - 3 Hierarchical Levels */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-3 sm:mb-4">
          <FiAlertTriangle size={16} className="sm:w-5 sm:h-5" />
          Select Case Nature (3 Levels) *
        </label>
        
        {/* 3 Dropdown Sections in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {/* Case Nature 1 - Broad Category */}
          <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel1 !== null ? 'border-blue-500 shadow-md' : 'border-slate-300'}`}>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-blue-700 transition flex items-center justify-between ${
                selectedLevel1 !== null
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <span className="truncate">
                {selectedLevel1 !== null ? (
                  <span className="font-bold">✓ {caseNatureData.level1[selectedLevel1].name}</span>
                ) : (
                  'Level 1: Category'
                )}
              </span>
              <FiChevronDown 
                size={18} 
                className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 1 ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === 1 && (
              <div className="p-3 sm:p-4 bg-white border-t-2 border-slate-200">
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

          {/* Case Nature 2 - Subcategory */}
          <div className={`border-2 rounded-lg overflow-hidden ${selectedLevel2 !== null ? 'border-orange-500 shadow-md' : selectedLevel1 !== null ? 'border-slate-300' : 'border-slate-300'}`}>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold transition flex items-center justify-between ${
                selectedLevel2 !== null
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : selectedLevel1 !== null
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              <span className="truncate">
                {selectedLevel2 !== null ? (
                  <span className="font-bold">✓ {level2Options[selectedLevel2].name}</span>
                ) : selectedLevel1 !== null ? (
                  'Level 2: Type'
                ) : (
                  'Level 2: Type (Optional)'
                )}
              </span>
              <FiChevronDown 
                size={18} 
                className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 2 ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === 2 && selectedLevel1 !== null && (
              <div className="p-3 sm:p-4 bg-white border-t-2 border-slate-200">
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

          {/* Case Nature 3 - Specific Case */}
          <div className={`border-2 rounded-lg overflow-hidden ${formData.caseNature ? 'border-green-500 shadow-md' : 'border-slate-300'}`}>
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 3 ? null : 3)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold transition flex items-center justify-between ${
                formData.caseNature
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <span className="truncate">
                {formData.caseNature ? (
                  <span className="font-bold">✓ {formData.caseNature}</span>
                ) : (
                  'Level 3: Select Case'
                )}
              </span>
              <FiChevronDown 
                size={18} 
                className={`transition-transform duration-300 flex-shrink-0 ml-2 ${openDropdown === 3 ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === 3 && (
              <div className="p-3 sm:p-4 bg-white border-t-2 border-slate-200">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery3}
                  onChange={(e) => setSearchQuery3(e.target.value)}
                  className="w-full px-3 py-2 mb-2 sm:mb-3 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-green-400"
                />
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredAllLevel3.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleCaseNatureSelect(option)}
                      className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg border transition text-xs sm:text-sm font-medium ${
                        formData.caseNature === option
                          ? 'bg-green-600 text-white border-green-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
                      }`}
                    >
                      {formData.caseNature === option && '✓ '}{option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Value Display - Full Hierarchy Path */}
        {formData.caseNature && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border-2 border-green-400 rounded-lg shadow-md">
            <p className="text-xs sm:text-sm mb-2">
              <span className="font-bold text-green-800">✓ Full Hierarchy Selected:</span>
            </p>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-slate-700">
                <span className="inline-block bg-blue-100 px-2 py-1 rounded font-semibold text-blue-800">Level 1:</span>
                <span className="ml-2 font-bold text-blue-700">{selectedLevel1 !== null && caseNatureData.level1[selectedLevel1].name}</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-700">
                <span className="inline-block bg-orange-100 px-2 py-1 rounded font-semibold text-orange-800">Level 2:</span>
                <span className="ml-2 font-bold text-orange-700">{selectedLevel2 !== null && level2Options[selectedLevel2].name}</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-700">
                <span className="inline-block bg-green-100 px-2 py-1 rounded font-semibold text-green-800">Level 3:</span>
                <span className="ml-2 font-bold text-green-700">{formData.caseNature}</span>
              </p>
            </div>
          </div>
        )}

        {errors.caseNature && (
          <p className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.caseNature}
          </p>
        )}
      </div>

      {/* Incident Description */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          Incident Description *
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Provide detailed description of the incident..."
          rows="5"
          className={`
            w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition duration-200
            ${errors.description
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
            }
          `}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.description}
          </p>
        )}
        <p className="text-xs text-slate-500 mt-1">Min. 10 characters recommended</p>
      </div>

     
      {/* Button Group */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6 sm:mt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isLoading}
          className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 disabled:bg-slate-200 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isLoading ? 'Processing...' : 'Next: Disposition'}
        </button>
      </div>
    </form>
  );
};

export default CaseNatureForm;
