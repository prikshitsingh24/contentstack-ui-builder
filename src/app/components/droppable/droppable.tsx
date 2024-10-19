
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: ['items'],
    },
  });

  const style = {
    height: '100%', // Ensure the height is 100% of the parent container
    width:'100%',
    backgroundColor:isOver?'#F9EBA0':''
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
