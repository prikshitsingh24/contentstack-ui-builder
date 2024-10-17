import React, { useState, useEffect, useRef } from 'react';
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

const SNAP_THRESHOLD = 15;

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
  const [horizontalSnapLines, setHorizontalSnapLines] = useRecoilState(builderState.horizontalSnapLineState);
  const [verticalSnapLines, setVerticalSnapLines] = useRecoilState(builderState.verticalSnapLineState);
  const elementRef=useRef<any>();
  const [relativePos,setRelativePos]=useState<any>();
  const [
    mousePosition,
    setMousePosition
  ] = useRecoilState(builderState.mousePositionState);
  const [snapPosition, setSnapPosition] = useState({ x: 0, y: 0 });

  
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

const SNAP_THRESHOLD = 15;

const checkSnapping = (x: number, y: number) => {
  const elementWidth: any = selected?.style?.width;
  const elementHeight: any = selected?.style?.height;
  const element: any = document.getElementById(selected.over || " ");
  const canvasWidth: number = element?.offsetWidth || 0;
  const canvasHeight: number = element?.offsetHeight || 0;
  const centerX: number = canvasWidth / 2;
  const centerY: number = canvasHeight / 2;
  const elementLeft = x;
  const elementRight = x + (parseFloat(elementWidth));
  const elementTop = y;
  const elementBottom = y + (parseFloat(elementHeight));
  const elementCenterX = (elementLeft + elementRight) / 2;
  const elementCenterY = (elementTop + elementBottom) / 2;
  const mouseCenterX = mousePosition.x;
  const mouseCenterY = mousePosition.y;

  let vLines: { position: number; selected?: string }[] = [];
  let hLines: { position: number; selected?: string }[] = [];

  if (Math.abs(mouseCenterX - centerX) <= SNAP_THRESHOLD) {
    vLines = [...vLines, { position: centerX, selected: selected.over }];  // Create a new array with the new element

    setVerticalSnapLines((prevVLines: any) => {
      return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
        ? vLines
        : prevVLines;
    });

    setHorizontalSnapLines((prevHLines: any) => {
      return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
        ? hLines
        : prevHLines;
    });

    const snappedX = vLines.length > 0 ? vLines[0].position : x;
    const snappedY = hLines.length > 0 ? hLines[0].position : y;
    let differential=0;
    if(selected.over=="header"){
      differential=50;
    }else if(selected.over=="footer"){
      differential=690
    }else{
      differential=130
    }
    return { x: snappedX, y: snappedY-differential };
  }


  if (Math.abs(mouseCenterY - centerY) <= SNAP_THRESHOLD) {
    hLines = [...hLines, { position: centerY, selected: selected.over }];  // Create a new array with the new element

    setVerticalSnapLines((prevVLines: any) => {
      return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
        ? vLines
        : prevVLines;
    });

    setHorizontalSnapLines((prevHLines: any) => {
      return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
        ? hLines
        : prevHLines;
    });

    const snappedX = vLines.length > 0 ? vLines[0].position : x;
    const snappedY = hLines.length > 0 ? hLines[0].position : y;

    return { x: snappedX, y: snappedY};
  }

  // Iterate through other elements and check snapping to their boundaries
  if (selected.over === "header") {
    selectedPage?.header?.forEach((item) => {
      if (selected.id === item.id) {
        return; // Skip the currently selected item
      }

      const itemStyle = item?.style || {};
      const itemLeft: number = item?.position?.x || 0;
      const itemWidth: number = parseFloat(itemStyle?.width || '0');
      const itemRight: number = itemLeft + itemWidth;
      const itemTop: number = item?.position?.y || 0;
      const itemHeight: number = parseFloat(itemStyle?.height || '0');
      const itemBottom: number = itemTop + itemHeight;

      // Vertical snap check (left and right)
      if (Math.abs(elementLeft - itemLeft) <= SNAP_THRESHOLD ||
          Math.abs(elementRight - itemLeft) <= SNAP_THRESHOLD) {
        vLines = [...vLines, { position: itemLeft, selected: selected.over }];  // Create a new array with the new element

        setVerticalSnapLines((prevVLines: any) => {
          return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
            ? vLines
            : prevVLines;
        });

        setHorizontalSnapLines((prevHLines: any) => {
          return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
            ? hLines
            : prevHLines;
        });

        const snappedX = vLines.length > 0 ? vLines[0].position : x;
        const snappedY = hLines.length > 0 ? hLines[0].position : y;
        
        return { x: snappedX, y: snappedY-50 };
      }

      // Horizontal snap check (top and bottom)
      if (Math.abs(elementTop - itemTop - 40) <= SNAP_THRESHOLD ||
          Math.abs(elementBottom - itemTop - 40) <= SNAP_THRESHOLD) {
        hLines = [...hLines, { position: itemTop, selected: selected.over }];  // Create a new array with the new element

        setVerticalSnapLines((prevVLines: any) => {
          return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
            ? vLines
            : prevVLines;
        });

        setHorizontalSnapLines((prevHLines: any) => {
          return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
            ? hLines
            : prevHLines;
        });

        const snappedX = vLines.length > 0 ? vLines[0].position : x;
        const snappedY = hLines.length > 0 ? hLines[0].position : y;

        return { x: snappedX, y: snappedY };
      }
    });
  } else if (selected.over === "footer") {
    selectedPage?.footer?.forEach((item) => {
      if (selected.id === item.id) {
        return; // Skip the currently selected item
      }

      const itemStyle = item?.style || {};
      const itemLeft: number = item?.position?.x || 0;
      const itemWidth: number = parseFloat(itemStyle?.width || '0');
      const itemRight: number = itemLeft + itemWidth;
      const itemTop: number = item?.position?.y || 0;
      const itemHeight: number = parseFloat(itemStyle?.height || '0');
      const itemBottom: number = itemTop + itemHeight;

      if (Math.abs(elementTop - itemTop-790 ) <= SNAP_THRESHOLD ||
          Math.abs(elementBottom - itemTop-790) <= SNAP_THRESHOLD) {
        hLines = [...hLines, { position: itemTop, selected: selected.over }];  // Create a new array with the new element

        setVerticalSnapLines((prevVLines: any) => {
          return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
            ? vLines
            : prevVLines;
        });

        setHorizontalSnapLines((prevHLines: any) => {
          return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
            ? hLines
            : prevHLines;
        });

        const snappedX = vLines.length > 0 ? vLines[0].position : x;
        const snappedY = hLines.length > 0 ? hLines[0].position : y;

        return { x: snappedX, y: snappedY};
      }
    });
  }else{
    selectedPage?.children?.forEach((section) => {
      section?.children?.map((item)=>{
        if (selected.id === item.id) {
          return; // Skip the currently selected item
        }
  
        const itemStyle = item?.style || {};
        const itemLeft: number = item?.position?.x || 0;
        const itemWidth: number = parseFloat(itemStyle?.width || '0');
        const itemRight: number = itemLeft + itemWidth;
        const itemTop: number = item?.position?.y || 0;
        const itemHeight: number = parseFloat(itemStyle?.height || '0');
        const itemBottom: number = itemTop + itemHeight;
  
        // Vertical snap check (left and right)
        if (Math.abs(elementLeft - itemLeft) <= SNAP_THRESHOLD ||
            Math.abs(elementRight - itemLeft) <= SNAP_THRESHOLD) {
          vLines = [...vLines, { position: itemLeft, selected: selected.over }];  // Create a new array with the new element
  
          setVerticalSnapLines((prevVLines: any) => {
            return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
              ? vLines
              : prevVLines;
          });
  
          setHorizontalSnapLines((prevHLines: any) => {
            return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
              ? hLines
              : prevHLines;
          });
  
          const snappedX = vLines.length > 0 ? vLines[0].position : x;
          const snappedY = hLines.length > 0 ? hLines[0].position : y;
  
          return { x: snappedX, y: snappedY-130 };
        }
  
        // Horizontal snap check (top and bottom)
        if (Math.abs(elementTop - itemTop - 130) <= SNAP_THRESHOLD ||
            Math.abs(elementBottom - itemTop - 130) <= SNAP_THRESHOLD) {
          hLines = [...hLines, { position: itemTop, selected: selected.over }];  // Create a new array with the new element
  
          setVerticalSnapLines((prevVLines: any) => {
            return vLines.length !== prevVLines.length || !vLines.every((line, index) => line.position === prevVLines[index].position)
              ? vLines
              : prevVLines;
          });
  
          setHorizontalSnapLines((prevHLines: any) => {
            return hLines.length !== prevHLines.length || !hLines.every((line, index) => line.position === prevHLines[index].position)
              ? hLines
              : prevHLines;
          });
  
          const snappedX = vLines.length > 0 ? vLines[0].position : x;
          const snappedY = hLines.length > 0 ? hLines[0].position : y;
  
          return { x: snappedX, y: snappedY};
        }
      });
      })
      
  }

    return { x:0, y:0 };
  
};

const [snapPoints,setSnapPoints]=useRecoilState(builderState.snapPointsStatus)

useEffect(() => {
  if(isDragging){
    const { x: newX, y: newY } = checkSnapping(mousePosition.x, mousePosition.y);
    setSnapPoints({x:newX,y:newY})
  }
}, [mousePosition]);

const adjustedTransform = transform
  ? {
      x: transform.x / zoomScale, // Adjust for scaling on the X axis
      y: transform.y / zoomScale, // Adjust for scaling on the Y axis
      scaleX: zoomScale,          // Apply scaling on the X axis
      scaleY: zoomScale,          // Apply scaling on the Y axis
    }
  : { x: 0, y: 0, scaleX: zoomScale, scaleY: zoomScale };

// Construct the `transform` property including both translation and scaling
const draggableTransform = `translate(${adjustedTransform.x}px, ${adjustedTransform.y}px) `;


  const dragstyle = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab',
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1,
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
    transform: draggableTransform,
    border: '2px solid blue',
    zIndex: 1,
    height:'100%',
    width:'100%'
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
          over:props.data.over,
          position:{x:props.data.position.x,y:props.data.position.y}
        });
      }else{
        setSelected({
          id: props.id,
          type: props.data.type,
          content: props.data.content,
          style: props.data.style,
          over:props.data.over,
          position:{x:props.data.position.x,y:props.data.position.y}
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
        <button onClick={handleItemSelected} >
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
          ref={(node) => {
            setNodeRef(node);
            elementRef.current = node;
          }}
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
