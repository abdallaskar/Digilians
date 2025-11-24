import React, { useState } from 'react';
import InputField from '../../common/InputField';
import reportService from '../../../api/reportService';
import { TRACKS } from '../../../utils/constants';

// Define the structured questions for the report
const REPORT_QUESTIONS = [
  { id: 'module_completion', question: 'What modules or sections did you complete this week?', type: 'textarea' },
  {
    id: 'challenges_faced',
    question: 'What were the biggest challenges you faced and how did you handle them?',
    type: 'textarea',
  },
  { id: 'future_plan', question: 'What are your main goals for the upcoming week?', type: 'textarea' },
  { id: 'learning_time', question: 'How many total hours did you spend studying? (Number)', type: 'number' },
];

const Form = ({ track = 'SOFTWARE' }) => {
  const [selectedTrack, setSelectedTrack] = useState(track);
  // Initialize state to hold answers for all defined questions
  const [reportState, setReportState] = useState(
    REPORT_QUESTIONS.reduce((acc, q) => {
      acc[q.id] = '';
      return acc;
    }, {})
  );

  const [weekNumber, setWeekNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Standard handler to update state based on input ID
  const handleInputChange = (id, value) => {
    setReportState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Function to submit the report to the backend
  const submitReport = async () => {
    // Validation
    const weekNum = parseInt(weekNumber);
    if (!weekNumber || isNaN(weekNum) || weekNum < 1 || weekNum > 14) {
      setMessage({ type: 'error', text: 'Please enter a valid week number (1-14)' });
      return;
    }

    // Format questions and answers
    const questionsAndAnswers = REPORT_QUESTIONS.map((q) => ({
      question: q.question,
      answer: reportState[q.id] || 'Not answered',
    }));

    // Prepare request data
    const reportData = {
      track: selectedTrack,
      weekNumber: weekNum,
      questionsAndAnswers,
    };

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await reportService.createOrUpdateTrackReport(reportData);
      setMessage({
        type: 'success',
        text: response.message || 'Report submitted successfully!',
      });

      // Optional: Reset form after successful submission
      // setReportState(REPORT_QUESTIONS.reduce((acc, q) => { acc[q.id] = ''; return acc; }, {}));
      // setWeekNumber('');
    } catch (error) {
      console.error('Error submitting report:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to submit report. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate the formatted report (optional - for preview)
  const generatePreview = () => {
    let reportText = 'Weekly Achievement Report:\n\n';
    reportText += `Track: ${selectedTrack}\n`;
    reportText += `Week: ${weekNumber || 'Not set'}\n\n`;

    REPORT_QUESTIONS.forEach((q) => {
      reportText += `- ${q.question} \n   Answer: ${reportState[q.id] || 'Not answered'}\n\n`;
    });

    console.log(reportText);
    alert(reportText);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md  bg-white">
      <h2 className="text-center mb-5 text-2xl font-bold text-gray-800">Digilians Weekly Achievement Report</h2>

      {/* Track Selection */}
      <div className="mb-4">
        <label htmlFor="trackSelect" className="block mb-2 font-medium text-gray-700">
          Track
        </label>
        <select
          id="trackSelect"
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white">
          {TRACKS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Week Number Input */}
      <div className="mb-4">
        <label htmlFor="weekNumber" className="block mb-2 font-medium text-gray-700">
          Week Number (1-14) *
        </label>
        <input
          type="number"
          id="weekNumber"
          min="1"
          max="14"
          value={weekNumber}
          onChange={(e) => setWeekNumber(e.target.value)}
          placeholder="Enter week number (1-14)"
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Questions */}
      {REPORT_QUESTIONS.map((item) => (
        <div className="form-group" key={item.id}>
          <InputField
            id={item.id}
            question={item.question}
            value={reportState[item.id]}
            onChange={handleInputChange}
            type={item.type}
          />
        </div>
      ))}

      {/* Message Display */}
      {message.text && (
        <div
          className={`p-3 mb-4 rounded-md border ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border-green-500'
              : 'bg-red-100 text-red-800 border-red-500'
          }`}>
          {message.text}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={submitReport}
          disabled={isLoading}
          className={`flex-1 py-2.5 px-4 text-white rounded-md text-base font-medium transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
          }`}>
          {isLoading ? 'Submitting...' : 'Submit Report 📄'}
        </button>
        <button
          onClick={generatePreview}
          disabled={isLoading}
          className={`py-2.5 px-5 text-white rounded-md text-base font-medium transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}>
          Preview
        </button>
      </div>
    </div>
  );
};

export default Form;
