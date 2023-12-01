import cuid from "cuid";
import { useState } from "react";
import { Header } from "./components/header";
import { Tasklist } from "./components/tasklist";

import { AddTaskCard } from "./components/add-task-card";

export type Task = {
  id: string;
  createdAt: string;
  title: string;
  details: string;
  isComplete: boolean;
};
const initialTasks: Task[] = [
  {
    id: "28934rhjksdfjf",
    createdAt: new Date().toString(),
    title: "Create task list",
    details: "First create the task list component",
    isComplete: true,
  },
  {
    id: "89345jkknefw89",
    createdAt: new Date().toString(),
    title: "Update Complete",
    details:
      "Add functionality to be able to update if a task is complete or not",
    isComplete: true,
  },
  {
    id: "8923rndfkwe",
    createdAt: new Date().toString(),
    title: "Update Task",
    details: "Add functionality to be able to update task title and details",
    isComplete: true,
  },
  {
    id: "9sdfjksdm34",
    createdAt: new Date().toString(),
    title: "Delete Task",
    details: "Add functionality to be able to delete a task",
    isComplete: true,
  },
];

function App() {
  const [tasklist, setTasklist] = useState<Task[]>(initialTasks);
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTaskList = [
      ...tasklist,
      { ...task, id: cuid(), createdAt: new Date().toString() },
    ];
    setTasklist(newTaskList);
  };
  return (
    <main className="flex flex-col">
      <Header
        title={<h1 className="text-accent font-bold text-2xl">Task Manager</h1>}
      />
      <div className="flex-1 max-w-3xl w-full mx-auto">
        <AddTaskCard onCreate={addTask} />
        <Tasklist tasklist={tasklist} setTaskList={setTasklist} />
      </div>
    </main>
  );
}

export default App;
