import React, { useState } from 'react';
import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

const CaseNatureForm = ({ formData, onUpdate, onNext, onPrevious, isLoading = false }) => {
  const [errors, setErrors] = useState({});

  const caseNatures = [
    'Accident / Traffic Collision',
    'Assault / Violence',
    'Robbery / Theft',
    'Medical Emergency',
    'Fire / Explosion',
    'Domestic Violence',
    'Mental Health Crisis',
    'Missing Person',
    'Suspicious Activity',
    'Drug Related',
    'Public Disturbance',
    'Harassment / Threats',
    'Burglary / Breaking & Entering',
    'Other Emergency',
  ];

  const handleCaseNatureSelect = (nature) => {
    onUpdate({ ...formData, caseNature: nature });
    if (errors.caseNature) {
      setErrors({ ...errors, caseNature: '' });
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Case Nature Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
          <FiAlertTriangle size={18} className="text-orange-600" />
          Select Case Nature *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {caseNatures.map((nature) => (
            <button
              key={nature}
              type="button"
              onClick={() => handleCaseNatureSelect(nature)}
              className={`p-3 rounded-lg border-2 font-medium text-sm transition duration-200 ${
                formData.caseNature === nature
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
              }`}
            >
              {nature}
            </button>
          ))}
        </div>
        {errors.caseNature && (
          <p className="mt-3 flex items-center gap-1 text-sm text-red-600">
            <FiAlertCircle size={16} /> {errors.caseNature}
          </p>
        )}
      </div>

      {/* Incident Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Incident Description *
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Provide detailed description of the incident..."
          rows="5"
          className={`
            w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200
            ${errors.description
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
            }
          `}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
            <FiAlertCircle size={16} /> {errors.description}
          </p>
        )}
        <p className="text-xs text-slate-500 mt-1">Min. 10 characters recommended</p>
      </div>

     
      {/* Button Group */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isLoading}
          className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-slate-200 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Next: Disposition'}
        </button>
      </div>
    </form>
  );
};

export default CaseNatureForm;
