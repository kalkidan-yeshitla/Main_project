import { Card } from '@/components/ui/card';
import { useState, useRef } from 'react';
import {  usePDF } from 'react-to-pdf'

const Report = ({darkMode}: {darkMode:boolean}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const { toPDF, targetRef } = usePDF({
    //filename: `weekly-report-${getWeekDates(selectedWeek).label}.pdf`,
  });

  const weeklyData = {
    0:{
      taskCreated: 4,
      taskCompeleted: 2,
      taskInProgress: 2,
      teamMembers: [
        {name: "kalkidan", assignedTo: 2, completed: 1, inProgress: 1 },
        {name: "Mahlet", assignedTo: 1, completed: 1, inProgress: 0 },
        {name: "kalkidan", assignedTo: 1, completed: 0, inProgress: 1 },
      ],
      projects: {
        inProgress: 3,
        completed: 5,
        overdue: 1,
        todo: 4,
      },      
    },
    1: {
      taskCreated: 5,
      taskCompeleted: 2,
      taskInProgress: 3,
      teamMembers: [
        {name: "kalkidan", assignedTo: 2, completed: 2, inProgress: 0 },
        {name: "Mahlet", assignedTo: 2, completed: 0, inProgress: 2 },
        {name: "kalkidan", assignedTo: 1, completed: 0, inProgress: 1 },
      ],
      projects: {
        inProgress: 2,
        completed: 6,
        overdue: 0,
        todo: 5,
      },      
    }
  };
  //const weekDates = getWeekDates(selectedWeek);
  return (
    <div className={`p-6 ${darkMode ? "bg-zinc-800 text-gray-300" : "bg-white text-gray-700"}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
         <h1 className="text-2xl font-bold"> Weekly Report</h1>
         {/*<WeekSelector 
               selectedWeek={selectedWeek}
               onChange={setSelectedWeek}

                   />*/}
        </div>
        
        <button className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${darkMode ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
               onClick={() =>toPDF()}>
          Export PDF
        </button>
      </div>

      <div className={``}>
        <Card />

      </div>
    </div>
  )
}

export default Report