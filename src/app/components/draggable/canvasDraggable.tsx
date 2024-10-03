import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function CanvasDraggable(props: any) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.id,
        data: {
            type: "items",
            data: { content: props.data }
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}