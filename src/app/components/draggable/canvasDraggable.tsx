import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import { Resizable } from 're-resizable';
import pageState from '@/app/states/pageState';

export function CanvasDraggable(props: any) {
  // Recoil state for the selected item and dimensions of the resizable element
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(40);
  const [selectedPage, setSelectedPage] = useRecoilState(canvasState.selectedPageState);
  const [pages, setPages] = useRecoilState(pageState.pageState);
  // State to track if resizing mode is active
  const [isResizingMode, setResizingMode] = useState(false);

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

    // Add event listeners for keydown and keyup
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      // Clean up the event listeners when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Draggable hook setup
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    data: {
      type: 'items',
      data: { content: props.data },
    },
  });

  const dragstyle = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab', // Change cursor based on mode
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1, // Change opacity based on mode
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
    transform: CSS.Translate.toString(transform),
    border: '2px solid blue' 
  };

  const handleItemSelected = () => {
    if (selected && selected.id === props.id) {
      setSelected({ id: '', type: '', content: '' });
    } else {
      setSelected({
        id: props.id,
        type: props.data.type,
        content: props.data.content,
        style: props.data.style,
      });
    }
  };

  // Handling resize (real-time update)
  const onResize = (e: any, direction: any, ref: any, d: any) => {
    // Using ref to directly access the element's current size during resizing
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;

    // Update width and height during resize (real-time)
    setWidth(newWidth);
    setHeight(newHeight);

    // Update the selected state with the new dimensions in real-time
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        width: newWidth,  // Real-time width
        height: newHeight,  // Real-time height
      },
    });

    // Now, update the selectedPage with the new width and height in real-time
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === props.id) {
          return {
            ...item,
            style: {
              ...item.style,
              width: newWidth,  // Real-time width
              height: newHeight,  // Real-time height
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

    // Update selectedPage state with real-time updates
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

    // Update pages state
    setPages(updatedPages);
  };

  return (
    <>
      {selected.id !== props.id ? (
        <button onClick={handleItemSelected}>
          {props.children}
        </button>
      ) : (
        isResizingMode ? (
          // Resizable mode enabled
          <Resizable
            size={{ width: width, height: height }}
            onResize={onResize} // Real-time resize handler
            style={{
              cursor: 'nwse-resize',
                // Border applied to Resizable
            }}
           // Set a minimum height
          >
            {/* Inside div does not need a border anymore */}
            <div style={{border: '3px solid blue'}}>
              {props.children}
            </div>
          </Resizable>
        ) : (
          // Normal draggable mode
          <div
            ref={setNodeRef}
            style={dragstyle}
            {...listeners}
            {...attributes}
          >
            <div >
              {props.children}
            </div>
          </div>
        )
      )}
    </>
  );
}
