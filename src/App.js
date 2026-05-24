import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
  clearCompletedToDo,
} from "./utils/HandleApi";

const THEME_KEY = "todo_theme";

function App() {

  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_KEY) || "light"
  );

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getTodoPriority = (priority) => {
    if (priority === "Low" || priority === "High") return priority;
    return "Medium";
  };

  const getTodoCategory = (category) => {
    if (category === "Study" || category === "Work") return category;
    return "Personal";
  };

  const updateMode = (_id, text, dueDate, priority, category) => {
    setIsUpdating(true);
    setText(text);
    setDueDate(dueDate || "");
    setPriority(getTodoPriority(priority));
    setCategory(getTodoCategory(category));
    setToDoId(_id);
  };

  const categoryOptions = ["All Categories", "Study", "Work", "Personal"];

  const filteredToDo = toDo.filter((item) => {
    const matchesStatus =
      filter === "pending"
        ? !item.completed
        : filter === "completed"
        ? item.completed
        : true;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      getTodoCategory(item.category) === categoryFilter;

    return matchesStatus && matchesCategory;
  });

  const totalTasks = toDo.length;
  const completedTasks = toDo.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const hasCompletedToDo = toDo.some((item) => item.completed);

  return (
    <div className={`App ${theme}`}>

      <div className="container">

        {/* HEADER BOX */}
        <div className="header-box">
          <h1>ToDo List</h1>
        </div>

        <div className="theme-row">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <div className="app-layout">
          {/* CONTENT BOX */}
          <div className="content-box">

          {/* TASK SUMMARY */}
          <div className="summary">
            {totalTasks === 0 ? (
              <p className="empty-summary">No tasks yet</p>
            ) : (
              <>
                <div className="summary-counts">
                  <div>
                    <span>Total</span>
                    <strong>{totalTasks}</strong>
                  </div>
                  <div>
                    <span>Pending</span>
                    <strong>{pendingTasks}</strong>
                  </div>
                  <div>
                    <span>Completed</span>
                    <strong>{completedTasks}</strong>
                  </div>
                </div>

                <p className="progress-text">
                  {completedTasks} of {totalTasks} tasks completed
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>

          {/* INPUT SECTION */}
          <div className="top">
            <input
              type="text"
              placeholder="Add ToDos..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              className="date-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <select
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>

            <div
              className="add"
              onClick={
                isUpdating
                  ? () =>
                      updateToDo(
                        toDoId,
                        text,
                        dueDate,
                        priority,
                        category,
                        setToDo,
                        setText,
                        setDueDate,
                        setPriority,
                        setCategory,
                        setIsUpdating
                      )
                  : () =>
                      addToDo(
                        text,
                        dueDate,
                        priority,
                        category,
                        setText,
                        setDueDate,
                        setPriority,
                        setCategory,
                        setToDo
                      )
              }
            >
              {isUpdating ? "Update" : "Add"}
            </div>
          </div>

          {/* FILTER BUTTONS */}
          <div className="filters">
            <button
              className={filter === "all" ? "filter active" : "filter"}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "pending" ? "filter active" : "filter"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "completed" ? "filter active" : "filter"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className="clear-completed"
              onClick={() => clearCompletedToDo(setToDo)}
              disabled={!hasCompletedToDo}
            >
              Clear Completed
            </button>
          </div>

          {/* TODO LIST */}
          <div className="list">
            {filteredToDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                dueDate={item.dueDate}
                priority={item.priority}
                category={item.category}
                completed={item.completed}
                _id={item._id}
                setToDo={setToDo}
                updateMode={() =>
                  updateMode(
                    item._id,
                    item.text,
                    item.dueDate,
                    item.priority,
                    item.category
                  )
                }
                deleteToDo={() => deleteToDo(item._id, setToDo)}
              />
            ))}
          </div>

          </div> {/* content-box */}

          <aside className="category-panel">
            <h2>Categories</h2>
            <div className="category-filter-list">
              {categoryOptions.map((item) => (
                <button
                  key={item}
                  className={
                    categoryFilter === item
                      ? "category-filter active"
                      : "category-filter"
                  }
                  onClick={() => setCategoryFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
        </div>

      </div> {/* container */}

    </div>
  );
}

export default App;
