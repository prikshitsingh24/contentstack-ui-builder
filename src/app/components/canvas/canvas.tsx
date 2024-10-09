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
import pageState from '@/app/states/pageState';
import colorPickerState from '@/app/states/colorPickerState';
import contextMenuState from '@/app/states/contextMenuState';
import ContextMenu from '../contextMenu/contextMenu';

export default function Canvas() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)
  const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
  const [borderColorPicker,setBorderColorPicker]=useRecoilState(colorPickerState.borderColorPickerState)
  const [headerbackgroundColorPicker,setheaderBackgroundColorPicker]=useRecoilState(colorPickerState.headerBackgroundColorPickerState);
  const [contentbackgroundColorPicker,setContentBackgroundColorPicker]=useRecoilState(colorPickerState.contentBackgroundColorPickerState);
  const [footerbackgroundColorPicker,setFooterBackgroundColorPicker]=useRecoilState(colorPickerState.footerBackgroundColorPickerState);
  const [contextMenu,setContextMenu]=useRecoilState(contextMenuState.contextMenuState);
  const [positionX,setPositionX]=useState(0);
  const [positionY,setPositionY]=useState(0);
  const [isResizingMode, setResizingMode] = useRecoilState(contextMenuState.resizingModeState)

  const handleCanvasClick = (e: React.MouseEvent,section:any) => {
    // Prevent deselection if clicking on an actual item
    setBackgroundColorPicker(false);
    setBorderColorPicker(false);
    setColorPicker(false);
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(false);
    if ((e.target as HTMLElement).closest('.draggable-item')) return;
    setSelectedSection(section);
    console.log(selectedPage)
    setSelected({});
  };

 

  const handleDelete = () => {
    if (selected.id) {
      // Update selectedPage by filtering out the selected item from its children
      const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
        const updatedChildren = section.children.filter((item: any) => item.id !== selected.id);
  
        return {
          ...section,
          children: updatedChildren,  // Update section's children by removing the selected item
        };
      });
  
      // Update the selectedPage state
      setSelectedPage({
        ...selectedPage,
        children: updatedSelectedPage,  // Set the updated children for the selectedPage
      });
  
      // Update the pages state
      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            children: updatedSelectedPage,  // Update the selectedPage children in this page
          };
        }
        return page;
      });
  
      setPages(updatedPages);
  
      // Clear the selected item state
      setSelected({});
    }
  };
  

useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault(); // Prevent the browser's default right-click menu
      console.log('Right click detected at', event.clientX, event.clientY);
      setPositionX(event.clientX);
      setPositionY(event.clientY);
      setContextMenu(true)
      // You can handle the context menu here, such as showing a custom menu
    };
    // Attach the right-click event listener
    if(selected && selected.id){
      window.addEventListener('contextmenu', handleRightClick);
    }
    setContextMenu(false)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('contextmenu', handleRightClick);
    };
  }, [selected]);

  const handleResizeClick=()=>{
    setResizingMode(true);
    setContextMenu(false);
  }

  return (
    <div className='w-full h-full overflow-y-scroll border-4 rounded-md '>
      {contextMenu && (
        <div style={{position:'fixed',left:`${positionX}px`,top:`${positionY}px`,zIndex:'100'}}>
          <ContextMenu onDelete={handleDelete} onResize={handleResizeClick} ></ContextMenu>
          </div>
      )}
     <div className='h-full w-full'>
     <div className='h-20 grid grid-cols-[0.5fr_3fr_0.5fr]'>
          <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:selectedPage.headerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}header-column-1`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}header-column-1` && (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:selectedPage.headerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}header-column-2`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}header-column-2` && (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-b-2 border-dashed':''} relative`} style={{backgroundColor:selectedPage.headerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}header-column-3`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}header-column-3` && (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
          </div>
       {selectedPage?.children?.map((section:any) => (
         <div  className={`w-full h-full  ${selectedSection.id==section.id?'border-2 border-blue-700':''} `}  onClick={(e) => handleCanvasClick(e, section)}>
           <div className='h-full w-full grid grid-cols-[0.5fr_3fr_0.5fr]'>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`} style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-1`} key={section.id}>
           {section.children.length > 0 && section.children.map((item: any) => (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-b-2 border-dashed':''} relative`}  style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-2`} key={section.id}>
           {section.children.length > 0 && section.children.map((item: any) => (
                 item.over==`${section.id}content-column-2` && (
                   <div
                 key={item.id}
                 style={{
                   position: 'absolute',
                   zIndex:10,
                   left: `${item.position?.x}px`,
                   top: `${item.position?.y}px`,
                   transform:'translate(-50%, -50%)',
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
                   {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-b-2 border-dashed':''} relative`}  style={{backgroundColor:section.contentBackgroundColor}}>
           <Droppable id={`${section.id}content-column-3`} key={section.id}>
           {section.children.length > 0 && section.children.map((item: any) => (
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
                    {item.type=="Image" &&(
                    <img style={item.style}></img>
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
      <div className='h-32 w-full grid grid-cols-[0.5fr_3fr_0.5fr] '>
           <div className={` ${gridVisibility?'border-r-2  border-dashed':''} relative`}  style={{backgroundColor:selectedPage.footerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}footer-column-1`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}footer-column-1` && (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className={` ${gridVisibility?'border-r-2 border-dashed':''} relative`} style={{backgroundColor:selectedPage.footerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}footer-column-2`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}footer-column-2` && (
                   <div
                 key={item.id}
                 style={{
                   position: 'absolute',
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           <div className='relative' style={{backgroundColor:selectedPage.footerBackgroundColor}}>
           <Droppable id={`${selectedPage.id}footer-column-3`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`${selectedPage.id}footer-column-3` && (
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
                     {item.type=="Image" &&(
                    <img style={item.style}></img>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
           </div>
     </div>
    </div>
     

    
  );
}