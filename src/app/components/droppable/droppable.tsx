import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
    data: {
      accepts: ['items'],
    },
  });

  const style = {
    backgroundColor: isOver ? 'rgba(140, 255, 50, 0.5)' : 'grey',
    height: '100%', // Ensure the height is 100% of the parent container
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
