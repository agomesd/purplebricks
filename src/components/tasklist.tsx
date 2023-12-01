import { Task } from "@/App";
import { Accordion } from "./ui/accordion";
import { useCallback } from "react";
import { TaskItem } from "./task-item";

interface TasklistProps {
  tasklist: Task[];
  setTaskList: (tasklist: Task[]) => void;
}

export function Tasklist({ tasklist, setTaskList }: TasklistProps) {
  const deleteTask = useCallback(
    (taskId: string) => {
      const newTasks = tasklist.filter((task) => task.id !== taskId);
      setTaskList(newTasks);
    },
    [tasklist, setTaskList]
  );

  const updateTask = useCallback(
    (taskId: string, value: string, key: keyof Task) => {
      const task = tasklist.find((task) => task.id === taskId);
      if (task) {
        const newTask = { ...task, [key]: value };
        const newList = tasklist.map((t) => (t.id === taskId ? newTask : t));
        setTaskList(newList);
      }
    },
    [tasklist, setTaskList]
  );

  const toggleTaskCompletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
      e.stopPropagation();
      const task = tasklist.find((task) => task.id === taskId);
      if (task) {
        const newTask = { ...task, isComplete: !task.isComplete };
        const newList = tasklist.map((t) => (t.id === taskId ? newTask : t));
        setTaskList(newList);
      }
    },
    [tasklist, setTaskList]
  );

  return (
    <Accordion type="single" collapsible className="relative flex-1">
      <ul className="absolute inset-0 mb-4 overflow-y-auto">
        {tasklist.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTaskComplete={toggleTaskCompletion}
            onUpdateTask={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </Accordion>
  );
}
