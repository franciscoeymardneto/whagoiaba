import { FC } from "react"
import { Column } from "../types"

interface Props {
    column: Column
}
const ColumnContainer: FC<Props> = ({column}) => {
    return (
        <div>
            {column.title}
        </div>
    )
}

export default ColumnContainer