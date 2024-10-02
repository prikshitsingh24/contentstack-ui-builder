"use client";
import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";
import data from "../../data.json";
import { useRef, useState } from "react";
import {DndContext} from '@dnd-kit/core';

interface DraggableItem {
  id: string; // Unique identifier for the item
  content: string; // The content of the item (text, etc.)
  position: { x: number; y: number }; // The position where the item is dropped
}

export default function Home() {
  const [ui, setUi] = useState<any>(() => data);
  const [droppedItems,setDroppedItems]=useState<DraggableItem[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragEnd=(event:any)=>{
    const {active,over}=event
    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      const canvasRect = canvasRef?.current?.getBoundingClientRect();
      const x =  active.rect.current.translated.left
      const y =  active.rect.current.translated.top
      const position = { x: x, y: y };
      console.log(active)
      const content = active.data.current.data.content;
      const id = active.id; // Use the item's id

     
      setDroppedItems((prevItems:any) => [
        ...prevItems,
        { id, content, position },
      ]);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
