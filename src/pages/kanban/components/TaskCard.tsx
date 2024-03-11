import { FC, useState } from "react";
import { Id, Task } from "../types";
import { TrashIcons } from "../icons/TrashIcons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

interface Props {
    task: Task

    deleteTask: (id: Id) => void
}
const TaskCard: FC<Props> = ({ task, deleteTask }): JSX.Element => {
    const [mouseIsOver, setMouseIsOver] = useState(false)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
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
        className="
        bg-slate-900
        p-2.5s
        h-[100px]
        min-h-[100px]
        items-center
        flex
        text-left
        text-white
        rounded-xl
        border-2
        border-rose-500
        opacity-30
        cursor-grab
        relative
        "

        ></div>
    }


    return (
        <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
            className="
        bg-slate-900
        p-2.5
        h-[100px]
        min-h-[100px]
        items-center
        flex
        text-left
        text-white
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-rose-500
        cursor-grab
        relative
        "
        onMouseEnter={() => {
            setMouseIsOver(true)
        }}
        onMouseLeave={() => {
            setMouseIsOver(false)
        }}
        >
            {task.content}
            <button className={`
            stroke-white 
            absolute 
            right-4 
            top-1/2 
            -translate-y-1/2 
            bg-slate-950 
            p-2 rounded
            opacity-60
            hover:opacity-100
            ${!mouseIsOver && 'hidden'}
            `}
            onClick={() => deleteTask(task.id)}
            >
                <TrashIcons />
            </button>
        </div>
    )
}

export default TaskCard