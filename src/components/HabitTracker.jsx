import { useState } from 'react';
import React from 'react';

const defaultHabits = [
  { id: 1, title: "Drink Water", completed: false },
  { id: 2, title: "Meditate", completed: false },
  { id: 3, title: "Code for 1 hour", completed: false },
  { id: 4, title: "Read a book", completed: false },
  { id: 5, title: "Exercise", completed: false },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState(defaultHabits);
  const [filter, setFilter] = useState("all");

  const handleToggle = (id) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const filteredHabits =
    filter === "completed"
      ? habits.filter(h => h.completed)
      : habits;

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Mini Habit Tracker</h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-1 rounded-full ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          Show All
        </button>
        <button
          className={`px-4 py-1 rounded-full ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Show Completed
        </button>
      </div>

      <ul className="space-y-2">
        {filteredHabits.map(habit => (
          <li key={habit.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => handleToggle(habit.id)}
              />
              <span>{habit.title}</span>
            </label>
            <span className={`text-sm ${habit.completed ? 'text-green-600' : 'text-red-500'}`}>
              {habit.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center font-medium">
        ✅ {completedCount}/{habits.length} habits completed today
      </p>
    </div>
  );
}
