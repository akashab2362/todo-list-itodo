import "./App.css";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("lorem epsum");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="main-container bg-violet-100 rounded-xl min-h-[80vh] mx-auto my-5 p-5 w-[80vw]">
        <h1 className="font-bold text-4xl">
          iTodo - Manage your todos at one place
        </h1>
        <div className="add-a-todo my-10">
          <h2 className="text-lg font-bold my-3">Add a Todo</h2>
          <input
            type="text"
            className="w-2/3 rounded-lg border-2 px-4 py-1"
            onChange={handleChange}
            value={todo}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-5 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <input
          className="mx-2"
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
        />
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((elem) => {
            return (
              (showFinished || !elem.isCompleted) && (
                <div key={elem.id} className="todo flex justify-between my-4">
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      name={elem.id}
                      className="mx-4"
                      onChange={handleCheckbox}
                      checked={elem.isCompleted}
                    />
                    <div className={elem.isCompleted ? "line-through" : ""}>
                      <label htmlFor="isCompleted">{elem.todo}</label>
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, elem.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-5 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, elem.id);
                      }}
                      name={elem.id}
                      className="bg-violet-800 hover:bg-violet-950 p-5 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
