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
    console.log(event)
      if (over) {
        // Calculate the drop position relative to the section
        const x = mousePosition.x - event.over.rect.left;
        const y = mousePosition.y - event.over.rect.top;
        const position = { x, y };
    
        // Get the content and id of the dragged item
        const content = active.data.current.data.content;
        const id = active.id; // The item's id
    
        if (over.id === "header-column-1" || over.id === "header-column-2" || over.id === "header-column-3") {
          // Step 1: Find the index of the item in the header
          const existingItemIndex:any = selectedPage?.header?.findIndex((item: any) => item.id === id);
        
          if (existingItemIndex !== -1) {
            // Step 2: Item exists, update its position
            console.log("Updating position for item with id:", id);
            const updatedHeader = [...selectedPage.header || []]; // Clone the header to update
            updatedHeader[existingItemIndex] = {
              ...updatedHeader[existingItemIndex],
              position, // Update position of the existing item
            };
        
            // Step 3: Update selectedPage with the modified header
            setSelectedPage({ ...selectedPage, header: updatedHeader });
            const updatedPages = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  header: updatedHeader, // Update the header for the selected page
                };
              }
              return page; // Return other pages unchanged
            });
          
            // Step 7: Update the pages state with the modified pages array
            setPages(updatedPages);
        
          } else {
            const updatedId = "header-"+id + `-${uuidv4()}`;
            const newItem = {
              id: updatedId,
              type: content.type,
              content: content.content,
              over: event.over.id,
              style: content.style,
              position, // Set position for the new item
            };
        
            // Clone the header and add the new item to it
            const updatedHeader = [...selectedPage.header || [], newItem];
        
            // Step 5: Update selectedPage with the new header
            setSelectedPage({ ...selectedPage, header: updatedHeader });
            const updatedPages = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  header: updatedHeader, // Update the header for the selected page
                };
              }
              return page; // Return other pages unchanged
            });
          
            // Step 7: Update the pages state with the modified pages array
            setPages(updatedPages);
          }
        
        }else if(over.id === "footer-column-1" || over.id === "footer-column-2" || over.id === "footer-column-3"){
          const existingItemIndex:any = selectedPage?.footer?.findIndex((item: any) => item.id === id);
        
          if (existingItemIndex !== -1) {
            // Step 2: Item exists, update its position
            console.log("Updating position for item with id:", id);
            const updatedFooter = [...selectedPage.footer || []]; // Clone the header to update
            updatedFooter[existingItemIndex] = {
              ...updatedFooter[existingItemIndex],
              position, // Update position of the existing item
            };
        
            // Step 3: Update selectedPage with the modified header
            setSelectedPage({ ...selectedPage, footer: updatedFooter });
            const updatedPages = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  footer:updatedFooter, // Update the header for the selected page
                };
              }
              return page; // Return other pages unchanged
            });
          
            // Step 7: Update the pages state with the modified pages array
            setPages(updatedPages);
        
          } else {
            const updatedId = "footer-"+id +`-${uuidv4()}`;
            const newItem = {
              id: updatedId,
              type: content.type,
              content: content.content,
              over: event.over.id,
              style: content.style,
              position, // Set position for the new item
            };
        
            // Clone the header and add the new item to it
            const updatedFooter = [...selectedPage.footer || [], newItem];
        
            // Step 5: Update selectedPage with the new header
            setSelectedPage({ ...selectedPage, footer: updatedFooter });
            const updatedPages = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  footer:updatedFooter // Update the header for the selected page
                };
              }
              return page; // Return other pages unchanged
            });
          
            // Step 7: Update the pages state with the modified pages array
            setPages(updatedPages);
          }
        }
        
        else{
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
              console.log(id)
              if(id==="image"){
                console.log("asdfdf")
                return {
                  ...section,
                  children: [
                    ...section.children,
                    {
                      id: updatedId,
                      type: content.type,
                      src:" ",
                      over: event.over.id,
                      style: content.style,
                      position, // Set position for new item
                    },
                  ],
                };
              }else{
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
       
      }
    };

    useEffect(()=>{
      if(pages.length==0){
        const updatedSection = {
          id: "section-"+`${uuidv4()}`,
          contentBackgroundColor:contentBackgroundColor,
          children: droppedItems,
        };
      
        const updatedPage={
          id:"page-"+"home",
          headerBackgroundColor:headerBackgroundColor,
          footerBackgroundColor:footerBackgroundColor,
          header:droppedItems,
          footer:droppedItems,
          children:[updatedSection]
        }
        setPages([updatedPage])
        setSelectedPage(updatedPage);
      }else{
        const updatedSection= selectedPage.children?.map((section,index)=>{
          if(section.id===selectedSection.id){
            return {
                    ...section,
                    contentBackgroundColor: contentBackgroundColor,
                  };
          }
          return section;
        })
        // Step 2: Update the selected page to include the updated section
        const updatedPages = pages.map((page) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              footerBackgroundColor:footerBackgroundColor,
              headerBackgroundColor:headerBackgroundColor,
              children: updatedSection, // Update only the children of the selected page
            };
          }
          return page; // Return other pages unchanged
        });
  
        // Step 3: Update the selectedPage state with the updated sections
        setPages(updatedPages);
        setSelectedPage({
          ...selectedPage,
          footerBackgroundColor:footerBackgroundColor,
          headerBackgroundColor:headerBackgroundColor,
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
        <div className="mt-2 w-full max-h-fit overflow-hidden">
          <Canvas/>
        </div>
        <div>
          <Rightsidebar />
        </div>
      </div>
      </DndContext>
  );
}
