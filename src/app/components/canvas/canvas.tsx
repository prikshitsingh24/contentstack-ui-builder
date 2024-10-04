"use client";

import React, { useEffect, useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';

export default function Canvas({ items }: any) {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Prevent deselection if clicking on an actual item
    if ((e.target as HTMLElement).closest('.draggable-item')) return;
    setSelected({});
  };

  const handleDelete = () => {
    if (selected.id) {
      // Filter out the selected item from dropped items
      const updatedItems = droppedItems.filter(item => item.id !== selected.id);
      setDroppedItems(updatedItems); // Update the state with the remaining items
      setSelected({}); // Clear the selected item
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        handleDelete();
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);
  return (
 
      <div  className="w-full h-full bg-gray-300" onClick={handleCanvasClick}>
      <div  className="h-full w-full grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_3fr_1fr] ">
        <div className='border-r-2 border-b-2 border-dashed relative'>
        <Droppable id="header-column-1">
        {items.length > 0 && items.map((item: any) => (
              item.over=="header-column-1" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-r-2 border-b-2 border-dashed relative'>
        <Droppable id="header-column-2">
        {items.length > 0 && items.map((item: any) => (
              item.over=="header-column-2" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-b-2 border-dashed relative'>
        <Droppable id="header-column-3">
        {items.length > 0 && items.map((item: any) => (
              item.over=="header-column-3" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-r-2 border-dashed relative'>
        <Droppable id="content-column-1">
        {items.length > 0 && items.map((item: any) => (
              item.over=="content-column-1" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-r-2 border-dashed relative'>
        <Droppable id="content-column-2">
        {items.length > 0 && items.map((item: any) => (
              item.over=="content-column-2" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='relative'>
        <Droppable id="content-column-3">
        {items.length > 0 && items.map((item: any) => (
              item.over=="content-column-3" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-r-2 border-t-2 border-dashed relative'>
        <Droppable id="footer-column-1">
        {items.length > 0 && items.map((item: any) => (
              item.over=="footer-column-1" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-r-2 border-t-2 border-dashed relative'>
        <Droppable id="footer-column-2">
        {items.length > 0 && items.map((item: any) => (
              item.over=="footer-column-2" && (
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
              )
          ))}
        </Droppable>
        </div>
        <div className='border-t-2 border-dashed relative'>
        <Droppable id="footer-column-3">
          {items.length > 0 && items.map((item: any) => (
              item.over=="footer-column-3" && (
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
              )
          ))}
        </Droppable>
        </div>
      </div>
    </div>

    
  );
}