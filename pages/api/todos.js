const todos = [
  { id: 1, description: "Todo 1", completed: false, percentageCompleted: 0 },
  { id: 2, description: "Todo 2", completed: true, percentageCompleted: 100 },
  { id: 3, description: "Todo 3", completed: false, percentageCompleted: 0 },
];

let nextId = todos.length + 1;

export default function handler(req, res) {
  switch (req.method) {
    // Handle GET request
    case "GET":
      res.status(200).json(todos);
      break;

    // Handle POST request
    case "POST":
      const newTodo = req.body;
      if (!newTodo) {
        res.status(400).json({ error: "New todo is missing" });
        break;
      }
      newTodo.id = nextId++;
      newTodo.percentageCompleted = 0;
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    // Handle PUT request
    case "PUT":
      const updatedTodo = req.body;
      if (!updatedTodo || !updatedTodo.id) {
        res.status(400).json({ error: "Updated todo or todo id is missing" });
        break;
      }
      const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index === -1) {
        res.status(404).json({ error: "Todo not found" });
        break;
      }
      todos.splice(index, 1, updatedTodo);
      res.status(200).json(updatedTodo);
      break;

    // Handle DELETE request
    case "DELETE":
      const id = req.body.id;
      if (!id) {
        res.status(400).json({ error: "Todo id is missing" });
        break;
      }
      const indexToDelete = todos.findIndex((todo) => todo.id === id);
      if (indexToDelete === -1) {
        res.status(404).json({ error: "Todo not found" });
        break;
      }
      const deletedTodo = todos.splice(indexToDelete, 1)[0];
      res.status(200).json(deletedTodo);
      break;

    // Handle invalid request method
    default:
      res.status(405).end();
      break;
  }
}
