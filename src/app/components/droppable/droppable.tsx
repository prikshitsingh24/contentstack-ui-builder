import canvasState from '@/app/states/canvasState';
import { useDroppable } from '@dnd-kit/core';
import { useRecoilState } from 'recoil';

export function Droppable(props: any) {
  const [sectionBackgroundColor,setSectionBackgroundColor]=useRecoilState(canvasState.sectionBackgroundColorState);
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: ['items'],
    },
  });

  const style = {
    backgroundColor: isOver ? (props.id=="header-column-1" || props.id=="header-column-2" || props.id=="header-column-3" ) ?'rgba(140, 255, 50, 0.5)' : sectionBackgroundColor ? 
    (props.id=="content-column-1" || props.id=="content-column-2" || props.id=="content-column-3" )?'rgba(140, 140, 50, 0.5)':sectionBackgroundColor?
    (props.id=="footer-column-1" || props.id=="footer-column-2" || props.id=="footer-column-3" )?'rgba(240, 10, 50, 0.5)':sectionBackgroundColor:sectionBackgroundColor:sectionBackgroundColor:sectionBackgroundColor,
    height: '100%', // Ensure the height is 100% of the parent container
    width:'100%'
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
