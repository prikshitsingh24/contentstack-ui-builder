"use client";
import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";
import data from "../../data.json"
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
import builderState from "./states/builderState";
import AddPageContainer from "./components/addPageContainer/addPageContainer";
import AddSectionContainer from "./components/addSectionContainer/addSectionContainer";
import arrowForwardLogo from "./images/arrowForwardLogo.png";
import Image from "next/image";

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
  const [preview,setPreview]=useRecoilState(builderState.previewState)
  const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [newPage,setNewPage]=useRecoilState(builderState.newPageState);
  const [newSection,setNewSection]=useRecoilState(builderState.newSectionState);
  const [isZoomedOut, setIsZoomedOut] = useRecoilState(builderState.zoomState);
  const [leftSidebarCollapsed,setLeftSidebarCollapsed]=useRecoilState(builderState.leftSidebarCollapsedState)

  const toggleZoom = () => {
    setIsZoomedOut((prev) => !prev); // Toggle between true (50%) and false (100%)
  };

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
        const zoom=isZoomedOut?0.7:1
        const x = (mousePosition.x - event.over.rect.left)/zoom;
        const y = (mousePosition.y - event.over.rect.top)/zoom;
        const position = { x, y };
    
        // Get the content and id of the dragged item
        const content = active.data.current.data.content;
        const id = active.id; // The item's id
    
        if (over.id === "header") {
          // Step 1: Find the index of the item in the header
          const existingItemInSection = selectedPage.children?.some((section: any) => {
            // Find the item in the section's children
            return section.children.findIndex((item: any) => item.id === id) !== -1;
          });
          
          if (existingItemInSection) {
            return; // Item exists, so exit the function
          }
          const existingItemIndex:any = selectedPage?.header?.findIndex((item: any) => item.id === id);
        
          if (existingItemIndex !== -1) {
            // Step 2: Item exists, update its position
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
        
        }else if(over.id === "footer"){

          const existingItemInSection = selectedPage.children?.some((section: any) => {
            // Find the item in the section's children
            return section.children.findIndex((item: any) => item.id === id) !== -1;
          });
          
          if (existingItemInSection) {
            return; // Item exists, so exit the function
          }
          const existingItemIndex:any = selectedPage?.footer?.findIndex((item: any) => item.id === id);
        
          if (existingItemIndex !== -1) {
            // Step 2: Item exists, update its position
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
              if(id==="image"){
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
  
      
    }, [headerBackgroundColor,contentBackgroundColor,footerBackgroundColor])
    
    const handleBackToEditorClick=()=>{
      setPreview(false);
      setGridVisibility(true);
    }
   
    const handlePreviewClick=()=>{
      setSelectedSection({});
      setGridVisibility(false);
      setPreview(!preview);
    }

    const exportToJson = () => {
      // Step 1: Convert the `pages` array to a JSON string
      const jsonString = JSON.stringify(pages, null, 2);  // `null, 2` is used for pretty-printing the JSON
    
      // Step 2: Create a Blob containing the JSON string
      const blob = new Blob([jsonString], { type: 'application/json' });
    
      // Step 3: Create a download link (anchor element)
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pages.json';  // Name the file "pages.json" when downloading
    
      // Step 4: Programmatically trigger the download by clicking the anchor element
      a.click();
    
      // Cleanup: Revoke the object URL after the download
      URL.revokeObjectURL(url);
    };

    if (preview) {
      return (
          <div className="h-screen overflow-hidden">
            <div className="flex h-12 pt-3 flex-row justify-end shadow-[1px_1px_5px_grey]">
              <div className="mr-10 text-blue-600  cursor-pointer " onClick={handleBackToEditorClick}>Back to editor</div>
            </div>
            <div className="mt-2 pl-2 pb-16 pr-2 w-full h-full overflow-hidden">
              <Canvas />
            </div>
          </div>
    
      );
    } else{
      return (
       <div className="h-screen overflow-hidden">
        {newPage && (
          <AddPageContainer></AddPageContainer>
        )}
        {newSection && (
          <AddSectionContainer></AddSectionContainer>
        )}
        <div className="w-full h-12 pt-3 shadow-[1px_3px_10px_grey]">
          <div className="flex flex-row justify-end mr-20 font-sans">
          <div className="mr-5 cursor-pointer" onClick={toggleZoom}>  {isZoomedOut ? "Zoom in" : "Zoom out"}</div>
            <div className="mr-5 cursor-pointer" onClick={handlePreviewClick}>Preview</div>
            <div className="cursor-pointer" onClick={exportToJson}>Export</div>
          </div>
        </div>
         <DndContext onDragEnd={handleDragEnd}>
          <div className="h-screen overflow-hidden">
            {leftSidebarCollapsed?(
              <div className={`fixed w-12 left-0 z-30 bottom-0 pb-2 top-14 transition-all duration-300 ease-in-out`}>
                <div className="h-full w-full bg-white shadow-[1px_3px_10px_grey] relative" onClick={()=>setLeftSidebarCollapsed(false)}>
                  <div className="absolute right-2 top-2" ><Image src={arrowForwardLogo} alt={"arrow back"} width={25}></Image></div>
                </div>
              </div>
            ):(
              <div className={`fixed w-52 left-0 z-30 bottom-0 pb-2 top-14 transition-all duration-300 ease-in-out`}>
              <Leftsidebar data={ui} />
              {addPagePanel && (
                <div className={`fixed bottom-0 pb-2 top-14 left-52 z-20 transition-transform duration-300 ease-in-out`}>
                  <AddPages />
                </div>
            )}

            </div>
            )}
            
            <div className="h-full mt-2  pl-2 pr-2 pb-16  w-full overflow-hidden transition-all duration-300 ease-in-out" style={{  transform: `scale(${isZoomedOut ? 0.7 : 1})`,   transformOrigin: "center center"  }} >
              <Canvas />
            </div>
            {selectedSection.id || selected.id ? (
              <div className="w-[250px] fixed z-20 bg-white bottom-0 pb-2 top-14 right-0 transition-all duration-300 ease-in-out">
              <Rightsidebar />
            </div>
            ):(
              <></>
            )}
          </div>
        </DndContext>
       </div>
      );
    }
}
