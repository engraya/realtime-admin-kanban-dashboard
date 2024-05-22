import { TASK_STAGES_QUERY, TASKS_QUERY } from '@/graphql/queries';
import { TaskStage } from '@/graphql/schema.types';
import { DragOverlay, UseDraggableArguments, useDraggable } from '@dnd-kit/core'
import { useList } from '@refinedev/core';
import React from 'react';

interface Props {
  id : string;
  data? : UseDraggableArguments['data']
}

function KanbanItem({ children, id,  data } : React.PropsWithChildren<Props>) {



  const { attributes , listeners, setNodeRef, active } = useDraggable({
    id,
    data 
})
  return (
    <div
    style={{ position : 'relative'}}
    >
      <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        opacity : active ? (active.id === id ? 1 : 0.5) : 1,
        borderRadius : '8px',
        position : 'relative',
        cursor : 'grab'
      }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
            style={{
              borderRadius : '8px',
              boxShadow : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              cursor : 'grabbing'
            }}
            >
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>

    </div>
  )
}

export default KanbanItem
