// File: src/components/AddSheetForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function AddSheetForm({ onAdd, type }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const { isLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !link) return;

    onAdd({ _id: Date.now().toString(), name, link, type }); // include type

    setName('');
    setLink('');
    setShowForm(false); // hide form after adding
  };

  // If user is not logged in, don't show the add form
  if (!isLoggedIn) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-center">
          Please <a href="/login" className="text-blue-600 hover:underline">login</a> to add new sheets.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          ➕ Add New Sheet
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg space-y-3 mt-3">
          <input
            type="text"
            placeholder="Sheet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Sheet Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
