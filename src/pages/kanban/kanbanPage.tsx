import { useMemo, useState } from 'react';
import { PlusIcon } from './icons/PlusIcons';
import { Column, Id, Task } from './types';
import ColumnContainer from './components/ColumnContainer';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from './components/TaskCard';


const KanbanPage = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const columnsIds = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

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

        const newTasks = tasks.filter(t => t.columnId !== id)
        setTasks(newTasks)
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }

        setTasks([...tasks, newTask])
    }

    function deleteTask(taskId: Id) {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null)
        setActiveTask(null)


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

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return;

        const activeTaskId = active.id
        const overTaskId = over.id

        if (activeTaskId === overTaskId) return

        const isActiveATask = active.data.current?.type === "Task"
        const isOverATask = over.data.current?.type === "Task"

        if (!isActiveATask) return

        if (isActiveATask && isOverATask) {
            setTasks(() => {
              const activeTaskIndex = tasks.findIndex(t => t.id === activeTaskId)
              const overTaskIndex = tasks.findIndex(t => t.id === overTaskId)

              tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

              return arrayMove(tasks, activeTaskIndex, overTaskIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column"

        if (isActiveATask && isOverAColumn) {
            setTasks(() => {
                const activeTaskIndex = tasks.findIndex(t => t.id === activeTaskId)
  
                tasks[activeTaskIndex].columnId = overTaskId
  
                return arrayMove(tasks, activeTaskIndex, activeTaskIndex)
              })
        }


    }

    return (
        <div className="
            m-auto
            flex
            min-h-full
            w-full
            overflow-x-scroll
            overflow-y-hidden
            px-[40px]
        ">

            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                sensors={sensors}>
                <div className='flex gap-2'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsIds}>
                            {columns.map((col, i) => (
                                <ColumnContainer
                                    key={i}
                                    column={col}
                                    deleteColumn={() => deleteColumn(col.id)}
                                    createTask={createTask}
                                    tasks={tasks.filter(task => task.columnId === col.id)}
                                    deleteTask={deleteTask}
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
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                                deleteColumn={deleteColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                            />
                        )
                    }
                    {
                        activeTask && (
                            <TaskCard task={activeTask} deleteTask={deleteTask} />
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
