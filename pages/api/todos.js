const todos = [
  { id: 1, description: "Todo 1", completed: false, percentageCompleted: 0 },
  { id: 2, description: "Todo 2", completed: true, percentageCompleted: 100 },
  { id: 3, description: "Todo 3", completed: false, percentageCompleted: 0 },
];

let nextId = todos.length + 1;

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      handleGetRequest(res);
      break;

    case "POST":
      handlePostRequest(body, res);
      break;

    case "PUT":
      handlePutRequest(body, res);
      break;

    case "DELETE":
      handleDeleteRequest(body, res);
      break;

    default:
      res.status(405).end();
      break;
  }
}

function handleGetRequest(res) {
  res.status(200).json(todos);
}

function handlePostRequest(newTodo, res) {
  if (!newTodo) {
    res.status(400).json({ error: "New todo is missing" });
    return;
  }

  newTodo.id = nextId++;
  newTodo.percentageCompleted = 0;
  todos.push(newTodo);
  res.status(201).json(newTodo);
}

function handlePutRequest(updatedTodo, res) {
  if (!updatedTodo || !updatedTodo.id) {
    res.status(400).json({ error: "Updated todo or todo id is missing" });
    return;
  }

  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todos[index] = updatedTodo;
  res.status(200).json(updatedTodo);
}

function handleDeleteRequest(id, res) {
  if (!id) {
    res.status(400).json({ error: "Todo id is missing" });
    return;
  }

  const indexToDelete = todos.findIndex((todo) => todo.id === id);
  if (indexToDelete === -1) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  const deletedTodo = todos.splice(indexToDelete, 1)[0];
  res.status(200).json(deletedTodo);
}
