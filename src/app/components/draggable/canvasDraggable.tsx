import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import canvasState from '@/app/states/canvasState';

export function CanvasDraggable(props: any) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.id,
        data: {
            type: "items",
            data: { content: props.data }
        },
    });

    // Get the selected item state from Recoil
    const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);

    // Compute the style for the draggable item
    const style = {
        transform: CSS.Translate.toString(transform),
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        border: selected && selected.id === props.id ? '1px solid blue' : 'none',  // Apply border if item is selected
        padding: selected && selected.id === props.id ? '5px' : '',  // Add padding if item is selected
        borderRadius: selected && selected.id === props.id ? '3px' : '0',

    };

    // Handler to select the current item
    const handleItemSelected = () => {
        if (selected && selected.id === props.id) {
            // If the item is already selected, unselect it (optional behavior)
            setSelected({id:"",content:""});
        } else {
            // Select the current item
            setSelected({
                id: props.id,
                content: props.data
            });
        }
    };

    return (
        <>
        {selected.id!=props.id?(
            <button onClick={handleItemSelected}>
            {props.children}
        </button>
        ):(
            <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
        )}
       
       
       </>
    );
}
