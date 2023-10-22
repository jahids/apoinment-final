import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "react";
import CreateAppointmentModal from "../../components/CreateAppointmentModal/CreateAppointmentModal";
import axios from "axios";

const Calendar = () => {
  const { year, month } = useParams();
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [specificid, setspecificid] = useState('')
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const yearList = ["2019", "2020", "2021"];
  const monthList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getMonth()}`
  );

  useEffect(() => {
    if (!year) return;
    setSelectedYear(year);

    if (month) {
      setSelectedMonth(month);
    }
  }, [year, month]);

  useEffect(() => {
    if (calendarRef.current) {
      let currData = selectedMonth;
      if (+selectedMonth < 10) {
        currData = `0${selectedMonth}`;
      }
      const api = calendarRef.current.getApi();
      api.gotoDate(`${selectedYear}-${currData}-01`); // Provide your target month in the format 'YYYY-MM-DD'
      //   api.gotoDate(`2020-02-01`); // Provide your target month in the format 'YYYY-MM-DD'
    }
  }, [selectedYear, selectedMonth]);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);


  const handleEventClick = (clickInfo: any) => {
    setModalStatus(true)
    setspecificid(clickInfo.event.id || 1)
    console.log("id--->",clickInfo.event.id);
    const { title, start, end } = clickInfo.event;
    console.log('Event clicked - Title:', title, clickInfo);
    console.log('Start:', start);
    console.log('End:', end);
  };

  return (
    <div className="p-5">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              {selectedYear}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {yearList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedYear(item);
                  }}
                >
                  <a className={item === selectedYear ? "text-red-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <label tabIndex={1} className="btn m-1 w-48">
              {selectedMonth}
            </label>
            <ul
              tabIndex={1}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {monthList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedMonth(item);
                  }}
                >
                  <a className={item === selectedMonth ? "text-red-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <button
            className="btn m-1"
            onClick={() => {
              setModalStatus(true);
            }}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        // headerToolbar={false}
        events={events}
        initialView="dayGridMonth"
        eventClick={handleEventClick} 
      />

      <CreateAppointmentModal
        id={specificid}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        
      />
    </div>
  );
};

export default Calendar;
