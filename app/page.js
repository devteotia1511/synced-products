"use client";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Synced Todo List</h1>
      <TodoInput />

      <div className="grid md:grid-cols-3 gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">All Tasks</h2>
          <TodoList filter="all" />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">Active</h2>
          <TodoList filter="active" />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-center">Completed</h2>
          <TodoList filter="completed" />
        </section>
      </div>
    </main>
  );
}