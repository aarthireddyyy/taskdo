import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { CalendarIcon } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsAddingTask(false);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const tasksForSelectedDate = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <CalendarIcon className="mr-2" />
            ToDo Calender
          </h1>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
          >
            Add Task
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <Calendar 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
              tasks={tasks}
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">
              Tasks for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <TaskList 
              tasks={tasksForSelectedDate} 
              onDelete={deleteTask} 
              onToggleComplete={toggleTaskCompletion}
            />
            {tasksForSelectedDate.length === 0 && (
              <p className="text-gray-500 text-center py-6">
                No tasks scheduled for this day
              </p>
            )}
          </div>
        </div>
      </main>

      {isAddingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm 
              onSubmit={addTask} 
              onCancel={() => setIsAddingTask(false)}
              initialDate={selectedDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;