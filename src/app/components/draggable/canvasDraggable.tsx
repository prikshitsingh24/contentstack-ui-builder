import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import { Resizable } from 're-resizable';
import pageState from '@/app/states/pageState';
import contextMenuState from '@/app/states/contextMenuState';
import builderState from '@/app/states/builderState';

const ResizeHandle = ({ className }:any) => (
  <div className={`resize-handle ${className}`} />
);

export function CanvasDraggable(props: any) {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const widthWithUnit = props.data.style?.width;
  const heightWithUnit = props.data.style?.height;
  const numericWidth = widthWithUnit ? parseInt(widthWithUnit, 10) : 0;
  const numericHeight = heightWithUnit ? parseInt(heightWithUnit,10) : 0;
  const [width, setWidth] = useState(numericWidth || 300);
  const [height, setHeight] = useState(numericHeight || 200);
  const [selectedPage, setSelectedPage] = useRecoilState(canvasState.selectedPageState);
  const [pages, setPages] = useRecoilState(pageState.pageState);
  const [isResizingMode, setResizingMode] = useRecoilState(contextMenuState.resizingModeState);
  const [isZoomedOut, setIsZoomedOut] = useRecoilState(builderState.zoomState);

  // Event listener for the "R" key to toggle resizing mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setResizingMode(true); // Activate resizing mode
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setResizingMode(false); // Deactivate resizing mode
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    data: {
      type: 'items',
      data: { content: props.data },
    },
  }); 
  
  const zoomScale = isZoomedOut ? 0.7 : 1; // Apply 0.7 scaling if isZoomedOut is true, else 1

// Adjust the position based on the zoom level
const adjustedTransform = transform
  ? {
      x: transform.x / zoomScale, // Adjust for scaling on the X axis
      y: transform.y / zoomScale, // Adjust for scaling on the Y axis
      scaleX: zoomScale,          // Apply scaling on the X axis
      scaleY: zoomScale,          // Apply scaling on the Y axis
    }
  : { x: 0, y: 0, scaleX: zoomScale, scaleY: zoomScale };

// Construct the `transform` property including both translation and scaling
const draggableTransform = `translate(${adjustedTransform.x}px, ${adjustedTransform.y}px)`;


  const dragstyle = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab',
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1,
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
    transform: draggableTransform,
    border: '2px solid blue',
    zIndex: 1,
  };
  const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
  const handleItemSelected = () => {
    setSelectedSection({});
    if (selected && selected.id === props.id) {
      setSelected({ id: '', type: '', content: '' });
    } else {
      if((props.id).slice(0,5)==="image"){
        setSelected({
          id: props.id,
          type: props.data.type,
          src:props.src,
          style: props.data.style,
        });
      }else{
        setSelected({
          id: props.id,
          type: props.data.type,
          content: props.data.content,
          style: props.data.style,
        });
      }
    }
  };

  const onResize = (e: any, direction: any, ref: any, d: any) => {
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;

    setWidth(newWidth);
    setHeight(newHeight);

    setSelected({
      ...selected,
      style: {
        ...selected.style,
        width: newWidth,
        height: newHeight,
      },
    });

      if (selected.id?.slice(0,6)=="header") {
        const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
          if(selected.id===item.id){
            return{
              ...item,
              style: {
                ...item.style,
                width:newWidth,
                height:newHeight
              },
          }
        }
          return item;
        });
  
        setSelectedPage({
          ...selectedPage,
          header:updatedSelectedPage
        })
  
        const updatedPages = pages.map((page: any) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              header:updatedSelectedPage  // Update this page's children with the updated selectedPage
            };
          }
          return page;
        });
      
        setPages(updatedPages);
      
      }else if(selected.id?.slice(0,6)=="footer"){
        const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
          if(selected.id===item.id){
            return{
              ...item,
              style: {
                ...item.style,
                width:newWidth,
                height:newHeight
              },
          }
        }
          return item;
        });
  
        setSelectedPage({
          ...selectedPage,
          footer:updatedSelectedPage
        })
  
        const updatedPages = pages.map((page: any) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
            };
          }
          return page;
        });
      
        setPages(updatedPages);
      }else{
      const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
        const updatedChildren = section.children.map((item: any) => {
          if (item.id === props.id) {
            return {
              ...item,
              style: {
                ...item.style,
                width: newWidth,
                height: newHeight,
              },
            };
          }
          return item;
        });
  
        return {
          ...section,
          children: updatedChildren,
        };
      });
  
      setSelectedPage({
        ...selectedPage,
        children: updatedSelectedPage,
      });
  
      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            children: updatedSelectedPage,
          };
        }
        return page;
      });
  
      setPages(updatedPages);
    };
    }
    const handleClasses = "absolute w-3 h-3 bg-white border-2 border-red-400 rounded-full";

  return (
    <>
      {selected.id !== props.id ? (
        <button onClick={handleItemSelected}>
          {props.children}
        </button>
      ) : (
        isResizingMode ? (
          <div style={{border:'2px solid red',height:height+3,width:width+3}}>
            <Resizable
            size={{ width: width, height: height }}
            onResize={onResize} // Real-time resize handler
            onResizeStop={()=>setResizingMode(false)}
            style={{
              cursor: 'nwse-resize',
            }}
            minWidth={20} // Minimum width to prevent the box from resizing too small
            minHeight={20} // Minimum height to prevent the box from resizing too small
            handleStyles={{
              topRight: { zIndex: 10 },
              bottomRight: { zIndex: 10 },
              bottomLeft: { zIndex: 10 },
              topLeft: { zIndex: 10 },
            }}
            handleComponent={{
              topRight: <div className={`${handleClasses} top-0 right-0 cursor-ne-resize`} />,
              bottomRight: <div className={`${handleClasses} -bottom-0 -right-0 cursor-se-resize`} />,
              bottomLeft: <div className={`${handleClasses} -bottom-0 -left-0 cursor-sw-resize`} />,
              topLeft: <div className={`${handleClasses} -top-0 -left-0 cursor-nw-resize`} />,
              top: <div className={`${handleClasses} -top-2 left-1/2 -translate-x-1/2 cursor-n-resize`} />,
              right: <div className={`${handleClasses} -right-2 top-1/2 -translate-y-1/2 cursor-e-resize`} />,
              bottom: <div className={`${handleClasses} -bottom-2 left-1/2 -translate-x-1/2 cursor-s-resize`} />,
              left: <div className={`${handleClasses} -left-2 top-1/2 -translate-y-1/2 cursor-w-resize`} />,
            }}
          >
            <div>
              {props.children}
            </div>
          </Resizable>
          </div>
          
        ) : (
          <div
            ref={setNodeRef}
            style={dragstyle}
            {...listeners}
            {...attributes}
          >
            <div style={{ width: '100%', height: '100%' }}>
              {props.children}
            </div>
          </div>
        )
      )}
    </>
  );
}
