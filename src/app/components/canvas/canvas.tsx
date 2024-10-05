"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from "../draggable/draggable";
import { useDroppable } from '@dnd-kit/core';
import { Droppable } from "../droppable/droppable";
import { DndContext } from '@dnd-kit/core';
import { CanvasDraggable } from '../draggable/canvasDraggable';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import sectionState from '@/app/states/sectionState';
import { v4 as uuidv4 } from 'uuid';

export default function Canvas({ items }: any) {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
  const [sections, setSections] = useRecoilState(sectionState.sectionState);
  const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
  const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.contentBackgroundColorState);
  const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.footerBackgroundColorState);
  const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)
  const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);

  const handleCanvasClick = (e: React.MouseEvent,section:any) => {
    // Prevent deselection if clicking on an actual item
    if ((e.target as HTMLElement).closest('.draggable-item')) return;
    setSelectedSection(section);
    setSelected({});
  };

  useEffect(()=>{
    if(sections.length==0){
      const updatedSection = {
        id: "section-"+`${uuidv4()}-`,
        headerBackgroundColor: headerBackgroundColor, // Optional, can be modified later
        contentBackgroundColor:contentBackgroundColor,
        footerBackgroundColor: footerBackgroundColor,
        children: droppedItems,
      };
  
      // Update the sectionState
      setSections([updatedSection]);
    }else{
      const updatedSections = sections.map((section, index) => {
        // Update the last section (the most recently added one)
        if (section.id === selectedSection.id) {
          return {
            ...section,
            headerBackgroundColor: headerBackgroundColor, // Optional, can be modified later
            contentBackgroundColor: contentBackgroundColor,
            footerBackgroundColor: footerBackgroundColor,
            children: droppedItems,
          };
        }
        return section;
      });

      // Update the state with the modified sections array
      setSections(updatedSections);
    }
    
  }, [headerBackgroundColor,contentBackgroundColor,footerBackgroundColor, droppedItems, setSections])

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
    <div className='w-full h-full overflow-y-scroll'>
       {sections.map(section => (
         <div  className={`w-full h-full border-2 mb-20 ${selectedSection.id==section.id?'border-blue-700':''} `}  onClick={(e) => handleCanvasClick(e, section)}>
         <div  className="h-full w-full grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_3fr_1fr] " >
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:section.headerBackgroundColor}}>
           <Droppable id={`${section.id}header-column-1`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}header-column-1` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:section.headerBackgroundColor}}>
           <Droppable id={`${section.id}header-column-2`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}header-column-2` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-b-2 border-dashed':''} relative`} style={{backgroundColor:section.headerBackgroundColor}}>
           <Droppable id={`${section.id}header-column-3`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}header-column-3` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-1`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}content-column-1` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`}  style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-2`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}content-column-2` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-b-2 border-dashed':''} relative`}  style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-3`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}content-column-3` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2  border-dashed':''} relative`}  style={{backgroundColor:section.footerBackgroundColor}}>
           <Droppable id={`${section.id}footer-column-1`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}footer-column-1` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-dashed':''} relative`} style={{backgroundColor:section.footerBackgroundColor}}>
           <Droppable id={`${section.id}footer-column-2`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}footer-column-2` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className='relative' style={{backgroundColor:section.footerBackgroundColor}}>
           <Droppable id={`${section.id}footer-column-3`}>
           {items.length > 0 && items.map((item: any) => (
                 item.over==`${section.id}footer-column-3` && (
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
                   {item.type=="Text" &&(
                     <div style={item.style}>
                     {item.content}
                     </div>
                   )}
                   {item.type=="Button" &&(
                     <button style={item.style}>
                     {item.content}
                     </button>
                   )}
                   {item.type=="Input" &&(
                     <input style={item.style} placeholder={item.placeholder} value={item.value}/>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
         </div>
       </div>
      ))}
    </div>
     

    
  );
}