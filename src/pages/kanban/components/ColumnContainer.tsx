import { FC } from "react"
import { Column, Id, Task } from "../types"
import { TrashIcons } from "../icons/TrashIcons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { PlusIcon } from "../icons/PlusIcons"
import TaskCard from "./TaskCard"

interface Props {
    column: Column
    deleteColumn: (id: Id) => void

    tasks: Task[]
    createTask: (columnId: Id) => void
    deleteTask: (taskId: Id) => void
}
const ColumnContainer: FC<Props> = ({ column, deleteColumn, createTask, deleteTask, tasks }) => {

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
        bg-slate-950
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        opacity-60
        border-2
        border-rose-500
       "
        ></div>
    }



    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
           bg-slate-950
           w-[350px]
           h-[500px]
           max-h-[500px]
           rounded-md
           flex
           flex-col
          "
        >
            <div
                {...attributes}
                {...listeners}
                className="
            bg-slate-900
            text-md
            h-[60px]
            cursor-grab
            rounded-md
            rounded-b-none
            p-3
            font-bold
            border-slate-950
            border-4
            text-white
            flex
            items-center
            justify-between
            "
            >
                <div className="flex gap-2">
                    <div
                        className="
                     flex
                     justify-center
                     items-center
                     bg-slate-900
                     px-2
                     py-1
                     text-sm
                     rounded-full
                     "
                    >
                        0
                    </div>

                    {column.title}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id)
                    }}
                    className="
                stroke-gray-500
                hover:stroke-white
                hover:bg-slate-900
                rounded
                px-1
                py-1
                "
                >
                    <TrashIcons />
                </button>

            </div>

            <div className="
            flex 
            flex-grow 
            flex-col 
            gap-4 
            p-2 
            text-white
            overflow-x-hidden
            overflow-y-auto
            ">
                {
                    tasks.map((task, i) => {
                        return (
                            <TaskCard key={i} task={task} deleteTask={deleteTask}/>
                        )
                    })
                }
            </div>

            <button className="
            flex
            gap-2
            items-center
            border-2
            border-slate-900
            rounded-md
            p-4
            border-x-slate-900
            hover:bg-slate-950
            hover:text-rose-500
            active:bg-black
            text-white
            "
                onClick={() => {
                    createTask(column.id)
                }}
            >
                <PlusIcon />
                Add Task
            </button>
        </div>
    )
}

export default ColumnContainer