// // TaskForm.jsx
// import React from 'react';
// import { X } from 'lucide-react';

// const TaskForm = ({ newTask, setNewTask, addTask, isEditing, setCurrentView }) => {
//     const today = new Date().toISOString().split('T')[0]
//     return (
//   <div className="p-4">
//     <form onSubmit={addTask} className="bg-white rounded-lg shadow-sm">
//       <div className="p-4 border-b flex justify-between items-center">
//         <h2 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
//         <button type="button" onClick={() => setCurrentView('home')}>
//           <X className="w-5 h-5" />
//         </button>
//       </div>
//       <div className="p-4 space-y-4">
//         {/* Title Input */}
//         <div>
//           <label className="block mb-2">Task title</label>
//           <input
//             type="text"
//             required
//             className="w-full p-2 border rounded-lg"
//             placeholder="Enter task title"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           />
//         </div>
        
//         {/* Time Input */}
//         <div>
//           <label className="block mb-2">Set Time</label>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm mb-1">Start</label>
//               <input
//                 type="time"
//                 required
//                 className="w-full p-2 border rounded-lg"
//                 value={newTask.startTime}
//                 onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm mb-1">End</label>
//               <input
//                 type="time"
//                 required
//                 className="w-full p-2 border rounded-lg"
//                 value={newTask.endTime}
//                 onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Date Input */}
//         <div>
//           <label className="block mb-2">Set Date</label>
//           <input
//             type="date"
//             required
//             min={today}
//             className="w-full p-2 border rounded-lg"
//             value={newTask.date}
//             onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
//           />
//         </div>
        
//         {/* Description Input */}
//         <div>
//           <label className="block mb-2">Description</label>
//           <textarea
//             className="w-full p-2 border rounded-lg"
//             placeholder="Add Description"
//             value={newTask.description}
//             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           {isEditing ? 'Update Task' : 'Create Task'}
//         </button>
//       </div>
//     </form>
//   </div>

// );
// }
// export default TaskForm;
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTaskContext } from './TaskContext';
const TaskForm = ({ isEditing, setCurrentView }) => {
    const today = new Date().toISOString().split('T')[0]
  const { addTask, editingTask } = useTaskContext();
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (isEditing && editingTask) {
      setNewTask(editingTask);
    }
  }, [isEditing, editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      completed: false,
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={() => setCurrentView('home')}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Rest of your input fields */}
        <div className="p-4 space-y-4">
       {/* Title Input */}
        <div>
           <label className="block mb-2">Task title</label>
        <input
             type="text"
            required
            className="w-full p-2 border rounded-lg"
             placeholder="Enter task title"
             value={newTask.title}
             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
           />
         </div>
         </div>
         {/* Time Input */}
         <div>
          <label className="block mb-2">Set Time</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start</label>
              <input
                type="time"
                required
                className="w-full p-2 border rounded-lg"
                value={newTask.startTime}
                onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End</label>
              <input
                type="time"
                required
                className="w-full p-2 border rounded-lg"
                value={newTask.endTime}
                onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div>
            <label className='block mb-2'>Date
            <input
            type="date"
            required
            min={today}
            className="w-full p-2 border rounded-lg"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
            </label>
        </div>
        <div>
            <label className='block mb-2'>
                Description
                <textarea
                className='p-2 border border-b rounded-lg w-full'
                placeholder='add description ...'
                value={newTask.description}
                onChange={(e)=>setNewTask({...newTask , description : e.target.value})}
                />
            </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
