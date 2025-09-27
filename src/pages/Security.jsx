import { useEffect, useState } from 'react';
import AddSheetForm from '../components/AddSheetForm';
import SheetList from '../components/SheetList';
import sheetService from '../api/sheetService.js';

export default function Security() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const data = await sheetService.getSheets('SECURITY');
        setSheets(data);
      } catch (err) {
        console.error('Failed to fetch sheets', err);
      }
    };
    fetchSheets();
  }, []);

  const handleAddSheet = async (newSheet) => {
    try {
      const response = await sheetService.addSheet(newSheet);
      setSheets((prev) => [...prev, response]); // use backend response (with id)
    } catch (err) {
      console.error('Failed to add sheet', err);
    }
  };

  const handleEditSheet = async (id, updatedSheet) => {
    try {
      const response = await sheetService.updateSheet(id, updatedSheet);
      setSheets((prev) => prev.map((s) => (s._id === id ? response : s)));
    } catch (err) {
      console.error('Failed to update sheet', err);
    }
  };

  const handleDeleteSheet = async (id) => {
    try {
      await sheetService.deleteSheet(id);
      setSheets((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Failed to delete sheet', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Security Sheets</h1>
      <AddSheetForm onAdd={handleAddSheet} type="SECURITY" />
      <SheetList sheets={sheets} setSheets={setSheets} onEdit={handleEditSheet} onDelete={handleDeleteSheet} />
    </div>
  );
}
