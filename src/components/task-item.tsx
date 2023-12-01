import { Task } from "@/App";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onToggleTaskComplete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    taskId: string
  ) => void;
  onUpdateTask: (taskId: string, value: string, key: keyof Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({
  task,
  onToggleTaskComplete,
  onUpdateTask,
  onDelete,
}: TaskItemProps) {
  const [isUpdate, setIsUpdate] = useState(false);

  const stopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <AccordionItem key={task.id} value={task.id}>
      <AccordionTrigger className="flex items-center justify-between gap-4 p-2 shadow-md bg-background">
        <div className="flex justify-start grow">
          <input
            disabled={!isUpdate}
            onClick={stopPropagation}
            value={task.title}
            name="title"
            className={cn(
              isUpdate ? "bg-white" : "bg-transparent",
              "w-full p-2 rounded-md disabled:text-slate-700"
            )}
            onChange={(e) => onUpdateTask(task.id, e.target.value, "title")}
          />
        </div>
        <Button onClick={(e) => onToggleTaskComplete(e, task.id)} asChild>
          <div className="flex items-center gap-3 mr-4 text-xs">
            {task.isComplete ? (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-rose-600" />
                <span>Not completed</span>
              </>
            )}
          </div>
        </Button>
      </AccordionTrigger>
      <AccordionContent className="relative flex flex-col gap-2 p-4 ">
        <span className="text-sm">
          Created: {format(new Date(task.createdAt), "EEE do MMM yyyy, HH:mm")}
        </span>
        <div className="flex items-center justify-between gap-4">
          <input
            disabled={!isUpdate}
            value={task.details}
            name="details"
            className={cn(
              isUpdate ? "bg-white" : "bg-transparent",
              "w-full p-2 rounded-md disabled:text-slate-700"
            )}
            onChange={(e) => onUpdateTask(task.id, e.target.value, "details")}
          />
          <div className="flex gap-2">
            <Button variant={"destructive"} onClick={() => onDelete(task.id)}>
              Delete
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => setIsUpdate(!isUpdate)}
              className={cn(
                isUpdate && "bg-emerald-400 text-accent-foreground"
              )}
            >
              {isUpdate ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
