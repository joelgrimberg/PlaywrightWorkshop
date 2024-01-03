import React, { useState, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";

const API_URL = "/api/todos"; // Assuming the API endpoint is defined in todos.js

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newTodo }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (todoId, newDescription) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: todoId, description: newDescription }),
      });
      const data = await response.json();
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, description: newDescription };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: todoId }),
      });
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>ToDo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <button
        onClick={createTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Progress
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="px-6 py-4">
                  {editTodo === todo.id ? (
                    <input
                      type="text"
                      value={editTodo === todo.id ? todo.description : ""}
                      onChange={(e) => {
                        const updatedTodos = todos.map((t) => {
                          if (t.id === todo.id) {
                            return { ...t, description: e.target.value };
                          }
                          return t;
                        });
                        setTodos(updatedTodos);
                      }}
                      className={`border border-gray-300 rounded px-4 py-2 mb-4 ${
                        todo.description.length === 0 ? "border-red-500" : ""
                      }`}
                    />
                  ) : (
                    todo.description
                  )}
                  {todo.description.length === 0 && (
                    <p className="text-red-500">Please enter a description</p>
                  )}
                </td>
                <td class="px-6 py-4">
                  <>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-blue-700 dark:text-white">
                        {todo.percentageCompleted + "%"}
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        class="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: todo.percentageCompleted + "%" }}
                      ></div>
                    </div>
                  </>
                </td>
                <td class="px-6 py-4">blub</td>
                <td>
                  {editTodo === todo.id ? (
                    <>
                      <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={() => updateTodo(todo.id, todo.description)}
                      >
                        <FaRegSave />
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        class="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <button
                          type="button"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                          onClick={() => setEditTodo(todo.id)}
                        >
                          <svg
                            className="w-[14px] h-[14px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 21 21"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <svg
                            className="w-[14px] h-[14px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;
