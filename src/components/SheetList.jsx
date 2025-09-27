// File: src/components/SheetList.jsx
import { Droppable, DragDropContext } from '@hello-pangea/dnd';
import SheetItem from './SheetItem';

export default function SheetList({ sheets, setSheets, onEdit, onDelete }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sheets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSheets(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="sheets">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {sheets.map((sheet, index) => (
              <SheetItem key={sheet._id} sheet={sheet} index={index} onEdit={onEdit} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
