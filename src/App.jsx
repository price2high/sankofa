import { useState, useEffect } from 'react'
import { calendarData } from './data'
import CalendarDayTile from './components/CalendarDayTile'
import DayModal from './components/DayModal'
import ProgressBar from './components/ProgressBar'

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Initialize state from localStorage
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('sankofa_completed_days');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load progress", e);
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sankofa_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  const handleDaySelect = (dayData) => {
    setSelectedDay(dayData);
    if (!completedDays.includes(dayData.day)) {
      setCompletedDays(prev => [...prev, dayData.day]);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SANKOFA</h1>

        <p className="app-description">
          A 28-day digital archiving of Black agency, intellect, and resistance.
        </p>
      </header>

      <div className="calendar-wrapper">
        {/* Days Header */}
        <div className="days-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <main className="calendar-grid">
          {calendarData.map((dayData) => (
            <CalendarDayTile
              key={dayData.day}
              dayData={dayData}
              onClick={() => handleDaySelect(dayData)}
              isCompleted={completedDays.includes(dayData.day)}
            />
          ))}
        </main>

        <ProgressBar current={completedDays.length} total={calendarData.length} />
      </div>

      {/* Modal for displaying content */}
      {selectedDay && (
        <DayModal
          dayData={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}

      <footer className="app-footer">
        <p>Project Sankofa 2026- Presented by Price Dev Ops x Black Eye Pea</p>
      </footer>
    </div>
  )
}

export default App
