import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from './icons/PlusIcons';
import { Column, Id } from './types';
import ColumnContainer from './components/ColumnContainer';

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
    const [data, setData] = useState(initialData);
    const [columns, setColumns] = useState<Column[]>([]);


    function createColumn() {
       const newColumn: Column = {
        id: generateId(),
        title: `Column ${columns.length +1}`
       }

       setColumns([...columns,newColumn])
    }

    function deleteColumn(id: Id) {
        const newColumns = columns.filter(col => col.id !== id)

        setColumns(newColumns)
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
            <div className='m-auto flex gap-2'>
                <div className='flex gap-4'>
                   {columns.map((col,i) => (
                    <ColumnContainer 
                    key={i} 
                    column={col}
                    deleteColumn={() => deleteColumn(col.id)}
                    />
                   ))}
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
                    <PlusIcon/>
                    Add Column
                </button>
            </div>
          
        </div>
    )
}

export default KanbanPage

function generateId() {
    return Math.floor(Math.random() * 10001)
}
