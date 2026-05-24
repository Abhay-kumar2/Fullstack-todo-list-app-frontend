import React from 'react'

import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { toggleComplete } from "../utils/HandleApi";


const ToDo = ({
  text,
  dueDate,
  priority,
  category,
  completed,
  _id,
  setToDo,
  updateMode,
  deleteToDo,
}) => {
  const todoPriority = priority || "Medium";
  const todoCategory =
    category === "Study" || category === "Work" ? category : "Personal";
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, "0");
  const day = String(dateNow.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const isOverdue = dueDate && !completed && dueDate < today;

  const formatDueDate = (date) => {
    if (!date) return "No due date";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
   <div className={completed ? "todo completed-todo" : "todo"}>
    <input
      className="complete-checkbox"
      type="checkbox"
      checked={completed}
      onChange={() => toggleComplete(_id, setToDo)}
    />
    <div className="todo-info">
      <div className={completed ? "text completed-text" : "text"}>
        {text}
        {completed && <span className="completed-badge">Completed</span>}
      </div>
      <div className={isOverdue ? "due-date overdue" : "due-date"}>
        Due: {formatDueDate(dueDate)}
        {isOverdue && <span className="overdue-badge">Overdue</span>}
      </div>
      <span className={`priority-badge ${todoPriority.toLowerCase()}`}>
        {todoPriority}
      </span>
      <span className={`category-badge ${todoCategory.toLowerCase()}`}>
        {todoCategory}
      </span>
    </div>
    <div className="icons">
        <BiEdit className='icon' onClick={updateMode} />
        <AiFillDelete className='icon' onClick={deleteToDo} />
    </div>
   </div>
  )
}

export default ToDo
