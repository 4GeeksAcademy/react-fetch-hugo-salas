const BASE_URL = "https://playground.4geeks.com/todo";
const USERNAME = "hugo";

async function getUserWithTodos() {
    const response = await fetch(`${BASE_URL}/users/${USERNAME}`);

    if (!response.ok) {
        // si no existe el usuario, lo creamos
        const data = await createUser();
        return data;
    }

    const data = await response.json();
    return data;
}

async function createUser() {
    const response = await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }

    const data = await getUserWithTodos();
    return data;
}

async function createTodo(todo) {
    const response = await fetch(`${BASE_URL}/todos/${USERNAME}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Error al crear el todo");
    }

    const data = await response.json();
    return data;
}

async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al borrar el todo");
    }

    return response.text();
}

const todoServices = {
    getUserWithTodos,
    createUser,
    createTodo,
    deleteTodo,
};

export default todoServices;
