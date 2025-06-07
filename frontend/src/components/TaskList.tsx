import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { deleteTask, fetchTasks } from "../api/tasks";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="max-w-l mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm text-red-500 hover:text-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
            <span
              className={`inline-block mt-3 px-2 py-1 text-xs font-semibold rounded 
                ${
                  task.status === "done"
                    ? "bg-green-100 text-green-700"
                    : task.status === "in progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {task.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
