import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

const DispositionForm = ({ formData, onUpdate, onSubmit, onPrevious, isLoading = false }) => {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const dispositionOptions = [
    'Unit Dispatched',
    'Service Provided',
    'Referred to Other Agency',
    'No Service Required',
    'Unable to Locate',
    'Duplicate Report',
    'Caller Refused Service',
    'Incomplete Information',
    'Follow-up Required',
  ];

  const handleDispositionSelect = (disposition) => {
    onUpdate({ ...formData, disposition });
    if (errors.disposition) {
      setErrors({ ...errors, disposition: '' });
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

    if (!formData.disposition) {
      newErrors.disposition = 'Please select a disposition';
    }

    if (!formData.closingNotes?.trim()) {
      newErrors.closingNotes = 'Please add closing notes';
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 p-8 bg-green-100 rounded-full">
          <FiCheckCircle size={64} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Form Submitted Successfully!</h2>
        <p className="text-slate-600 mb-4">The incident report has been recorded.</p>
        <div className="bg-slate-100 rounded-lg p-6 max-w-md text-left">
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-semibold">Ticket ID:</span> 911-{Date.now().toString().slice(-8)}
          </p>
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-semibold">Caller:</span> {formData.callerName}
          </p>
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-semibold">Case Type:</span> {formData.caseNature}
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Disposition:</span> {formData.disposition}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Disposition Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
          <FiCheckCircle size={18} className="text-green-600" />
          Select Disposition *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {dispositionOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleDispositionSelect(option)}
              className={`p-3 rounded-lg border-2 font-medium text-sm transition duration-200 ${
                formData.disposition === option
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.disposition && (
          <p className="mt-3 flex items-center gap-1 text-sm text-red-600">
            <FiAlertCircle size={16} /> {errors.disposition}
          </p>
        )}
      </div>

      {/* Closing Notes */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Closing Notes *
        </label>
        <textarea
          name="closingNotes"
          value={formData.closingNotes || ''}
          onChange={handleChange}
          placeholder="Add any closing remarks or actions taken..."
          rows="4"
          className={`
            w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200
            ${errors.closingNotes
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
            }
          `}
          disabled={isLoading}
        />
        {errors.closingNotes && (
          <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
            <FiAlertCircle size={16} /> {errors.closingNotes}
          </p>
        )}
      </div>

      {/* Follow-up Actions */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Follow-up Actions (Optional)
        </label>
        <textarea
          name="followUpActions"
          value={formData.followUpActions || ''}
          onChange={handleChange}
          placeholder="Any required follow-up actions..."
          rows="3"
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition duration-200"
          disabled={isLoading}
        />
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Priority Level (Optional)
        </label>
        <div className="flex gap-3">
          {['Low', 'Medium', 'High', 'Critical'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onUpdate({ ...formData, priorityLevel: level })}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition duration-200 ${
                formData.priorityLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FiClock size={20} className="text-blue-600" />
          Incident Summary
        </h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-semibold">Caller:</span> {formData.callerName}</p>
          <p><span className="font-semibold">Phone:</span> {formData.callerNumber}</p>
          <p><span className="font-semibold">Location:</span> {formData.address}</p>
          <p><span className="font-semibold">Case Type:</span> {formData.caseNature}</p>
          <p><span className="font-semibold">Selected Disposition:</span> {formData.disposition || 'Not selected'}</p>
        </div>
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
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
  );
};

export default DispositionForm;
