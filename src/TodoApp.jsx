import React from 'react';
import AppHeader from './AppHeader';
import WeekCalendar from './WeekCalendar';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Plus } from 'lucide-react';
import { useTaskContext } from './TaskContext';

const ToDoApp = () => {
  const {
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
  } = useTaskContext();

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
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Weekly Progress</h2>
            <div className="w-full h-4 bg-blue-100 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${(taskStats.completed / (taskStats.completed + taskStats.pending)) * 100 || 0}%`,
                }}
              />
            </div>
          </div>
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
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </>
      )}
      {currentView === 'addTask' && (
        <TaskForm isEditing={false} setCurrentView={setCurrentView} />
      )}
      {currentView === 'editTask' && (
        <TaskForm isEditing={true} setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default ToDoApp;
