import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';
import { Resizable } from 're-resizable';
import pageState from '@/app/states/pageState';
import contextMenuState from '@/app/states/contextMenuState';

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
  const [isResizingMode, setResizingMode] = useRecoilState(contextMenuState.resizingModeState)

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

  const dragstyle = {
    cursor: isResizingMode ? 'nwse-resize' : isDragging ? 'grabbing' : 'grab',
    opacity: isResizingMode ? 0.7 : isDragging ? 0.5 : 1,
    borderRadius: selected && selected.id === props.id ? '3px' : '0',
    transform: CSS.Translate.toString(transform),
    border: '2px solid blue',
    zIndex: 1,
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
            minWidth={50} // Minimum width to prevent the box from resizing too small
            minHeight={50} // Minimum height to prevent the box from resizing too small
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
