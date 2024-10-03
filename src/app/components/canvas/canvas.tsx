"use client";

import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";

export default function Canvas({ items }: any) {
  

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="h-96 bg-blue-200 w-96 relative">
        <Droppable>
        {items.length > 0 && items.map((item: any) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.position.x}px`,
              top: `${item.position.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Draggable id={item.id} data={item.content}>
              {item.content}
            </Draggable>
          </div>
        ))}
        </Droppable>
       
      </div>
    </div>
  );
}
