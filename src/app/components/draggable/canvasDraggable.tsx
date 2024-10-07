import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import { Resizable } from 're-resizable';

export function CanvasDraggable(props: any) {
  // Recoil state for the selected item and dimensions of the resizable element
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);

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

  const style = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab', // Change cursor based on mode
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1, // Change opacity based on mode
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
  };

  const dragstyle = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab', // Change cursor based on mode
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1, // Change opacity based on mode
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
    transform: CSS.Translate.toString(transform),
    border:'2px solid blue',
    width:width,
    height:height
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

  // Handling resize
  const onResizeStop = (e: any, direction: any, ref: any, d: any) => {
    // Calculate the new width and height after resize
    const newWidth = width + d.width;
    const newHeight = height + d.height;
    setWidth(newWidth);
    setHeight(newHeight)

    // Update the selected state with the new dimensions
    setSelected({
        ...selected,
        width: newWidth,
        height: newHeight,
    });

    // Now, we will update the selectedPage with the new width and height in the correct section and item
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
        // If the section contains the item (i.e., the item is in this section's children)
        const updatedChildren = section.children.map((item: any) => {
            if (item.id === props.id) {
                // If the item matches, update its width and height
                return {
                    ...item,
                    width: newWidth,  // Update width
                    height: newHeight,  // Update height
                };
            }
            // Otherwise, return the item as is
            return item;
        });

        return {
            ...section,
            children: updatedChildren, // Update section's children with modified items
        };
    });

    // Update the selectedPage state with the modified children
    setSelectedPage({
        ...selectedPage,
        children: updatedSelectedPage, // The updated sections with updated item dimensions
    });
};

  const childrenStyle = {};

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
            onResizeStop={onResizeStop}
            style={{
              border: '2px solid blue',
              cursor: 'nwse-resize', // Show resize cursor when resizing
            }}
          >
            <div
              ref={setNodeRef}
              style={style}
            >
              <div style={childrenStyle}>
                {props.children}
              </div>
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
            <div style={childrenStyle}>
              {props.children}
            </div>
          </div>
        )
      )}
    </>
  );
}
