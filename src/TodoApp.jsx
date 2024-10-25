// ToDoApp.jsx
import React, { useState } from 'react';
import AppHeader from './AppHeader';
import WeekCalendar from './WeekCalendar';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editingTask.id ? newTask : task))
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    setNewTask({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      completed: false,
    });
    setCurrentView('home');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskStats = {
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

//   const weekDates = Array.from({ length: 7 }, (_, i) => ({
//     date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
//     isToday: i === 0,
//   }));

  return (
    <div className="ToDoApp">
      <AppHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {currentView === 'home' && (
        <>
          <WeekCalendar />
          <TaskStats taskStats={taskStats} />
          <TaskList
            tasks={tasks}
            filteredTasks={filteredTasks}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
            setEditingTask={setEditingTask}
            setCurrentView={setCurrentView}
          />
          <button
            onClick={() => setCurrentView('addTask')}
            className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg"
          >
            + Add Task
          </button>
        </>
      )}
      {currentView === 'addTask' && (
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          isEditing={false}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'editTask' && (
        <TaskForm
          newTask={editingTask}
          setNewTask={setNewTask}
          addTask={addTask}
          isEditing={true}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  );
};

export default ToDoApp;
