import React, { useState } from 'react';
import Sidebar from '../../components/features/admin/Sidebar';
import TrackReports from '../../components/features/admin/TrackReports';
import Table from '../../components/features/admin/Table';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('table');

    const renderContent = () => {
        if (activeTab === 'table') {
            return <Table />;

        } else {
            return <TrackReports track={activeTab} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Admin;

