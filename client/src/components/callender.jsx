import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [excludedDates, setExcludedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(
    new Date(new Date().getFullYear(), 11, 31)
  ); // Dec 31 of current year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAk83wY5cNqocH-rbFZeSiem-X8cmO6eVI&timeMin=${currentYear}-01-01T00:00:00Z&timeMax=${currentYear}-12-31T23:59:59Z&singleEvents=true&orderBy=startTime`
        );

        // Process holidays with proper timezone handling
        const holidayDates = response.data.items
          .filter((holiday) => holiday.start?.date)
          .map((holiday) => {
            const [year, month, day] = holiday.start.date.split("-");
            return new Date(year, month - 1, day); // Local time
          });

        // Generate weekends for current year
        const generateWeekends = () => {
          const weekends = [];
          const date = new Date(minDate); // Start from today
          const end = new Date(maxDate); // Until end of year

          while (date <= end) {
            if (date.getDay() === 0 || date.getDay() === 6) {
              weekends.push(new Date(date));
            }
            date.setDate(date.getDate() + 1);
          }
          return weekends;
        };

        // Combine holidays, weekends, and dates before today
        const pastDates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Generate all dates before today
        const firstDate = new Date(today.getFullYear(), 0, 1);
        let date = new Date(firstDate);
        while (date < today) {
          pastDates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        setExcludedDates([
          ...holidayDates,
          ...generateWeekends(),
          ...pastDates,
        ]);
      } catch (error) {
        console.error("Error fetching holiday data:", error);
        // Fallback to just weekends and past dates if API fails
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const pastDates = [];
        const firstDate = new Date(today.getFullYear(), 0, 1);
        let date = new Date(firstDate);
        while (date < today) {
          pastDates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        setExcludedDates([...generateWeekends(), ...pastDates]);
      }
    };

    fetchData();
  }, [minDate, maxDate]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select a Valid Working Date</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        excludeDates={excludedDates}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={(date) => {
          // Extra timezone-safe validation
          const localDate = new Date(date);
          localDate.setHours(0, 0, 0, 0);
          return localDate >= minDate && localDate <= maxDate;
        }}
        placeholderText="Pick a working day"
        className="border p-2 rounded w-full"
        calendarClassName="custom-calendar"
      />

      <style>{`
        .custom-calendar .react-datepicker__day--disabled {
          color: #ccc;
          cursor: not-allowed;
        }
        .custom-calendar .react-datepicker__day--outside-month {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
