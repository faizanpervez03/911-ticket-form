import React from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';

const FormStepper = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition duration-300 ${
                index < currentStep - 1
                  ? 'bg-green-500 text-white'
                  : index === currentStep - 1
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {index < currentStep - 1 ? (
                <FiCheck size={24} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <p className={`mt-2 text-sm font-medium ${
              index <= currentStep - 1 ? 'text-slate-900' : 'text-slate-500'
            }`}>
              {step}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-4 rounded-full transition duration-300 ${
              index < currentStep - 1 ? 'bg-green-500' : 'bg-slate-200'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormStepper;
