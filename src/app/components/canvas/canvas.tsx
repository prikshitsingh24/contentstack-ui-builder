"use client";

import React, { useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';

export default function Canvas({ items }: any) {
  return (
 
      <div  className="w-full h-full grid grid-cols-[1fr_4fr_1fr] bg-gray-300">
      <div  className="h-full w-full relative border-r-2">
        <Droppable id={'column-1'}>
          {items.length > 0 && items.map((item: any) => (
             (item.droppableId=="column-1" && (
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
            ))
         
          ))}
        </Droppable>
      </div>
      <div  className="h-full w-full relative border-r-2">
        <Droppable id={'column-2'}>
          {items.length > 0 && items.map((item: any) => (
              (item.droppableId=="column-2" && (
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
              ))
         
          ))}
        </Droppable>
      </div>
      <div  className="h-full w-full relative">
        <Droppable id={'column-3'}>
          {items.length > 0 && items.map((item: any) => (
              (item.droppableId=="column-3" && (
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
              ))
         
          ))}
        </Droppable>
      </div>
    </div>

    
  );
}