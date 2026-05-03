import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {

  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">

      <div className="container">

        {/* HEADER BOX */}
        <div className="header-box">
          <h1>ToDo List</h1>
        </div>

        {/* CONTENT BOX */}
        <div className="content-box">

          {/* INPUT SECTION */}
          <div className="top">
            <input
              type="text"
              placeholder="Add ToDos..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div
              className="add"
              onClick={
                isUpdating
                  ? () =>
                      updateToDo(
                        toDoId,
                        text,
                        setToDo,
                        setText,
                        setIsUpdating
                      )
                  : () => addToDo(text, setText, setToDo)
              }
            >
              {isUpdating ? "Update" : "Add"}
            </div>
          </div>

          {/* TODO LIST */}
          <div className="list">
            {toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)}
              />
            ))}
          </div>

        </div> {/* content-box */}

      </div> {/* container */}

    </div>
  );
}

export default App;
