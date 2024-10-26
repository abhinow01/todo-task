import React, { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === editingTask.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setCurrentView('home');
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskStats = {
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        searchQuery,
        setSearchQuery,
        currentView,
        setCurrentView,
        editingTask,
        setEditingTask,
        filteredTasks,
        taskStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
