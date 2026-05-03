import React from 'react'

import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { toggleComplete } from "../utils/HandleApi";


const ToDo = ({text, completed, _id, setToDo, updateMode, deleteToDo}) => {
  return (
   <div className="todo">
    <div
  className="text"
  onClick={() => toggleComplete(_id, setToDo)}
  style={{
    textDecoration: completed ? "line-through" : "none",
    cursor: "pointer"
  }}
>
  {text}
</div>
    <div className="icons">
        <BiEdit className='icon' onClick={updateMode} />
        <AiFillDelete className='icon' onClick={deleteToDo} />
    </div>
   </div>
  )
}

export default ToDo