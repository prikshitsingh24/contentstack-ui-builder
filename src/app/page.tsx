"use client";
import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";
import data from "../../data.json";
import { useRef, useState } from "react";
import {DndContext} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import { useRecoilState } from "recoil";
import canvasState from "./states/canvasState";

interface DraggableItem {
  id: string; // Unique identifier for the item
  content: string; // The content of the item (text, etc.)
  position: { x: number; y: number }; // The position where the item is dropped
}

export default function Home() {
  const [ui, setUi] = useState<any>(() => data);
  const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);

    const [
      mousePosition,
      setMousePosition
    ] = React.useState({ x: 0, y: 0 });
  
    React.useEffect(() => {
      const updateMousePosition = (ev:any) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };
      
      window.addEventListener('mousemove', updateMousePosition);
  
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
  

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log(event)
    console.log(mousePosition.x);
    console.log(mousePosition.y)
    if (over) {
      const x=(mousePosition.x-event.over.rect.left);
      const y=(mousePosition.y-event.over.rect.top);
      console.log(x)
      console.log(y)
      const position = {x,y}
      const content = active.data.current.data.content;
      const id = active.id; // Use the item's id
      setDroppedItems((prevItems: any) => {
        const existingItemIndex = prevItems.findIndex((item:any) => item.id == id);
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], position };
          return updatedItems;
        } else {
          // Insert new item
          const updatedId=id+`-${uuidv4()}`;
  
          return [
            ...prevItems,
            { id:updatedId,
              type:content.type,
              content:content.content,
              over:event.over.id,
              style:content.style,
              position:position 
              },
          ];
        }
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} >
      <div className="grid grid-cols-[1fr_6fr_1.5fr] gap-3 h-screen">
        {/* Left sidebar with draggable items */}
        <div>
          <Leftsidebar data={ui}/>
        </div>
        {/* Canvas to drop the item */}
        <div className="mb-5 mt-5 border-2">
          <Canvas items={droppedItems}/>
        </div>
        <div>
          <Rightsidebar />
        </div>
      </div>
      </DndContext>
  );
}
