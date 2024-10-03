"use client";

import React, { useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';

export default function Canvas({ items }: any) {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });
  return (
 
      <div  className="w-full h-full bg-gray-300">
      <div ref={setNodeRef} className="h-96 bg-blue-200 w-96 relative">
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
              <CanvasDraggable id={item.id} data={item.content}>
                {item.content}
              </CanvasDraggable>
            </div>
         
          ))}
        </Droppable>
      </div>
    </div>

    
  );
}