"use client";

import React, { useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';

export default function Canvas({ items }: any) {
  return (
 
      <div  className="w-full h-full bg-gray-300">
      <div  className="h-full w-full relative">
        <div className='absolute left-44 border-r-2 h-full border-dashed'></div>
        <div className='absolute right-44 border-r-2 h-full border-dashed'></div>
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