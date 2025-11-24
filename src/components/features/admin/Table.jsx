import React, { useState, useEffect, useCallback } from 'react';
import reportService from '../../../api/reportService';
import { DocxReport, PDFReport } from '../../../api/docxSerivce';
import { Eye, Download, RefreshCw } from 'lucide-react';

const WEEKS = Array.from({ length: 14 }, (_, i) => i + 1);

const Table = () => {
  const [weekData, setWeekData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewingWeek, setViewingWeek] = useState(null);
  const [weekReports, setWeekReports] = useState([]);
  const [week, setWeek] = useState(1);
  const [year, setYear] = useState(2025);

  const fetchWeekData = async (weekNumber) => {
    try {
      const data = await reportService.getTrackReportsByWeek(weekNumber);
      return data.trackReports || [];
    } catch (err) {
      console.error(`Error fetching week ${weekNumber}:`, err);
      return [];
    }
  };

  const loadAllWeeks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const allData = await reportService.getAllTrackReports();
      const reports = allData.trackReports || [];

      // Group reports by week
      const groupedByWeek = {};
      WEEKS.forEach((week) => {
        groupedByWeek[week] = reports.filter((r) => r.weekNumber === week);
      });

      setWeekData(groupedByWeek);
    } catch (err) {
      console.error('Error fetching all reports:', err);
      setError(err.response?.data?.error || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllWeeks();
  }, [loadAllWeeks]);

  const handleView = async (weekNumber) => {
    if (viewingWeek === weekNumber) {
      setViewingWeek(null);
      setWeekReports([]);
      return;
    }

    setLoading(true);
    try {
      const reports = await fetchWeekData(weekNumber);
      setWeekReports(reports);
      setViewingWeek(weekNumber);
    } catch {
      setError('Failed to load week reports');
    } finally {
      setLoading(false);
    }
  };

  const handleWordExport = async () => {
    setLoading(true);
    try {
      await DocxReport(week, year);
    } catch (err) {
      console.error('Word export failed:', err);
      alert('Failed to export Word document');
    } finally {
      setLoading(false);
    }
  };
  const handlePDFExport = async () => {
    setLoading(true);
    try {
      await PDFReport(week, year);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF document');
    } finally {
      setLoading(false);
    }
  };

  const getWeekStats = (weekNumber) => {
    const reports = weekData[weekNumber] || [];
    return { total: reports.length };
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Week Reports Overview</h2>
        <button
          onClick={loadAllWeeks}
          disabled={loading}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-md">{error}</div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Week Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {WEEKS.map((week) => {
                const stats = getWeekStats(week);
                return (
                  <React.Fragment key={week}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Week {week}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(week)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5 transition-colors">
                            <Eye className="w-4 h-4" />
                            {viewingWeek === week ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handlePDFExport(week)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1.5 transition-colors">
                            <Download className="w-4 h-4" />
                            PDF
                          </button>
                          <button
                            onClick={() => handleWordExport(week)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 flex
                            items-center gap-1.5 transition-colors">
                            <Download className="w-4 h-4" />
                            Word
                          </button>
                        </div>
                      </td>
                    </tr>
                    {viewingWeek === week && weekReports.length > 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 bg-gray-50">
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Week {week} Reports Details</h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                                      Track
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                                      Questions & Answers
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {weekReports.map((report, index) => (
                                    <tr key={report._id || index} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{report.track}</td>
                                      <td className="px-4 py-3 text-sm text-gray-500">
                                        <div className="max-w-md">
                                          {report.questionsAndAnswers?.map((qa, qaIndex) => (
                                            <div key={qaIndex} className="mb-2">
                                              <p className="font-medium text-gray-700">{qa.question}</p>
                                              <p className="text-gray-600 ml-4">{qa.answer}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
