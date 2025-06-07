import type { Task } from "../types/Task";

const API_URL = "http://localhost:5000/tasks"; 

export const fetchTasks = async (): Promise<Task[]> => {
  const cached = localStorage.getItem("tasks");
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await fetch(API_URL);
  const data = await res.json();
  localStorage.setItem("tasks", JSON.stringify(data));
  return data;
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  const newTask = await res.json();
  const cached = await fetchTasks(); // re-fetch after add
  localStorage.setItem("tasks", JSON.stringify([...cached, newTask]));
  return newTask;
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const tasks = await fetchTasks();
  const updated = tasks.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updated));
};
