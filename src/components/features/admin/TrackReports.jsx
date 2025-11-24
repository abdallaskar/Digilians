import React, { useState, useEffect, useCallback } from 'react';
import reportService from '../../../api/reportService';
import { Download, RefreshCw } from 'lucide-react';

const TrackReports = ({ track }) => {
    const [weekNumber, setWeekNumber] = useState('');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReports = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await reportService.getTrackReportsByTrack(track, weekNumber ? parseInt(weekNumber) : null);
            setReports(data.trackReports || []);
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError(err.response?.data?.error || 'Failed to fetch reports');
            setReports([]);
        } finally {
            setLoading(false);
        }
    }, [track, weekNumber]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleExport = () => {
        // Convert reports to CSV format
        if (reports.length === 0) {
            alert('No reports to export');
            return;
        }

        const headers = ['Week Number', 'Questions & Answers'];
        const rows = reports.map((report) => {
            const qa = report.questionsAndAnswers
                ?.map((qa) => `${qa.question}: ${qa.answer}`)
                .join(' | ') || 'N/A';
            return [
                report.weekNumber,
                qa,
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${track}-reports-${weekNumber ? `week-${weekNumber}` : 'all'}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">{track} Reports</h2>
                    <label className="font-medium text-gray-700">Filter by Week (optional):</label>
                    <input
                        type="number"
                        min="1"
                        max="14"
                        value={weekNumber}
                        onChange={(e) => setWeekNumber(e.target.value)}
                        placeholder="All weeks"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchReports}
                        disabled={loading}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 flex items-center gap-2">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
                <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-md">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">Loading reports...</p>
                </div>
            ) : reports.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                        No reports found for {track}
                        {weekNumber && ` in week ${weekNumber}`}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Week
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Questions & Answers
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.map((report, index) => (
                                    <tr key={report._id || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {report.weekNumber}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="max-w-2xl">
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
            )}
        </div>
    );
};

export default TrackReports;

