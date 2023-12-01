import { Task } from "@/App";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface AddTaskCardProps {
  onCreate: (task: Omit<Task, "id">) => void;
}
const initialTask = {
  details: "",
  isComplete: false,
  title: "",
};

export function AddTaskCard({ onCreate }: AddTaskCardProps) {
  const [newTask, setNewTask] = useState<Omit<Task, "id">>(initialTask);
  const [errors, setErrors] = useState<string[]>([]);

  const updateNewTask = (value: string, key: string) => {
    setErrors([]);
    setNewTask({ ...newTask, [key]: value });
  };

  const createTask = () => {
    if (!newTask.title.length || !newTask.details.length) {
      setErrors([...errors, "Both fields are required"]);
      return;
    }

    onCreate(newTask);
    setNewTask(initialTask);
  };

  return (
    <Card className="m-3">
      <CardHeader>
        <CardTitle>New task</CardTitle>
        <CardDescription>Create a new task</CardDescription>
        {errors.map((error) => (
          <span className="text-destructive">{error}</span>
        ))}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            value={newTask.title}
            name="title"
            className="p-1 border border-border rounded-md"
            placeholder="title..."
            onChange={(e) => updateNewTask(e.target.value, "title")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="details">Details</label>
          <input
            id="details"
            value={newTask.details}
            name="details"
            className="p-1 border border-border rounded-md"
            placeholder="details..."
            onChange={(e) => updateNewTask(e.target.value, "details")}
          />
        </div>
        <Button variant={"secondary"} onClick={createTask}>
          Create task
        </Button>
      </CardContent>
    </Card>
  );
}
