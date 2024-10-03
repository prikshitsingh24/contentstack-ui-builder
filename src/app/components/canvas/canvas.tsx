"use client"

import { Droppable } from "../droppable/droppable";

export default function Canvas({ items }: any) {

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="h-96 bg-blue-200 w-96 relative">
        <Droppable>
          {items.length > 0 && (
            items.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${item.position.x}px`, // Apply x position
                    top: `${item.position.y}px`,  // Apply y position
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {item.content}
                </div>
              );
            })
          )}
        </Droppable>
      </div>
    </div>
  );
}
