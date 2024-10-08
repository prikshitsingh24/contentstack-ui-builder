import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core'; // Import DragOverlay
import { snapCenterToCursor } from '@dnd-kit/modifiers';

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    data:{
        type:"items",
        data: { content: props.data}
    },
    
  });

  const style = {
    touchAction: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    width:'100%',
  };

  return (
    <>
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button>
      {/* DragOverlay: this element will only show when dragging */}
      {isDragging && (
        <DragOverlay modifiers={[snapCenterToCursor]}>
          <div style={style}>
            {props.children}
          </div>
        </DragOverlay>
      )}
    </>
  );
}
