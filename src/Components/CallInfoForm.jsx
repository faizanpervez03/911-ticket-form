import React, { useState } from 'react';
import { FiUser, FiPhone, FiMapPin, FiAlertCircle } from 'react-icons/fi';

const CallInfoForm = ({ formData, onUpdate, onNext, isLoading = false }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const fieldClass = (fieldName) => `
    w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition duration-200
    ${errors[fieldName]
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
    }
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Caller Name */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          <FiUser size={16} className="sm:w-5 sm:h-5" />
          Caller Name *
        </label>
        <input
          type="text"
          name="callerName"
          value={formData.callerName || ''}
          onChange={handleChange}
          placeholder="Enter full name of the caller"
          className={fieldClass('callerName')}
          disabled={isLoading}
        />
        {errors.callerName && (
          <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.callerName}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          <FiPhone size={16} className="sm:w-5 sm:h-5" />
          Phone Number *
        </label>
        <input
          type="tel"
          name="callerNumber"
          value={formData.callerNumber || ''}
          onChange={handleChange}
          placeholder="Enter phone number"
          className={fieldClass('callerNumber')}
          disabled={isLoading}
        />
        {errors.callerNumber && (
          <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.callerNumber}
          </p>
        )}
      </div>

      {/* Alternative Number */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          <FiPhone size={16} className="sm:w-5 sm:h-5" />
          Alternative Number (Optional)
        </label>
        <input
          type="tel"
          name="alternativeNumber"
          value={formData.alternativeNumber || ''}
          onChange={handleChange}
          placeholder="Enter alternative phone number"
          className={fieldClass('alternativeNumber')}
          disabled={isLoading}
        />
      </div>

      {/* Address */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          <FiMapPin size={16} className="sm:w-5 sm:h-5" />
          Address *
        </label>
        <textarea
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="Enter complete address"
          rows="3"
          className={fieldClass('address')}
          disabled={isLoading}
        />
        {errors.address && (
          <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.address}
          </p>
        )}
      </div>

      {/* Nearest Location */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          <FiMapPin size={16} className="sm:w-5 sm:h-5" />
          Nearest Location/Landmark *
        </label>
        <input
          type="text"
          name="nearestLocation"
          value={formData.nearestLocation || ''}
          onChange={handleChange}
          placeholder="e.g., Near City Hospital, Main Street"
          className={fieldClass('nearestLocation')}
          disabled={isLoading}
        />
        {errors.nearestLocation && (
          <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600">
            <FiAlertCircle size={14} /> {errors.nearestLocation}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed mt-6 sm:mt-8 text-sm sm:text-base"
      >
        {isLoading ? 'Processing...' : 'Next: Case Nature'}
      </button>
    </form>
  );
};

export default CallInfoForm;
