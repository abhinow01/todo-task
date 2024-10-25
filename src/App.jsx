// import React, { useState, useEffect } from 'react';
// import { Search, Bell, Settings, Plus, ChevronLeft, Calendar, Trash2, Edit2, X } from 'lucide-react';

// const ToDoApp = () => {
//   // State management for tasks and UI
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [currentView, setCurrentView] = useState('home');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingTask, setEditingTask] = useState(null);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     date: '',
//     startTime: '',
//     endTime: '',
//     priority: 'medium',
//     completed: false
//   });

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Calculate current week dates
//   const getCurrentWeekDates = () => {
//     const today = new Date();
//     const currentDay = today.getDay();
//     const diff = today.getDate() - currentDay;
    
//     return Array.from({ length: 7 }, (_, index) => {
//       const day = new Date(today.setDate(diff + index));
//       return {
//         date: day.getDate(),
//         month: day.getMonth(),
//         year: day.getFullYear(),
//         isToday: new Date().toDateString() === day.toDateString()
//       };
//     });
//   };

//   const [weekDates] = useState(getCurrentWeekDates());

//   // Task management functions
//   const addTask = (e) => {
//     e.preventDefault();
//     if (!newTask.title || !newTask.date) return;
    
//     const task = {
//       id: Date.now(),
//       ...newTask,
//       created: new Date().toISOString()
//     };
    
//     setTasks([...tasks, task]);
//     setNewTask({
//       title: '',
//       description: '',
//       date: '',
//       startTime: '',
//       endTime: '',
//       priority: 'medium',
//       completed: false
//     });
//     setCurrentView('home');
//   };

//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   const toggleTaskCompletion = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const updateTask = (taskId, updatedData) => {
//     setTasks(tasks.map(task =>
//       task.id === taskId ? { ...task, ...updatedData } : task
//     ));
//   };

//   // Filter tasks based on search query
//   const filteredTasks = tasks.filter(task =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     task.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate task statistics
//   const taskStats = {
//     completed: tasks.filter(task => task.completed).length,
//     pending: tasks.filter(task => !task.completed).length
//   };

//   // Components
//   const Header = () => (
//     <header className="sticky top-0 z-10 bg-white shadow-sm">
//       <div className="max-w-screen-lg mx-auto">
//         <div className="flex items-center justify-between p-4">
//           {currentView !== 'home' && (
//             <button onClick={() => setCurrentView('home')} className="p-2">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div className="flex-1 mx-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for a task"
//                 className="w-full p-2 pr-10 border rounded-lg"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>
//           </div>
//           {currentView === 'home' && (
//             <div className="flex gap-4">
//               <Settings className="w-6 h-6 text-gray-600" />
//               <Bell className="w-6 h-6 text-gray-600" />
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );

//   const WeekCalendar = () => (
//     <div className="bg-white p-4">
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
//           <div key={day} className="text-sm text-gray-500">
//             {day}
//           </div>
//         ))}
//         {weekDates.map((date, index) => (
//           <div
//             key={index}
//             className={`text-sm p-2 rounded-lg ${
//               date.isToday ? 'bg-blue-500 text-white' : ''
//             }`}
//           >
//             {date.date}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const TaskStats = () => (
//     <div className="grid grid-cols-2 gap-4 p-4">
//       <div className="bg-blue-50 p-4 rounded-lg">
//         <div className="flex items-center gap-2 mb-2">
//           <div className="w-4 h-4 rounded bg-blue-500" />
//           <span>Task Complete</span>
//         </div>
//         <div className="text-2xl font-bold">{taskStats.completed}</div>
//         <div className="text-sm text-gray-500">This Week</div>
//       </div>
//       <div className="bg-red-50 p-4 rounded-lg">
//         <div className="flex items-center gap-2 mb-2">
//           <div className="w-4 h-4 rounded bg-red-500" />
//           <span>Task Pending</span>
//         </div>
//         <div className="text-2xl font-bold">{taskStats.pending}</div>
//         <div className="text-sm text-gray-500">This Week</div>
//       </div>
//     </div>
//   );

//   const TaskList = () => (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold">Tasks Today</h2>
//         <button className="text-blue-500">View All</button>
//       </div>
//       <div className="space-y-4">
//         {filteredTasks.map((task) => (
//           <div key={task.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleTaskCompletion(task.id)}
//                 className="w-5 h-5 rounded-md border-2 border-blue-500"
//               />
//               <div className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
//                 <div className="font-medium">{task.title}</div>
//                 <div className="text-sm text-gray-500">
//                   {task.startTime} - {task.endTime}
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => deleteTask(task.id)}>
//                 <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
//               </button>
//               <button onClick={() => {
//                 setEditingTask(task);
//                 setCurrentView('editTask');
//               }}>
//                 <Edit2 className="w-5 h-5 text-gray-400 hover:text-blue-500" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const TaskForm = ({ isEditing = false }) => (
//     <div className="p-4">
//       <form onSubmit={addTask} className="bg-white rounded-lg shadow-sm">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-xl font-bold">
//             {isEditing ? 'Edit Task' : 'Add New Task'}
//           </h2>
//           <button type="button" onClick={() => setCurrentView('home')}>
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="p-4 space-y-4">
//           <div>
//             <label className="block mb-2">Task title</label>
//             <input
//               type="text"
//               required
//               className="w-full p-2 border rounded-lg"
//               placeholder="Enter task title"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Set Time</label>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1">Start</label>
//                 <input
//                   type="time"
//                   required
//                   className="w-full p-2 border rounded-lg"
//                   value={newTask.startTime}
//                   onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">End</label>
//                 <input
//                   type="time"
//                   required
//                   className="w-full p-2 border rounded-lg"
//                   value={newTask.endTime}
//                   onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block mb-2">Set Date</label>
//             <input
//               type="date"
//               required
//               className="w-full p-2 border rounded-lg"
//               value={newTask.date}
//               onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Description</label>
//             <textarea
//               className="w-full p-2 border rounded-lg"
//               placeholder="Add Description"
//               value={newTask.description}
//               onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             {isEditing ? 'Update Task' : 'Create Task'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-screen-lg mx-auto md:px-4">
//         <div className="md:max-w-md md:mx-auto">
//           <Header />
//           {currentView === 'home' && (
//             <>
//               <WeekCalendar />
//               <TaskStats />
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-4">Weekly Progress</h2>
//                 <div className="w-full h-4 bg-blue-100 rounded-full">
//                   <div 
//                     className="h-full bg-blue-500 rounded-full transition-all duration-300"
//                     style={{ 
//                       width: `${(taskStats.completed / (taskStats.completed + taskStats.pending)) * 100 || 0}%` 
//                     }}
//                   />
//                 </div>
//               </div>
//               <TaskList />
//               <button
//                 className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
//                 onClick={() => setCurrentView('newTask')}
//               >
//                 <Plus className="w-6 h-6" />
//               </button>
//             </>
//           )}
//           {currentView === 'newTask' && <TaskForm />}
//           {currentView === 'editTask' && <TaskForm isEditing />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToDoApp;
import React from 'react'
import ToDoApp from './TodoApp'

const App = () => {
  return (
    <ToDoApp/>
  )
}

export default App