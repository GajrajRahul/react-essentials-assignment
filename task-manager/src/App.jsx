import { TaskProvider } from "./context/TaskContext";

import FilterControls from "./components/FilterControls";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

const App = () => {
  return (
    <TaskProvider>
      <div className="App">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Built with React Context API & useReducer</p>
        </header>

        <main className="app-main">
          <div className="sidebar">
            <TaskForm />
          </div>
          <div className="class-content">
            <FilterControls />
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
