"use client";
import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";
import data from "../../data.json";
import { useRef, useState } from "react";
import {DndContext} from '@dnd-kit/core';
import React from "react";

interface DraggableItem {
  id: string; // Unique identifier for the item
  content: string; // The content of the item (text, etc.)
  position: { x: number; y: number }; // The position where the item is dropped
}

export default function Home() {
  const [ui, setUi] = useState<any>(() => data);
  const [droppedItems,setDroppedItems]=useState<DraggableItem[]>([]);

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
    if (over) {
      const x=(mousePosition.x-event.over.rect.left);
      const y=(mousePosition.y-event.over.rect.top);
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
          const updatedId=id+"canvas";
          return [
            ...prevItems,
            { id:updatedId, content, position },
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
        <div className="mb-2 mt-2 ">
          <Canvas items={droppedItems}/>
        </div>
        <div>
          <Rightsidebar />
        </div>
      </div>
      </DndContext>
  );
}
