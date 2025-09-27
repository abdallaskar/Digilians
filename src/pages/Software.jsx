import { useEffect, useState } from 'react';
import AddSheetForm from '../components/AddSheetForm';
import SheetList from '../components/SheetList';
import sheetService from '../api/sheetService.js';

export default function Software() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const data = await sheetService.getSheets('SOFTWARE');
        setSheets(data);
      } catch (err) {
        console.error('Failed to fetch sheets', err);
      }
    };
    fetchSheets();
  }, []);

  const handleAddSheet = async (newSheet) => {
    try {
      // update frontend immediately
      setSheets((prev) => [...prev, newSheet]);
      // send to backend
      const response = await sheetService.addSheet(newSheet);
      console.log('Sheet added:', response);
      // Optionally, you can also handle the response from the backend
    } catch (err) {
      console.error('Failed to add sheet', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Software Sheets</h1>
      <AddSheetForm onAdd={handleAddSheet} type="SOFTWARE" />
      <SheetList sheets={sheets} setSheets={setSheets} />
    </div>
  );
}
