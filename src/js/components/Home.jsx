import React, { useEffect, useState } from "react";
import todoServices from "../services/ToDoService";

export default function ToDoList() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    async function loadTodos () {
            const data = await todoServices.getUserWithTodos();
            setTodoList(data.todos || []);
    };

    async function handleSubmit (e) {
        e.preventDefault();
        if (todo.trim() === "") {
            return null;
        }
            const newTodo = {
                label: todo,
                is_done: false
            };

            await todoServices.createTodo(newTodo);
            setTodo("");
            await loadTodos();
    };

    async function handleDelete (id) {
            await todoServices.deleteTodo(id);
            await loadTodos();
    };

    async function handleAllTodosDelete() {
        const todoListPromises = todoList.map((todo) => {
            return todoServices.deleteTodo(todo.id)
        })

        console.log(todoListPromises)
        await Promise.all([...todoListPromises])
        setTodoList([])

    }

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <div className="postit">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>ToDo list</h1>

                <button
                    className="btn btn-danger"
                    onClick={handleAllTodosDelete}
                    disabled={todoList.length === 0}
                >
                    Borrar todas
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    value={todo}
                    placeholder="Añadir ToDo..."
                    onChange={(e) => setTodo(e.target.value)}
                />
            </form>

            <ul>
                {todoList.map((task) => (
                    <div key={task.id}>
                        <li>
                            {task.label}<button className="btn btn-danger hover-none" onClick={() => handleDelete(task.id)}> X </button>
                        </li>
                        <hr className="line" />
                    </div>
                ))}
            </ul>
        </div>
    );
};
