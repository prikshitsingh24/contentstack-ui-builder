import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
    data: {
      accepts: ['items'],
    },
  });

  const style = {
    color: isOver ? 'green' : undefined,
    height: '100%', // Ensure the height is 100% of the parent container
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
