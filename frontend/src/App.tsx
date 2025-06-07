
import './App.css'
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Task Manager
        </h1>
        <TaskForm onTaskAdded={() => window.location.reload()} />
        <TaskList />
      </div>
    </div>
  )
}

export default App
