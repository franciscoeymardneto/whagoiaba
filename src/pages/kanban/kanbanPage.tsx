import { useMemo, useState } from 'react';
import { PlusIcon } from './icons/PlusIcons';
import { Column, Id, Task } from './types';
import ColumnContainer from './components/ColumnContainer';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

const initialData = {
    columns: {
        'todo': {
            id: 'todo',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        'inProgress': {
            id: 'inProgress',
            title: 'In Progress',
            taskIds: []
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: []
        }
    },
    tasks: {
        'task-1': { id: 'task-1', content: 'Task 1' },
        'task-2': { id: 'task-2', content: 'Task 2' },
        'task-3': { id: 'task-3', content: 'Task 3' }
    }
};


const KanbanPage = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const columnsIds = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3 // 3p
            }
        })
    )


    function createColumn() {
        const newColumn: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        }

        setColumns([...columns, newColumn])
    }

    function deleteColumn(id: Id) {
        const newColumns = columns.filter(col => col.id !== id)

        setColumns(newColumns)
    }

    function createTask(columnId: Id) {
       const newTask: Task = {
        id: generateId(),
        columnId,
        content: `Task ${tasks.length - 1}`
       }

       setTasks([...tasks,newTask])
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
         const { active, over } = event
         if (!over) return;

         const activeColumnId = active.id
         const overColumnId = over.id

         if (activeColumnId === overColumnId) return

         setColumns(() => {
            const activeColumnIndex = columns.findIndex(
                col => col.id === activeColumnId
            )

            const overColumnIndex = columns.findIndex(
                col => col.id === overColumnId
            )

            return arrayMove(columns,activeColumnIndex, overColumnIndex )
         })
    }

    return (
        <div className="
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-scroll
            overflow-y-hidden
            px-[40px]
        ">

            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
                <div className='m-auto flex gap-2'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsIds}>
                            {columns.map((col, i) => (
                                <ColumnContainer
                                    key={i}
                                    column={col}
                                    deleteColumn={() => deleteColumn(col.id)}
                                    createTask={createTask}
                                    tasks={tasks.filter(task => task.id === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        className='
                        h-[60px]
                        w-[350px]
                        min-w-[350px]
                        cursor-pointer
                        rounded-lg
                        bg-black
                        border-2
                        border-black
                        p-4
                        ring-rose-500
                        hover:ring-2
                        flex
                        gap-2
                        text-white
                    '
                        onClick={() => {
                            createColumn()
                        }}
                    >
                        <PlusIcon />
                        Add Column
                    </button>
                </div>
               {createPortal(<DragOverlay>
                    {
                        activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                tasks={tasks.filter(task => task.id === activeColumn.id)}
                                deleteColumn={deleteColumn}
                                createTask={createTask}
                            />
                        )
                    }
                </DragOverlay>, document.body)}
            </DndContext>
        </div>
    )
}

export default KanbanPage

function generateId() {
    return Math.floor(Math.random() * 10001)
}
