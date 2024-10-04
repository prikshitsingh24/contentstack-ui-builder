"use client";

import React, { useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';

export default function Canvas({ items }: any) {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Prevent deselection if clicking on an actual item
    if ((e.target as HTMLElement).closest('.draggable-item')) return;
    setSelected({});
  };
  return (
 
      <div  className="w-full h-full bg-gray-300" onClick={handleCanvasClick}>
      <div  className="h-full w-full relative">
        <div className='absolute left-44 border-r-2 h-full border-dashed'></div>
        <div className='absolute right-44 border-r-2 h-full border-dashed'></div>
        <Droppable>
          {items.length > 0 && items.map((item: any) => (
              <div
              key={item.id}
              style={{
                position: 'absolute',
                zIndex:10,
                left: `${item.position?.x}px`,
                top: `${item.position?.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="draggable-item"
            >
              <CanvasDraggable id={item.id} data={item}>
                <div style={item.style}>
                {item.content}
                </div>
              </CanvasDraggable>
            </div>
         
          ))}
        </Droppable>
        
      </div>
    </div>

    
  );
}