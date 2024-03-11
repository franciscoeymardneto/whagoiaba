import { FC } from "react"
import { Column, Id } from "../types"
import { TrashIcons } from "../icons/TrashIcons"

interface Props {
    column: Column
    deleteColumn: (id: Id)=> void
}
const ColumnContainer: FC<Props> = ({ column, deleteColumn }) => {
   
    return (
        <div
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
                    <TrashIcons/>
                </button>

            </div>

            <div className="flex flex-grow text-white">
                Content
            </div>
        </div>
    )
}

export default ColumnContainer