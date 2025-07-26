"use client";
import { useTodoStore } from "@/lib/useTodoStore";
import { Button } from "@/components/ui/button";

export default function TodoList({ filter = "all" }) {
  const { todos, toggleComplete, restoreTodo, deleteTodo } = useTodoStore();

  const now = new Date().toISOString();

  const filtered = todos.filter((todo) => {
    if (todo.deadline && todo.deadline < now) return false; // hide expired
    if (filter === "completed") return todo.completed;
    if (filter === "active") return todo.completed; // show completed in active with restore
    return !todo.completed; // show only uncompleted in "all"
  });

  return (
    <div className="space-y-3">
      {filtered.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center border p-2 rounded shadow-sm"
        >
          <div className="flex flex-col">
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.text}
            </span>
            <span className="text-sm text-gray-400">
              Due: {new Date(todo.deadline).toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            {filter === "active" ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => restoreTodo(todo.id)}
              >
                Restore
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
