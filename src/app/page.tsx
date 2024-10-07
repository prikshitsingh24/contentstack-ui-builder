"use client";
import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";
import data from "../../data.json";
import { useEffect, useRef, useState } from "react";
import {DndContext} from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import { useRecoilState } from "recoil";
import canvasState from "./states/canvasState";
import AddPages from "./components/addPages/addPages";
import addPage from "./states/addPage";
import pageState from "./states/pageState";
import sectionState from "./states/sectionState";

interface DraggableItem {
  id: string; // Unique identifier for the item
  content: string; // The content of the item (text, etc.)
  position: { x: number; y: number }; // The position where the item is dropped
}

export default function Home() {
  const [ui, setUi] = useState<any>(() => data);
  const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
  const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
  const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.contentBackgroundColorState);
  const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.footerBackgroundColorState);
  const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
  
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
        // Calculate the drop position relative to the section
        const x = mousePosition.x - event.over.rect.left;
        const y = mousePosition.y - event.over.rect.top;
        const position = { x, y };
    
        // Get the content and id of the dragged item
        const content = active.data.current.data.content;
        const id = active.id; // The item's id
    
        // Update the selectedPage's children (sections) and their respective children (dropped items)
        const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
            const existingItemIndex = section.children.findIndex((item: any) => item.id === id);
    
            if (existingItemIndex !== -1) {
              // The item exists in the section, update its position
              const updatedItems = [...section.children];
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                position, // Update position of the existing item
              };
              return {
                ...section,
                children: updatedItems, // Update section's children with modified items
              };
            } else {
              // The item doesn't exist, create a new one and add it to section's children
              const updatedId = id + `-${uuidv4()}`;
              return {
                ...section,
                children: [
                  ...section.children,
                  {
                    id: updatedId,
                    type: content.type,
                    content: content.content,
                    over: event.over.id,
                    style: content.style,
                    position, // Set position for new item
                  },
                ],
              };
            }
        });
    
        if (updatedSelectedPage) {
          setSelectedPage({ ...selectedPage, children: updatedSelectedPage });
          const updatedPages = pages.map((page) => {
            if (page.id === selectedPage.id) {
              return {
                ...page,
                 children:updatedSelectedPage
              };
            }
            return page; // Return other pages unchanged
          });
    
          // Step 3: Update the selectedPage state with the updated sections
          setPages(updatedPages);
        }
      }
    };

    useEffect(()=>{
      if(pages.length==0){
        const updatedSection = {
          id: "section-"+`${uuidv4()}`,
          headerBackgroundColor: headerBackgroundColor, // Optional, can be modified later
          contentBackgroundColor:contentBackgroundColor,
          footerBackgroundColor: footerBackgroundColor,
          children: droppedItems,
        };
      
        const updatedPage={
          id:"page-"+"home",
          children:[updatedSection]
        }
        setPages([updatedPage])
        setSelectedPage(updatedPage);
      }else{
        const updatedSection= selectedPage.children?.map((section,index)=>{
          if(section.id===selectedSection.id){
            return {
                    ...section,
                    headerBackgroundColor: headerBackgroundColor, // Optional, can be modified later
                    contentBackgroundColor: contentBackgroundColor,
                    footerBackgroundColor: footerBackgroundColor,
                  };
          }
          return section;
        })
        // Step 2: Update the selected page to include the updated section
        const updatedPages = pages.map((page) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              children: updatedSection, // Update only the children of the selected page
            };
          }
          return page; // Return other pages unchanged
        });
  
        // Step 3: Update the selectedPage state with the updated sections
        setPages(updatedPages);
        setSelectedPage({
          ...selectedPage,
          children: updatedSection, // Update the selectedPage's children with the updated section
        });
      }
      
    }, [headerBackgroundColor,contentBackgroundColor,footerBackgroundColor])
    
  return (
    <DndContext onDragEnd={handleDragEnd} >
      <div className="grid grid-cols-[1fr_6fr_1.5fr] gap-3 h-screen overflow-hidden">
        {/* Left sidebar with draggable items */}
        <div>
          <Leftsidebar data={ui}/>
          {addPagePanel &&(
            <div className="h-full fixed bottom-0 left-60 z-20 "><AddPages></AddPages></div>
          )}
        </div>
        {/* Canvas to drop the item */}
        <div className="mt-2 w-full h-full overflow-hidden">
          <Canvas items={droppedItems}/>
        </div>
        <div>
          <Rightsidebar />
        </div>
      </div>
      </DndContext>
  );
}
