"use client";

import React, { useEffect,  useState } from 'react';
import { Droppable } from "../droppable/droppable";
import { CanvasDraggable } from '../draggable/canvasDraggable';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import pageState from '@/app/states/pageState';
import colorPickerState from '@/app/states/colorPickerState';
import contextMenuState from '@/app/states/contextMenuState';
import ContextMenu from '../contextMenu/contextMenu';
import addPage from '@/app/states/addPage';
import builderState from '@/app/states/builderState';
import { idGen } from '@/app/helper';

export default function Canvas() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [gridVisibility,_setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)
  const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  const [_colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [_backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
  const [_borderColorPicker,setBorderColorPicker]=useRecoilState(colorPickerState.borderColorPickerState)
  const [_headerbackgroundColorPicker,setheaderBackgroundColorPicker]=useRecoilState(colorPickerState.headerBackgroundColorPickerState);
  const [_contentbackgroundColorPicker,setContentBackgroundColorPicker]=useRecoilState(colorPickerState.contentBackgroundColorPickerState);
  const [_footerbackgroundColorPicker,setFooterBackgroundColorPicker]=useRecoilState(colorPickerState.footerBackgroundColorPickerState);
  const [gridColor,_setGridColor]=useRecoilState(canvasState.gridColorStatus);
  const [contextMenu,setContextMenu]=useRecoilState(contextMenuState.contextMenuState);
  const [positionX,setPositionX]=useState(0);
  const [positionY,setPositionY]=useState(0);
  const [_isResizingMode, setResizingMode] = useRecoilState(contextMenuState.resizingModeState)
  const [_addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
  const [isZoomedOut, _setIsZoomedOut] = useRecoilState(builderState.zoomState);
  


  const handleCanvasClick = (e: React.MouseEvent,section:any) => {
    // Prevent deselection if clicking on an actual item
    setBackgroundColorPicker(false);
    setBorderColorPicker(false);
    setColorPicker(false);
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(false);
    setAddPagePanel(false)
    if ((e.target as HTMLElement).closest('.draggable-item')) return;
    setSelectedSection(section);
    setSelected({});
  };


  const handleDuplicate=()=>{
    if(selected.id !=""){
      if(selected.over=="header"){
        const id:any=selected.id
        const parts = id.split("-");
        const word = parts[1];
        const duplicateId="header-"+word+`-${idGen()}`;
        let duplicateItem={};
        if(selected.type=="Image"){
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            src: selected.src,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }else{
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            content: selected.content,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }
       
        const updatedHeader = [...selectedPage.header || [], duplicateItem];
        
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
            setContextMenu(false);
      }else if(selected.over=="footer"){
        const id:any=selected.id
        const parts = id.split("-");
        const word = parts[1];
        const duplicateId="footer-"+word+`-${idGen()}`;
        let duplicateItem={};
        if(selected.type=="Image"){
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            src: selected.src,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }else{
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            content: selected.content,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }
       
        const updatedFooter = [...selectedPage.footer || [], duplicateItem];
        
            // Step 5: Update selectedPage with the new header
            setSelectedPage({ ...selectedPage, footer: updatedFooter });
            const updatedPages = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  footer: updatedFooter, // Update the header for the selected page
                };
              }
              return page; // Return other pages unchanged
            });
          
            // Step 7: Update the pages state with the modified pages array
            setPages(updatedPages);
            setContextMenu(false);
      
      }else{
        const id:any=selected.id
        const parts = id.split("-");
        const word = parts[0];
        const duplicateId=word+`-${idGen()}`;
        let duplicateItem={};
        if(selected.type=="Image"){
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            src: selected.src,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }else{
          duplicateItem={
            id:duplicateId ,
            type: selected.type,
            content: selected.content,
            over: selected.over,
            style:  selected.style,
            position:selected.position, // Set position for the new item
          }
        }
        const updatedSection=selectedPage?.children?.map((section)=>{
          if ((section.id+'-content') === selected.over){
            return{
              ...section,
              children: [...section.children || [], duplicateItem]
            }
          }
          return section;
        })
        if (updatedSection) {
          setSelectedPage({ ...selectedPage, children: updatedSection });
          const updatedPages = pages.map((page) => {
            if (page.id === selectedPage.id) {
              return {
                ...page,
                 children:updatedSection
              };
            }
            return page; // Return other pages unchanged
          });
    
          // Step 3: Update the selectedPage state with the updated sections
          setPages(updatedPages);
          setContextMenu(false);
        }
      }
    }
    
  }
 

  const handleDelete = () => {
    if(selectedSection.id && selectedPage.children && selectedPage.children.length>1){
      const updatedChildren = selectedPage?.children?.filter((section) => 
       section.id !== selectedSection.id
      );

      // Step 2: Update the selectedPage with the new children array
      setSelectedPage({
        ...selectedPage,
        children: updatedChildren,  // Set the updated children list
      });
      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            children:updatedChildren
          };
        }
        return page;
      });
      setPages(updatedPages);
      return;
    }
    if (selected.id?.slice(0,6)=="header") {
   
        const updatedChildren = selectedPage?.header?.filter((item: any) => item.id !== selected.id);
      if(updatedChildren){
        setSelectedPage({
          ...selectedPage,
          header:updatedChildren
        });
        const updatedPages = pages.map((page: any) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              header:updatedChildren
            };
          }
          return page;
        });
    
        setPages(updatedPages);
    
        // Clear the selected item state
        setSelected({});
        setSelectedSection({})
      }
  

      
    }else if(selected.id?.slice(0,6)=="footer"){
      const updatedChildren = selectedPage?.footer?.filter((item: any) => item.id !== selected.id);
      if(updatedChildren){
        setSelectedPage({
          ...selectedPage,
          footer:updatedChildren
        });
        const updatedPages = pages.map((page: any) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              footer:updatedChildren
            };
          }
          return page;
        });
    
        setPages(updatedPages);
    
        // Clear the selected item state
        setSelected({});
      }
    }
    else{
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
      const x = event.clientX;
      const y = event.clientY;
      const zoomScale = isZoomedOut ? 0.7 : 0;
      const adjustedX = (x)-zoomScale*200;
      const adjustedY = (y-50)-zoomScale*100;
      setPositionX(adjustedX);
      setPositionY(adjustedY);
      setContextMenu(true)
      // You can handle the context menu here, such as showing a custom menu
    };
    // Attach the right-click event listener
    if(selected && selected.id || selectedSection.id){
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

  const [horizontalSnapLines, setHorizontalSnapLines] = useRecoilState(builderState.horizontalSnapLineState);
  const [verticalSnapLines, setVerticalSnapLines] = useRecoilState(builderState.verticalSnapLineState);



  return (
    <div className='w-full h-full overflow-hidden relative border-2 border-black rounded-md'>
           {gridVisibility && <div className='absolute z-20 right-56 h-full border-r-2 border-dashed' style={{borderColor:gridColor}}></div> }
           {gridVisibility && <div className='absolute z-20 left-56 h-full border-r-2 border-dashed'  style={{borderColor:gridColor}}></div>}
      {contextMenu && (
        <div style={{position:'fixed',left:`${positionX}px`,top:`${positionY}px`,zIndex:'100'}}>
          <ContextMenu onDelete={handleDelete} onResize={handleResizeClick} onDuplicate={handleDuplicate} ></ContextMenu>
          </div>
      )}
     <div className='h-full w-full overflow-x-hidden overflow-y-scroll'>
     <div className='h-20 w-full'>
           <div className={`h-full w-full ${gridVisibility?'border-b-2 border-dashed':''} relative `} id={`header`} style={{backgroundColor:selectedPage.headerBackgroundColor,borderColor:gridColor}}>
           {horizontalSnapLines
            .filter((line:any) => line.selected === "header") // Filter lines where `selected` is "header"
            .map((line:any, index:any) => (
              <div
                key={`h-${index}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}

          {/* Vertical snap lines */}
          {verticalSnapLines
            .filter((line:any) => line.selected === "header") // Filter lines where `selected` is "header"
            .map((line:any, index) => (
              <div
                key={`v-${index}`}
                style={{
                  position: 'absolute',
                  left: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  top: 0,
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}
           
           <Droppable id={`header`} key={selectedPage.id}>
           {selectedPage?.header?.map((item: any) => (
                 item.over==`header` && (
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
                      <div style={{width:item.style.width,height:item.style.height}}>
                      <img src={item.src}  style={item.style}></img>
                    </div>
                   )}
                   {item.type=="Box" &&(
                    <div style={item.style}></div>
                   )}
                 </CanvasDraggable>
               </div>
                 )
             ))}
           </Droppable>
           </div>
          </div>
       {selectedPage?.children?.map((section:any) => (
         <div  className={`w-full h-full  ${selectedSection.id==section.id?'border-4 border-blue-700':''} `} key={section.id}  onClick={(e) => handleCanvasClick(e, section)}>
           <div className='h-full w-full '>
           <div className={`w-full h-full  ${gridVisibility?'border-b-2 border-dashed':''} relative`} id={`${section.id}-content`} style={{backgroundColor:section.contentBackgroundColor,borderColor:gridColor}}>
           {horizontalSnapLines
            .filter((line:any) => line.selected === `${section.id}-content`) // Filter lines where `selected` is "header"
            .map((line:any, index:any) => (
              <div
                key={`h-${index}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}

          {/* Vertical snap lines */}
          {verticalSnapLines
            .filter((line:any) => line.selected === `${section.id}-content`) // Filter lines where `selected` is "header"
            .map((line:any, index) => (
              <div
                key={`v-${index}`}
                style={{
                  position: 'absolute',
                  left: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  top: 0,
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}
           <Droppable id={`${section.id}-content`} key={section.id}>
           {section.children.length > 0 && section.children.map((item: any) => (
                 item.over==`${section.id}-content` && (
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
                    <div style={{width:item.style.width,height:item.style.height}}>
                      <img src={item.src}  style={item.style}></img>
                    </div>
                      
                   )}
                    {item.type=="Box" &&(
                    <div style={item.style}></div>
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
      <div className='h-32 w-full'>
           <div className={`h-32 w-full ${gridVisibility?'border-dashed':''} relative`} id={`footer`} style={{backgroundColor:selectedPage.footerBackgroundColor,borderColor:gridColor}}>
           {horizontalSnapLines
            .filter((line:any) => line.selected === 'footer') // Filter lines where `selected` is "header"
            .map((line:any, index:any) => (
              <div
                key={`h-${index}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}

          {/* Vertical snap lines */}
          {verticalSnapLines
            .filter((line:any) => line.selected === "footer") // Filter lines where `selected` is "header"
            .map((line:any, index) => (
              <div
                key={`v-${index}`}
                style={{
                  position: 'absolute',
                  left: `${line.position}px`, // Assuming `line.position` holds the snap line position
                  top: 0,
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: '9999',
                }}
              />
            ))}
           <Droppable id={`footer`} key={selectedPage.id}>
           {selectedPage?.footer?.map((item: any) => (
                 item.over==`footer` && (
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
                     <div style={{width:item.style.width,height:item.style.height}}>
                     <img src={item.src}  style={item.style}></img>
                   </div>
                   )}
                    {item.type=="Box" &&(
                    <div style={item.style}></div>
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