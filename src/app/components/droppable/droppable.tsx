import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: ['items'],
    },
  });

  const style = {
    backgroundColor: isOver ? 'rgba(140, 255, 50, 0.5)' : 'white',
    height: '100%', // Ensure the height is 100% of the parent container
    width:'100%'
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
