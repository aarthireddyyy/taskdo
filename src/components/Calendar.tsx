import React from 'react';
import { Task } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, tasks }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(selectedDate));

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === month && 
        selectedDate.getFullYear() === year;
      
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === month && 
        new Date().getFullYear() === year;
      
      // Check if there are tasks for this day
      const hasTask = tasks.some(task => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getDate() === day &&
          taskDate.getMonth() === month &&
          taskDate.getFullYear() === year
        );
      });

      // Count tasks for this day
      const taskCount = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getDate() === day &&
          taskDate.getMonth() === month &&
          taskDate.getFullYear() === year
        );
      }).length;
      
      days.push(
        <div 
          key={day} 
          onClick={() => onSelectDate(date)}
          className={`h-10 md:h-14 flex flex-col items-center justify-center rounded-full cursor-pointer relative
            ${isSelected ? 'bg-indigo-600 text-white' : ''}
            ${isToday && !isSelected ? 'border border-indigo-600 text-indigo-600' : ''}
            ${!isSelected && !isToday ? 'hover:bg-gray-100' : ''}
          `}
        >
          <span>{day}</span>
          {hasTask && !isSelected && (
            <span className="absolute bottom-1 w-5 h-5 flex items-center justify-center text-xs bg-indigo-100 text-indigo-800 rounded-full">
              {taskCount}
            </span>
          )}
          {hasTask && isSelected && (
            <span className="absolute bottom-1 w-5 h-5 flex items-center justify-center text-xs bg-indigo-200 text-indigo-800 rounded-full">
              {taskCount}
            </span>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500 text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;