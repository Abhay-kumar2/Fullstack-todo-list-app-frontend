const STORAGE_KEY = "demo_todos";

const getStoredTodos = () => {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const getAllToDo = (setToDo) => {
  const todos = getStoredTodos();
  setToDo(todos);
};

const addToDo = (
  text,
  dueDate,
  priority,
  category,
  setText,
  setDueDate,
  setPriority,
  setCategory,
  setToDo
) => {
  if (!text.trim()) return;

  const todos = getStoredTodos();

  const newTodo = {
    _id: Date.now().toString(),
    text,
    dueDate,
    priority,
    category,
    completed: false,
  };

  const updatedTodos = [...todos, newTodo];

  saveTodos(updatedTodos);
  setToDo(updatedTodos);
  setText("");
  setDueDate("");
  setPriority("Medium");
  setCategory("Personal");
};

const updateToDo = (
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
) => {
  if (!text.trim()) return;

  const todos = getStoredTodos();

  const updatedTodos = todos.map((todo) =>
    todo._id === toDoId
      ? { ...todo, text, dueDate, priority, category }
      : todo
  );

  saveTodos(updatedTodos);
  setToDo(updatedTodos);
  setText("");
  setDueDate("");
  setPriority("Medium");
  setCategory("Personal");
  setIsUpdating(false);
};

const deleteToDo = (_id, setToDo) => {
  const todos = getStoredTodos();

  const updatedTodos = todos.filter((todo) => todo._id !== _id);

  saveTodos(updatedTodos);
  setToDo(updatedTodos);
};

const clearCompletedToDo = (setToDo) => {
  const shouldClear = window.confirm(
    "Are you sure you want to clear completed tasks?"
  );

  if (!shouldClear) return;

  const todos = getStoredTodos();
  const updatedTodos = todos.filter((todo) => !todo.completed);

  saveTodos(updatedTodos);
  setToDo(updatedTodos);
};

const toggleComplete = (id, setToDo) => {
  const todos = getStoredTodos();

  const updatedTodos = todos.map((todo) =>
    todo._id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos(updatedTodos);
  setToDo(updatedTodos);
};

export {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
  clearCompletedToDo,
  toggleComplete,
};
