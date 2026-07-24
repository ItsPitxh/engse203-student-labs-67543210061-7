import { useState } from 'react';
import { initialTasks } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskForm from './components/TaskForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  const summary = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    doing: tasks.filter((t) => t.status === 'doing').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <>
      <AppHeader title={"Study Task Board"} subtitle={"ฝึก React mental model ก่อนทำ LAB04"}/>
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="dashboard-grid">
          <TaskForm onAddTask={handleAddTask} />
          <div>
            <FilterBar statusFilter={statusFilter} onFilterChange={setStatusFilter} />
            <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;