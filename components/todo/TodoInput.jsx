"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/lib/useTodoStore";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = () => {
    if (text.trim() && deadline) {
      addTodo(text, deadline);
      setText("");
      setDeadline("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="w-full"
      />
      <Input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
}