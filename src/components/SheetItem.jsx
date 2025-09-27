// File: src/components/SheetItem.jsx
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2, Check, X } from 'lucide-react';

export default function SheetItem({ sheet, index, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(sheet.name);
  const [editLink, setEditLink] = useState(sheet.link);

  const handleSave = () => {
    if (!editName || !editLink) return;
    onEdit(sheet._id, { ...sheet, name: editName, link: editLink });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={sheet._id.toString()} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white shadow p-4 rounded-lg flex justify-between items-center hover:bg-green-50 transition">
          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ) : (
            <a
              href={sheet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-800 font-medium flex-1">
              {sheet.name}
            </a>
          )}

          <div className="flex items-center gap-2 ml-4">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-800">
                  <Check size={18} />
                </button>
                <button onClick={() => setIsEditing(false)} className="p-1 text-gray-500 hover:text-gray-700">
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="p-1 text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(sheet._id)} className="p-1 text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}
