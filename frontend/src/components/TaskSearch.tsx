import {  useState } from "react";
import type { Task } from "../types/Task";
import axios from "axios"
export default function TaskSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Task[]>([]);

  const handleSearch = async () => {
    const response = await axios.post("/tasks/search", { query });
    setResults(response.data);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks by meaning..."
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
      {results.map((task) => (
        <div key={task.id} className="mt-4 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-green-600">Similarity Score: {(task.similarity * 100).toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}
