import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core'; // Import DragOverlay

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
    data:{
        type:"items",
        data: { content: props.data, position: { x: 0, y: 0 } }
    },
    
  });

  const style = {

  };

  return (
    <>
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button>
      {/* DragOverlay: this element will only show when dragging */}
      {isDragging && (
        <DragOverlay>
          <div style={style}>
            {props.children}
          </div>
        </DragOverlay>
      )}
    </>
  );
}
