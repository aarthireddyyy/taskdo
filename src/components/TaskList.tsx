import React from 'react';
import { Task } from '../types';
import { Trash2, CheckCircle, Circle, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Clock size={16} className="text-blue-500" />;
      case 'medium':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'high':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li 
          key={task.id} 
          className={`p-3 rounded-md border ${
            task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <button 
                onClick={() => onToggleComplete(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} className="text-gray-400" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 
                    className={`font-medium ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span className="flex items-center" title={`Priority: ${task.priority}`}>
                    {getPriorityIcon(task.priority)}
                  </span>
                </div>
                
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(task.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;