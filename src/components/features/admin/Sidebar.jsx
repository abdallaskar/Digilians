import React from 'react';
import { LayoutDashboard, FileText, Calendar, Table as TableIcon } from 'lucide-react';

const TRACKS = [
    { id: 'SOFTWARE', name: 'Software' },
    { id: 'DIGITAL MARKETING', name: 'Digital Marketing' },
    { id: 'AI & DATA SCIENCE', name: 'AI & Data Science' },
    { id: 'DATA ANALYTICS', name: 'Data Analytics' },
    { id: 'SECURITY', name: 'Security' },
    { id: 'APPLIED TECHNOLOGIES', name: 'Applied Technologies' },
];

const Sidebar = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6" />
                Admin Dashboard
            </h2>
            <nav className="space-y-2">
                <button
                    onClick={() => onTabChange('table')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'table'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                        }`}>
                    <TableIcon className="w-5 h-5" />
                    Tracks Reports Table
                </button>

                <div className="pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                        Track Reports
                    </p>
                    {TRACKS.map((track) => (
                        <button
                            key={track.id}
                            onClick={() => onTabChange(track.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors mb-1 ${activeTab === track.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700'
                                }`}>
                            <FileText className="w-4 h-4" />
                            {track.name}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

