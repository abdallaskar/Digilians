import React from 'react';

const InputField = ({ id, question, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {question}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder || "Enter your answer here..."}
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 font-inherit resize-y focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder || "Enter your answer here..."}
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 font-inherit focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      )}
    </div>
  );
};

export default InputField;
